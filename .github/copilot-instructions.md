# Copilot Instructions

## Project Structure

This is a **React/TypeScript/Vite personal portfolio blog** under `personal-blog/`. All npm commands, tests, and builds must run from `personal-blog/`, not the workspace root.

```
/workspace/
├── personal-blog/        # React app — all npm commands go here
│   ├── content/projects/ # Markdown source files for projects (DO NOT edit projects_list.ts directly)
│   ├── src/
│   │   ├── components/   # Reusable UI components (co-located tests: Component.test.tsx)
│   │   ├── pages/        # Route-level page components
│   │   ├── data/         # projects_list.ts (auto-generated), interfaces.ts
│   │   ├── utils/        # content-loader.ts, markdown.ts
│   │   └── types/        # content.ts (ProjectFrontmatter + TypeScript types)
│   └── scripts/          # generate-projects.mjs (codegen)
├── .ai/                  # Task files and agent rules — read before starting work
│   ├── AGENT_RULES.md    # Non-negotiable agent obligations
│   └── tasks-prd-*.md    # Active task lists — must be updated as work progresses
└── .cursor/rules/        # Additional cursor-specific rules
```

## Critical Developer Workflows

```bash
# All commands from personal-blog/
cd personal-blog

npm run dev          # Dev server at http://localhost:5173 (or 3000 via docker)
npx jest             # Run all tests — must pass before every commit
npx tsc --noEmit     # Type-check — must pass before every commit
npm run build        # Production build

# After adding/editing any content/projects/*.md file:
node scripts/generate-projects.mjs   # Regenerates src/data/projects_list.ts
```

## Content & Data Pipeline

Projects follow a **markdown → codegen → TypeScript** pipeline:

1. Source of truth: `content/projects/<slug>.md` (frontmatter + markdown body)
2. Codegen: `node scripts/generate-projects.mjs` → writes `src/data/projects_list.ts`
3. **Never manually edit `src/data/projects_list.ts`** — it is auto-generated and has a header warning
4. Content (markdown body) is loaded at runtime via `src/utils/content-loader.ts` using `gray-matter` — frontmatter is stripped, only the body is stored

## Styling Conventions

Always use project-specific Tailwind tokens — never raw hex values or generic Tailwind colors:

- `text-vs-editor-text` / `text-vs-editor-text2` / `text-vs-editor-text3` — body text hierarchy
- `bg-vs-editor-bg` / `bg-vs-editor-surface` / `bg-vs-editor-surface2` — background layers
- `border-vs-editor-border` — borders
- `text-crystal-blue-400` / `bg-crystal-blue-600` — accent/CTA elements
- `vs-editor-*` tokens are CSS-variable-backed for light/dark theme support (see `tailwind.config.js`)

## Routing

- `/` — Home page (shows full projects grid)
- `/projects/:projectId` — Project detail page
- `/about`, `/contact` — Static pages
- There is **no** `/projects` standalone route — the Projects nav link points to `/`

## Task File Protocol (NON-NEGOTIABLE)

Active task files live in `.ai/tasks-prd-*.md`. When working from a task file:

1. Mark each sub-task `[x]` immediately upon completion
2. Mark the parent task `[x]` when all sub-tasks are done
3. Include the task file in every commit alongside the code changes
4. **Never end a response without updating the task file if work was done**

## Commit Protocol

1. `npx jest` — all tests must pass
2. `npx tsc --noEmit` — no type errors
3. `git add -A && git commit -m "type: summary" -m "- detail" ...`
4. Use conventional commit format (`feat:`, `fix:`, `refactor:`, `test:`)

## Testing Patterns

- Tests are co-located with source: `MyComponent.tsx` + `MyComponent.test.tsx` in same directory
- Components that use `react-router-dom` must be wrapped in `<MemoryRouter>` or `<BrowserRouter>` in tests
- Mocks for `mermaid`, `react-markdown`, `rehype-highlight`, `remark-gfm` live in `src/__mocks__/`
- Run a single file: `npx jest src/components/ProjectCard/ProjectCard.test.tsx`
