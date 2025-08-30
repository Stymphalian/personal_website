---
id: 'ak-chibi-bot'
slug: 'ak-chibi-bot'
title: 'Arknights Chibi Twitch Bot'
description: 'A twitch bot and browser source overlay to show Arknight chibis walking on your stream. Viewers can issue !chibi chat commands to choose their own operator, change skins and play different animations.'
shortDescription: 'Twitch Bot and Browser Overlay for Arknights Chibis'
image: '/images/ak-chibi-bot/banner.png'
techStack: ['React', 'Spine', 'Twitch API', 'Golang']
tags: ['React', 'Spine', 'Twitch API', 'Golang']
featured: true
date: '2024-06-10'
liveDemo: 'https://akchibibot.stymphalian.top'
githubRepo: 'https://github.com/stymphalian/ak_chibi_bot'
showDetails: true
---

# Arknights Chibi Twitch Bot
A Twitch bot and browser source overlay that displays Arknights chibi characters walking on your stream. Viewers can interact with the bot using chat commands to choose operators, change skins, and play different animations.


## Background
I've been playing (addicted) to a mobile game called Arknights for a couple of years now (since 2023).
It's a mobile tower defense gacha game built by a chinese game company called Hypergryph.
Whilst I was unemployed I tried my hand at streaming on Twitch and this project evolved
out of me wanting to add something unique to my streams. 

In Arknights you gamble for characters (called operators) and they are the "towers" 
you deploy on the map to defend yourself. These characters have little chibi sprites
which have lots of different animations and skins and they even have a walk animation.
I wanted to rip these chibi assets from the Android APK and have them walk around 
as a stream overlay in OBS. Any viewer who then chats in my stream would have their
own little chibi they can play around with. To make it a bit more interactive and 
customizable I added a Twitch Bot to monitor for `!chibi` commands in the chat to allow 
the viewer to change the animations, skins, character, etc.
At first I built this project solely for myself but some other streamers showed
some interest in using it too so I made changes to allow anyone to easily paste
a URL link in their OBS Browser Source and it would easily allow them to have 
the overlay/twitch bot connection seamlessly.

