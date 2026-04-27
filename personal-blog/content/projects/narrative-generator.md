---
id: narrative-generator
slug: narrative-generator
title: Narrative Generator
description: A LLM-powered storyline generator that uses DSPy to produce strictly-typed artifacts following a user-defined narrative.
shortDescription: LLM-powered narrative artifact generator using DSPy
image: /content/projects/images/narrative-generator/banner.png
techStack:
  - Python
  - DSPy
  - Deepseek API
  - Docker
tags:
  - Python
  - DSPy
  - AI
  - LLM
featured: true
date: 2026-04-26
githubRepo: https://github.com/Stymphalian/narrative-generator
showDetails: true
images: []
videos: []
---

![preview image](/content/projects/images/narrative-generator/banner.png)

## Overview
This is my latest weekend project. A storyline generator which uses an LLM to generate
a set of strictly-typed artifacts which follow a user-defined narrative.

## Problems
In my current day job, we need to create a realistic sandbox that potential
customers can spin up and explore our product with. The value of our product is
inherently tied to the richness, consistency and coherency of the data in our system.
We could laboriously generate all this data by hand but we have the power of robots (LLMs) nowadays
so I wanted a program/LLM to generate this data for me. I previously tried
this purely with Claude-Code and it worked well enough, but I wanted a more consistent
method for generating the data I wanted.

As with most companies these days, everyone is trying to get some AI-powered agent
up and running. Our team has been building our Agent completely in-house with very
little use of external libraries. I've been wanting to spend some time evaluating some
interesting frameworks to help us develop these Agents more quickly and with better quality.
A few of the main problems I see are in composability, strict adherence to output data types,
and the ability to parallelize and test changes in isolation.

