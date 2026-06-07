# Personal Website

This is the repository for housing my personal website.
I built it entirely using Cursor/AI tools as a means of learning how to better
use the tools. \
The actual data is written in the `personal-blog/content/projects` markdown files.

## Development

All dependencies are local — no global installs needed beyond Node.js itself.

```bash
# Use the pinned Node version (optional but recommended)
nvm use

cd personal-blog
npm ci          # First time: install exact dependencies
npm run dev     # Start dev server at http://localhost:3000
```

### Prerequisites
- **Node.js 24** (see `personal-blog/.nvmrc`; use `nvm` or `fnm` to manage versions)
- No global npm packages required — everything is in `devDependencies`