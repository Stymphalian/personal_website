---
id: sound-omnibar
slug: sound-omnibar
title: Sound Omnibar
description: Frameless window overlay for streaming Audio Speech Recognition using SimulStreaming
shortDescription: Streaming ASR window overlay
image: /content/projects/images/sound-omnibar/banner.png
techStack:
  - python
  - PyQt
  - whisper-streaming
tags:
  - ASR
  - Python
  - AI
featured: true
date: 2025-10-06
githubRepo: https://github.com/Stymphalian/SoundOmnibar
showDetails: true
images:
  - type: image
    src: /content/projects/images/sound-omnibar/preview.png
    alt: Sound Omnibar Preview
    caption:  Streaming ASR window overlay
videos: []
---

# Sound Omnibar

I wanted to play around with local ASR (Automatic Speech Recognition).
So my little project was to build an always-on-top "omnibar" window which records
your mic audio upon global hotkey activation. It will stream the transcribed
audio and display it to the screen. After finishing recording the transcribed
audio text will be copied into your clipboard.

When I am working my personal desktop keyboard is usually behind my work laptop. 
When I want to search something in Google on my Desktop monitor I will have
to move around a bunch of stuff in order to type out my query. I wanted to use
this audio omnibar so that I can speack to my computer in order to write the text.

![Preview](/content/projects/images/sound-omnibar/preview.png)

## Features
 - Frameless always-on-top window 
 - Resizable
 - Configurable font, size, position, opacity
 - Display-only mode (receives no mouse/keyboard input)
 - Global hot-key to toggle recording


## Overview
The architecture is quite simple. The backend is using [SimulStreaming](https://github.com/ufal/SimulStreaming)
which runs `Whisper` models in a streaming fashion. It exposes a `socket` connection
for running the ASR. A client (PyQT python application) will connect to this `socket`
and record computer audio via `sounddevice` library. It will run background
threads to record audio, send audio chunks to the Backend, and receive the transcribed
text.

---

*Project completed: October 11, 2025*