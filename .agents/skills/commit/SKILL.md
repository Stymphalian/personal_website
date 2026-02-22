---
name: commit
description: Use this skill when the user asks you to commit, stage and commit, or write a commit message for their changes. Covers tasks like "commit my changes", "make a commit", "write a commit message", or "commit and push". Produces a succinct conventional commit message derived from the staged diff.
---

## Purpose

Inspect the currently staged changes and produce a well-formed, succinct Git commit message that
accurately describes what changed and why. Then commit using that message.

---

## Instructions

### 1. Inspect staged changes

Run the following to see what is staged:

```bash
git diff --staged --stat
git diff --staged
```

Read the diff carefully. Identify:
- Which files changed and in what way (added, modified, deleted)
- The logical intent behind the changes (new feature, bug fix, refactor, test, docs, chore)

### 2. Choose a commit type

Use [Conventional Commits](https://www.conventionalcommits.org/) prefixes:

| Type       | When to use                                           |
|------------|-------------------------------------------------------|
| `feat`     | A new feature or capability                           |
| `fix`      | A bug fix                                             |
| `refactor` | Code restructure with no behaviour change             |
| `test`     | Adding or updating tests                              |
| `docs`     | Documentation only                                    |
| `style`    | Formatting, whitespace — no logic change              |
| `chore`    | Build scripts, deps, config — no production code      |
| `perf`     | Performance improvement                               |
| `ci`       | CI/CD pipeline changes                                |

### 3. Write the commit message

**Format:**
```
type(optional-scope): short imperative summary   ← 72 chars max, no period
- bullet with key detail (optional)
- bullet with key detail (optional)
```

**Rules:**
- Subject line: imperative mood, lowercase after the colon, no trailing period
- Keep the subject under 72 characters
- Add bullet-point body lines only when there are non-obvious details worth capturing
- Do **not** pad with filler phrases like "various improvements" or "misc changes"
- Do **not** mention file names unless they are the whole point of the change

**Examples:**
```
feat(projects): add terrain-gen project card and detail page
- adds content/projects/terrain-gen-in-godot.md with frontmatter
- reruns generate-projects.mjs to update projects_list.ts
```

```
fix(navigation): correct active link highlight on home route
```

```
refactor(content-loader): extract parseMarkdownBody helper
```

### 5. Commit

```bash
git commit -m "type: summary" -m "- detail line 1" -m "- detail line 2"
```

Omit the `-m "- detail"` arguments when the subject line is self-explanatory.

---

## Notes

- Never use `git add -A` unless the user explicitly asked to stage everything first.
- If `projects_list.ts` was regenerated, include it in the same commit as the `.md` source file that triggered the regeneration — do not split them.
- If a `.ai/tasks-prd-*.md` task file was updated, include it in the same commit as the code changes it tracks.