Unrelated to my work, we have been seeing some worrying trends from the big AI companies.
For example: [Ads](https://help.openai.com/en/articles/20001047-ads-in-chatgpt)
in ChatGPT, reduced service [quality](https://www.anthropic.com/engineering/april-23-postmortem)
of Claude models,
Anthropic [cutting off](https://www.reddit.com/r/AI_Agents/comments/1sbxshw/omg_anthropic_just_ended_claude_subscriptions_for/) openclaw from CC subscriptions, Github [pausing](https://github.blog/changelog/2026-04-10-pausing-new-github-copilot-pro-trials/) sign-ups for new subscriptions to github copilot,
Github [reducing quota](https://github.blog/news-insights/company-news/changes-to-github-copilot-individual-plans/)
for github copilot subscriptions, etc. I feel like this is the economics of AI catching up with these companies. 
We don't have any public numbers but my understanding
is that most of these companies have been under-cutting their subscriptions
(you as a user are getting way more value from subscription compared to the cost of running the models).
Due to the high demand and the slow roll-out/friction of bringing up more capacity (ie. datacenters)
I feel lots of these companies are starting to tighten the screws to try to reach profitability.
Due to these concerns I wanted to start evaluating what open-source projects
I can use to replace my Claude-Code and Github Copilot coding experiences. Being
able to own the entire AI-assisted coding stack myself sounds like a valuable capability.
I also want to freely use any model to power that experience.


## Goals
As with most of my projects I always try to learn at least 2 new things per project.

1. Create a library that can generate strictly-typed artifacts following a user-defined narrative.
1. Evaluate the [DSPy](https://dspy.ai/) library to see if it could be suitable for use in our production system. Does it provide good type guarantees for generated output, and how well can we compose the components together.
1. Play around with the [pi](https://pi.dev/) coding agent
1. Evaluate the new [deepseek-v4](https://api-docs.deepseek.com/news/news260424) to get first-hand experience of the capability of these models.


## Brain Dump

### Narrative Generator
The program takes a list of "Artifact" definitions and free-form narrative text from the Author,
which describes the desired storyline to follow during generation.
It then spits out a JSON file with a list of all the artifacts which follow the narrative's storyline.

An "Artifact" is any Author-defined dictionary of fields to create for the narrative. 
The Artifact definition is completely Author-defined — they specify exactly what fields 
should be populated (such as owner, created_at, description, etc.).
This makes the program flexible enough to generate any type of Artifact for any scenario.

For example, say I want to generate a Fantasy Adventure story with a party. The Artifacts
could be the specific Quests which happen in the story, and the Treasure which is
found during the adventure.
Another example, I am running a startup with a team of 5 engineers, I want to generate
a plausible storyline for a 2-week sprint. The artifacts that should be created are the
Tickets that are worked on during the 2 week sprints, the Meetings which are taken during the
sprint, etc.

#### DSPY
Let's start off by talking a little about DSPy as a library.
DSPy is a module-based library where you compose modules together to accomplish LLM generation.
DSPy provides some basic modules (Predict, ChainOfThought, ReAct, etc), and you can implement your own too.
Every module call accepts a `Signature`, which is the input/output contract for that generation.
When you call the module you ensure that every `InputField` is set and the library
will ensure that the `OutputFields` are generated by the LLM and with the correct types (int,str,list,pydantic).

Here is a snippet from their website of a `Signature` and calling the `Predict` module to have an LLM generate some text.
```
from typing import Literal

class Classify(dspy.Signature):
    """Classify sentiment of a given sentence."""

    sentence: str = dspy.InputField()
    sentiment: Literal["positive", "negative", "neutral"] = dspy.OutputField()
    toxicity: float = dspy.OutputField()

classify = dspy.Predict(Classify)
response = classify(sentence="This book was super fun to read, though not the last chapter.")
print(response.sentiment) # positive
```

As you can see most of your work is in defining the `Signatures`.
The Dspy library will look at doc comments and use those as the LLM instructions prompt,
and all the `Field` descriptions will also help guide the generation.
Once our signatures are defined, we make the appropriate calls to the Modules to have the LLM do 
some generation. You can then compose these module calls together into your own Modules.

```
class Outline(dspy.Signature)
class DraftSection(dspy.Signature)

class DraftArticle(dspy.Module):
  def __init__(self):
    self.build_outline = dspy.ChainOfThought(Outline)
    self.draft_section = dspy.ChainOfThought(DraftSection)

  def forward(self, topic: str):
    outline = self.build_outline(topic)
    sections = []
    for section in outline.sections:
      section = self.draft_section(section)
    return dspy.Prediction(title=outline.title, section=sections)
```

From here it is just up to your imagination. Each module is encapsulated
and relies on its `Signature` for defining the scope of it's generation
therefore we can independently test the quality, and tweak descriptions
to steer the generation. The `OutputFields` are strictly typed so any downstream
uses of the Module won't need any updates/changes in behavior. 
The contracts between modules have already been defined.

#### Architecture
For our program this is our general workflow. 
Each step has their own defined `dspy.Signature`. 
We create a top-level `Orchestrator` module which just facilitates calling each
step one after the other.
```
InputScheme
-> ExtendNarrative
-> GeneratePhases
-> GenerateArtifacts
-> Validation
```

The InputScheme is the Author provided input which defines the set of people, list of
"artifact" defintions, a timeframe, and a free-form narrative text describing the desired storyline
which the program should follow.

Here is an example spec:
```
{
  "people": [
    {
      "name": "Jasper Hunts",
      "title": "Warrior",
      "description": "Party leader, strong and dependable, carries the ancestral sword",
      "relationships": ["Childhood friend of Yuki Nagano"]
    },
    {
      "name": "Yuki Nagano",
      "title": "Esper",
      "description": "Esper agent with psychic abilities, quiet but deadly",
      "relationships": ["Childhood friend of Jasper Hunts"]
    }
  ],
  "timeframe": {
    "start": "1000-06-01T06:00:00",
    "end": "1000-06-07T22:00:00"
  },
  "narrative": "Jasper and Yuki venture into the Whispering Woods to find the lost Crystal of Elara. They face challenges including getting separated at the troll bridge, a riddle door, and a betrayal by a forest spirit but eventually reuninting at their favorite tavern to recount their adventures.",
  "artifacts": [
    {
      "name": "Quest",
      "fields": {
        "title": "str",
        "description": "str",
        "assigned_to": "list[str]",
        "reward": "str"
      },
      "constraints": {
        "assigned_to": "must_be_person_list"
      },
      "generation_hints": {
        "count": "3",
        "ordering": "sequential"
      }
    }
  ]
}
```


The first step takes in the Author's rough narrative text and expands on
it with greater detail. This adds details such as the specific events which happen,
who is involved, and a general timeline of the events.

Next we generate a list of Phases. The InputSpec defines a timeframe
for the narrative, and a Phase is a time-bounded period within that timeframe
where a set of events happen to a set of people.
We have a hard-coded step in the workflow to split the narrative into different
Phases so that the LLM can generate Artifacts with just that Period in mind.
You can think of it a like a storyboard, where each panel in the storyboard
is a Phase of the narrative.
One alternative would be to dump all the context and have the LLM just generate from that,
but I find it is harder to control quality and more difficult to steer the generation.
Making this a separate step means we can develop and test in isolation.

For each of these Phases we generate the list of Artifacts which should "happen" in that Phase.
Each phase has a general `description` and a list of `people_involved`. From there
we have it generate all the artifacts for that period. There is some generation guidance
on the number of artifacts to be generated per person. This helps control the distribution
of artifacts for that phase. In some cases we might only want artifacts for one of the `people_involved`,
in other cases we might want an even distribution of artifacts for all particpants.

Finally we have a validation step. This makes sure the generation
doesn't reference non-existent users, etc. Many of the generated artifacts can also 
have back-references to previous artifacts. This step is used to ensure those back-references
are valid. This step also does "proof-reading" of the artifacts for coherence
and it allows the LLM to generate "corrected-artifacts" to fix any inconsistencies 
in the output.

In the end we get some output similar to this:
```
{
  "meta": {
    "generated_at": "2026-04-26T22:42:08.933416Z",
    "model": "openai/deepseek-v4-flash",
    "temperature": 0.0,
    "seed": 42,
    "phases": [
      {
        "label": "Departure and Travel",
        "start": "1000-06-01T06:00:00",
        "end": "1000-06-02T12:00:00",
        "description": "The party departs from Oakhaven and travels through the Whispering Woods, heading towards Troll Bridge.",
        "people_involved": [
          "Jasper Hunts",
          "Yuki Nagano"
        ],
        "artifact_counts": {
          "Jasper Hunts": {
            "Quest": 1
          }
        }
      },
      ...
    ]
  },
  "artifacts": [
    {
      "type": "Quest",
      "id": "06b31156-8162-4288-97b7-26807b69b154",
      "created_at": "1000-06-01T06:00:00",
      "fields": {
        "title": "Travel to Troll Bridge",
        "description": "Depart Oakhaven and trek through the Whispering Woods to reach Troll Bridge. Ensure safe passage and gather information about the troll's whereabouts.",
        "assigned_to": [
          "Jasper Hunts",
          "Yuki Nagano"
        ],
        "reward": "100 gold coins and safe lodging for one night"
      },
      "references": []
    },
    ...
  ]
}
```


### AI Coding

As with most of my projects these days the majority (95%) of it was completely AI generated.
I have found this typical workflow to be effective without the need for fancy skills/tools/etc:
1. Write a draft spec by hand.
1. Have an AI refine it
1. Proof-read
1. Generate a tasks doc from the spec, review/iterate.
1. Kick-off the agent to implement it one phase at a time. Follow strict 
Test-Driven-Development with Red to Green methodology. First write the tests, run to see failures, write code and re-run to seen Green tests passing.
1. Each phase is one commit, and I review the output (lightly or heavily depending on importance)
1. After the main building blocks are completed then just ai-code like you normally do.

Setting up the [pi coding agent](https://pi.dev/) was easy.
One huge caveat is that the agent runs in complete YOLO mode which is a big no-no for me.
I understand this design choice from the developer. Adding safeguards into the
agentic loop adds much more complexity to the project. The program instead provides
extensive plugins and extensions capabilities to help shore up this shortcoming.

To fix this issue their recommendation is to run in a container.
I used Docker and you can see my setup under the `.pi` directory in the github project.
Running in a container means that at least my system is safe from a stray `rm -rf /`
but it doesn't really prevent an AI from using secrets stored in `.env` files
to bork any services it can connect to (github, DB, etc). Even though it is slower,
I prefer to review all tool call commands, and use whitelists/YOLO mode only for commands I trust.

Other than this YOLO-lifestyle using the pi-coder was quite nice to use.
1. The core functionality is simple. It only has `bash,read,edit,write` tools.
It has very simple `settings.json` configuration. It has straightforward session management (stored in session files).
And you can easily switch between models as long as the `_API_KEY` is defined in the environment.
2. The extensions system is a simple drag-and-drop into a folder. It is completely
Typescript based and from the docs it seems like there are many hooks into the
life-cycle of the agentic loop.

I will probably continue to evaluate pi-coder in my personal time before I commit
using it for my professional work. I'll probably use an Agent to help me look
through the code-base and see if it is something suitable for me to fork
and maintain myself as my solo Agent-Coder tool. I'll also take a look at the extensions
system and see what plugins/extensions are available.

#### Deepseek
To power the `pi-coder` I used the newest `deepseek-v4` models through the 
Deepseek APIs to test out their performance.
In general, I find its performance comparable to the `claude-4.6` models
for the coding-related tasks I use them for. I mainly used `deepseek-v4-pro`
models for spec/task document generation and ran the `deepseek-v4-flash` for all the implementation tasks.

It's also much easier on the wallet, with pricing significantly better than both Anthropic and OpenAI
with at least a 2x savings for both input/output pricing for both model types.
|Model | Input/1M | Output/1M|
|---|---|---|
|deepseek-v4-flash | 0.14 | 0.28 |
|deepseek-v4-pro | 1.74 | 3.48 |
|claude-sonnet-4.6 | 3.00 | 15.00 |
|claude-opus-4.6 | 5.00 | 25.00 |
|gpt-5.4-mini | 0.75 | 4.50 |
|gpt-5.4 | 2.50 | 15.00 |

Also the fact that these are `open` weights is just awesome.
I still have my own personal reservations about China especially with the CCP, but
I cannot deny the progress of the Chinese AI companies and the capabilities of their
models given their restrained compute. From my own light reading, it seems like
China is ramping up their GPU compute by designing sovereign chips but are still
a long way off until state of the art. But they have large investments in energy
and are probably going to build out capacity much more easily than the rest of the world.


## Conclusion
DSPy is cool.
PI-coder is cool but needs customization.
Deepseek models are cheap and cool.
I now have the power to generate artifacts which follow a storyline. \
yipee!
