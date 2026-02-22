# Agent Rules — ALWAYS FOLLOW THESE

## Task File Update Rule (NON-NEGOTIABLE)

After completing **every sub-task** and every **parent task**, you MUST immediately update
`/workspace/.ai/tasks-prd-ui-refactor-phase2.md`:

- Change `[ ]` → `[x]` for the completed sub-task.
- If all sub-tasks under a parent are `[x]`, mark the parent `[x]` too.
- Stage and include the task file in the same commit as the code changes.

**Never finish a response without updating the task file if work was done.**

## Commit Protocol

1. Run `npx jest` from `personal-blog/` — all tests must pass.
2. Run `npx tsc --noEmit` from `personal-blog/` — no type errors.
3. `git add -A && git commit ...` — include the task file in the staged changes.
4. Use conventional commit format with `-m` flags.

## Test Protocol

- Run `npx jest` after every sub-task that modifies source or test files.
- Fix any failures before proceeding.
- Never leave failing tests between tasks.

## Task Order

Work through tasks in order, one sub-task at a time, and pause for user approval after
each sub-task (per `process-task-list.md`).