For details you can checkout the [website](https://akchibibot.stymphalian.top/) and the [github](https://github.com/stymphalian/ak_chibi_bot) repository.

Here is an overview of the tech stack:
 - **Frontend**: React, [Spine](https://esotericsoftware.com/)
 - **Backend**: golang, postgres, Twitch API
 - **Infrastructure**: Docker, Digital Ocean

 ## Overview
 There were multiple parts to this project.
  1. Ripping the Assets from the Android APK.
      1. The game is built in Unity and the characters are animated using a technology called [Spine](https://esotericsoftware.com/)
      1. You need to extract out the `.atlas`, `.skel` and `.png` files for each character
      1. there are a variety of programs on github which allow you to rip out these assets. I won't got into it here as it is actually fairly messy.
  1. The architecture is not that straightforward.
      The AK Chibi Bot system components
      Component | Description
      ----------| ------------
      Spine Runtime | The Web/Typescript component which renders and plays the chibi spine animations in a browser window/OBS browser source.
      Spine Bridge | A server-side component connects to the Spine Runtime via websockets in order to forward instructions on what chibis to display and what animations should be played.
      Twitch Chat | Twitch IRC client which connects to the User's Twitch chat. This component parses the text `!chibi` commands and converts them into `Commands` to be processed by the `ChibiActor`.
      Chibi Actor | The chibi component provides an abstraction for dealing with rendering Chibis. It provides methods for setting the current operator, choosing which animations are being played, etc. This component also holds the list of viewers/chatters and keeps the mapping/state between a viewer and their current chosen chibi. This component uses the spine-bridge to communicate to the User's browser (ie. Spine Runtime) for displaying the Chibi.
      Rooms/Rooms Manager | A Room encapsulates a twitch chat, spine bridge/runtime and a chibi actor into a single object. Each time a Streamer creates a new Browser Source by hitting `HTTP GET /room` a new Room entry is added to the Rooms Manager. This abstraction keeps all the logic isolated between different streams/sessions.
      Web App | A frontend web application avaialable at the top-level domain. It provides a front facing website for the Bot as well as provides a `/settings/` page for Streamers to customize the Bots settings (i.e min/max values for `!chibi` commands). We login via Twitch OAUTH in order to authorize changes to a channel's settings.
      Database (postgres) | A database to hold persistent state for the the active rooms/chatters, as well as to store the twitch oauth tokens/session cookies. Mainly needed to allow for persistent user preferences saving, and to allow for seamless server restarts.
      Bot Server | The HTTP [server](server/main.go) which glues everthhing together. It serves all the HTML/JS for the web_app/spine_runtime, as well as provides the HTTP endpoints for connecting to the Rooms (i.e `/room`) and the Spine Bridge websocket connections (`/ws`). It holds all the state within the Rooms Manager, and provides the connection to the DB.

  1. The spine technology has an engine specific runtime library which you use to process/animate the spine models. 
      because we want to display in an OBS browser overlay we are using the webgl spine runtime.
  1. The backend server has two main purposes. 
      1. Firstly it is what serves the connection for the OBS Browser Source. This serves the Spine runtime to the OBS browser.
          1. This spine runtime player is essentially a dumb client which acts as a display for characters. 
          2. It holds a persistent websocket connection to the server to receive commands for displaying the sprites.
      2. Secondly, the backend acts as a proxy for connecting to the User's twitch IRC channel/chat and to monitor for `!chibi` commands from viewers.
          1. The backend is a stateful component which is the Master which holds the true state of which characters/animations are being played.
          1. It sends this information via the websocket connections to the Spine runtime player in the User's OBS Browser and orders the Runtime to display whatever it wants.
      1. All the spine assets are also served by the Backend
  1. We have a single Postgres DB for this project. For such a simple project it seems a little over-kill but there were
  two main things I need persistent state/storage for.
      1. hot-reloading - Whenever I update the docker container with a new image the container is briefly down. This would 
         kill any active OBS Browser connections and therefore a streamer's overlay would no longer work until they fully refreshed
         the overlay. I found this unacceptable as it made it really hard for me to hot-update the image to fix issues
         and to keep the User's experience un-marred. To fix this I added a exponential-backoff reconnection logic to the Spine Runtime 
         Player client. This way the client will try to reconnect to the server if it drops only briefly. Usually reloading the containers
         takes less than one minute so this offers a seamless experience for reloading the container and keeping the User overlay
         functioning.
      2. I wanted to provide a way for Streamers/Viewers to save their own customizations. 
          1. For the Streamer there are some configurations for how to small/large and slow/fast the characters move on the screen. I wanted to provide
        a way for Streamers to set these configurations and have them saved.
          1. I wanted to provide a feature for Viewers to "save" their favorite characters. This way whenever they 
        pop into a stream which uses the overlay it would always display their favorite character with their own customized
        animations and skins. Otherwise eachtime they join it would just be a random character.
  1. Infrastructure-wise we are deploying everything through Docker/containers. I setup a cheap ($5/mo) Digital Ocean instance
     to run the docker containers and have an nginx proxy to route requests to the containers. I get HTTPS certificates
     via [LetsEncrypt](https://letsencrypt.org/)
      1. The docker image bundles ALL the spine asset data (png/atlas/skel). This bloats the image file alot but
         it significantly speeds up file-serving from the go server. A better/more involved architecture would
         be to have the nginx serve these static files, or to have them in some other bucket storage but one of
         my main motivators was to reduce cost. I wanted to only run a single digital ocean instance and not have 
         to pay for any other storage/servies.
  1. The project's web-page at akchibibot.stymphalian.top is also served from the same Backend server and 
     on the same digital ocean instance. In an ideal world this would be it's own separate Server on it's own
     digital ocean instance. BUT again I'm saving on costs and complexity.
      1. The web-page itself it quite barebones. It just has some instructions on how to setup OBS to use the twitch bot
      as well as has a Docs page which lists all the commands and different configurations available.
      1. I also have a hidden `admin` page which I use to help monitor active Users of the twitch bot. It has helped me many 
      time triage/debug issues that happen for some Users.



```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
