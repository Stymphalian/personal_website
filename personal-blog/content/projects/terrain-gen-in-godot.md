---
id: terrain-gen-in-godot
slug: terrain-gen-in-godot
title: Terrain Generation
description: Terrain Generation using perlin noise and DLA methods all in godot!
shortDescription: Perlin noise and DLA base terrain generation.
image: /content/projects/images/terrain-gen-in-godot/dla_preview.png
techStack:
  - C#
  - Godot
tags:
  - game programming
featured: true
date: 2026-01-01
githubRepo: https://github.com/Stymphalian/TerrainGenDLA
showDetails: true
images:
  - type: image
    src: /content/projects/images/terrain-gen-in-godot/terrain_gen_preview.png
    alt: Terrain Generation In Godot Preview
    caption: Terrain Generation Godot
  - type: image
    src: /content/projects/images/terrain-gen-in-godot/dla_preview.png
    alt: DLA preview
    caption: DLA preview
videos: []
---

# Terrain Generation

I was watching some of Sebastian Lague's old [videos](https://www.youtube.com/watch?v=wbpMiKiSKm8&list=PLFt_AvWsXl0eBW2EiBtl_sxmDtSgZBxB3)
and found one about terrain generation which really piqued my interest. 
I had previously done some programming around perlin noise/simplex noise but 
really only spent time with the math and generating the noise-map. So this time 
I wanted to dig deeper and go all the way through to some more proper terrain generation
with meshes and textures. Along the way I happened to watch another [video](https://www.youtube.com/watch?v=gsJHzBTPG0Y) about
terrain generation which introduced a new (to-me) method for generating the noise map called DLA (Diffusion Limited Aggregation).
DLA produces very interesting snow-flake/web-like structures with much higher frequency
detail compared to the perlin-noise based methods. I think it looks very similar to 
erosion based methods but it is (also) extremely computational intensive.

![Preview](/content/projects/images/terrain-gen-in-godot/dla_preview.png)
![Preview](/content/projects/images/terrain-gen-in-godot/terrain_gen_preview.png)

See the repositories for more images: \
https://github.com/Stymphalian/TerrainGenGodot \
https://github.com/Stymphalian/TerrainGenDLA


## Terrain Generation
Sebastian's playlist goes over everything for terrain generation. It includes noise map generation,
mesh generation, coloring, LOD (level of detail), endless terrain, LOD switching, falloff maps, collision,
color/texture shading. His tutorial is quite old (10+ years) and was written in Unity. I wanted
to build in Godot to get some more experience with the engine so I spent quite a bit of time 
trying to translate the same concepts between Unity/Godot. Most of my trouble came with
the Editor/Tools interaction differences between Unity and Godot.

The coolest part of the project for me was the endless terrain system. One very
important feature about perlin-noise is that it is infinitely tileable/generate-able.
Given any x/y value it can produce a consistent z value. The main problem is 
that for very large maps this could be terra-bytes worth of memory if they are pre-generated.
To work-around this we break up the world in tiles/chunks and only once the Player 
is within range do we generate the heightmaps/meshes,etc. Instead of blocking the 
main rendering thread most of the heightmap/mesh generation is done in threads
and we have a callback system to add the finished entities into the scene. Sebastian
also went over a LOD system so that far-away chunks are rendered with a simplified Mesh
to save time loading/rendering.

## DLA (Diffusion Limited Aggregation)
A very interesting iterative method for generating the height-map for terrain generation.
It produces very appealing patterns that emulate real mountain ranges with sharp valleys and cliffs.
The method involves two main steps: 1) Random-walk detail construction, 2) upscaling and blur.

Step (1) is a random-walk based method for adding detail to the heightmap (this is the DLA part of this method).
Imagine a grid of cells with one grain of sand in the center. Randomly drop another 
piece of sand "somewhere" in the grid and have it make a random walk. Once it 
bumps up against another grain of sand it stops and rests there. Iterate like this
until some threshold. This iterative method is what produces the appleaing snow-flake
like patterns. The only problem is that it is computationally intensive and infeasible
even for small grid size (128x128).

To solve this we can make the observation that the random-walk is relatively fast
as long as either 1) the grid size is small, or 2) most of the grid is already filled
with sand. From this we can see how step (2) of our method helps us. We can start
with a very small grid run the DLA and then upscale to a larger grid size and run 
DLA again on a much more filled-out grid. The blurring is necessary otherwise
the upscaling produces too much high-frequency details and not enough space is
filled in.

---

*Project completed: January 25, 2026*