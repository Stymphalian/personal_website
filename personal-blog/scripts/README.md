# Scripts

This directory contains utility scripts for the project.

## generate-projects.mjs

Generates `src/data/projects_list.ts` by reading all markdown files from `content/projects/` and extracting their frontmatter.

### Usage

```bash
npm run generate:projects
```

### What it does

1. Scans `content/projects/` directory for `.md` files
2. Parses the YAML frontmatter from each file using `gray-matter`
3. Sorts projects by date in descending order (newest first)
4. Generates a TypeScript file with properly typed project objects
5. Outputs to `src/data/projects_list.ts`

### When to use

Run this script whenever you:
- Add a new project markdown file to `content/projects/`
- Update frontmatter in existing project files
- Want to ensure `projects_list.ts` is in sync with the markdown content

### Generated file

The generated `projects_list.ts` file:
- Contains a warning header to not edit manually
- Includes a note that projects are sorted by date (newest first)
- Includes a timestamp of generation
- Exports a typed `projects` array that conforms to the `Project` interface
- Automatically adds empty `images` and `videos` arrays for backward compatibility
- Projects are ordered by date in descending order

### Requirements

- Node.js (ESM module support)
- `gray-matter` package (dev dependency)

### Frontmatter fields

The script extracts the following fields from markdown frontmatter:

**Required:**
- `id`: Unique identifier
- `slug`: URL-friendly slug
- `title`: Project title
- `description`: Full description
- `shortDescription`: Brief description
- `image`: Featured image path
- `techStack`: Array of technologies used
- `tags`: Array of tags
- `featured`: Boolean flag
- `date`: Date string (YYYY-MM-DD)
- `showDetails`: Boolean flag for detail page

**Optional:**
- `liveDemo`: URL to live demo
- `githubRepo`: URL to GitHub repository
- `images`: Array of image objects (type, src, alt, caption, thumbnail)
- `videos`: Array of video objects (type, src, alt, caption, thumbnail)

**Image/Video Object Format:**
```yaml
images:
  - type: image
    src: /images/project/image1.png
    alt: Alt text for the image
    caption: Caption describing the image
    thumbnail: /images/project/thumbnail.png  # Optional
videos:
  - type: video
    src: https://www.youtube.com/embed/video-id
    alt: Alt text for the video
    caption: Caption describing the video
    thumbnail: /images/project/video-thumb.png  # Optional
```

If `images` or `videos` arrays are not provided or are empty, the script will generate empty arrays `[]`.
