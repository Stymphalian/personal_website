# Personal Website

This is the repository for housing my personal website.
I built it entirely using Cursor/AI tools as a means of learning how to better
use the tools. \
The actual data is written in the `personal-blog/content/projects` markdown files.

## Development
```
docker compose up --build -d
# Open in VSCode with RemoteExplorer
```

## Commands
```
cd personal-blog
npm run dev
npm run generate:projects
npm run build
```

## Push
```
npm run build
Copy the dist/ folder into Stymphalian.github.io folder
Upload to digital ocean instance
```