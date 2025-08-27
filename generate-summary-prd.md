# Rule: Generating Entire Project Summary

## Goal

Create a concise Project Requirement Document (PRD) in markdown format which
provides a concise list of all the features, relevant files and the tech stack
for the project. The PRD should be clear, actionable and suitable 
for a junior developer to get background context on the project and be able
to pick up and develop new features.

## Process

1.  **Read existing PRDs for Context**: Read existing PRDs under `tasks/prd-*.md` for general context of the project.
2.  **Analyze File Structure**: Read through every file in the project and make summary of the use of each file.
2.  **Extract Key Information**: Capture requirements, technical decisions, filepaths, technologies used.
3.  **Generate PRD:**  generate a PRD using the structure outlined below.
4.  **Save PRD:** Save the generated document as `prd-summary.md` inside the `/tasks` directory.

## Output
- **Format:** Markdown (`.md`)
- **Location:** `/tasks/`
- **Filename:** `prd-summary.md`

## PRD Structure

1.  **Overview**: Briefly describe the project
2.  **Features**: A list and description of the major features of the project (i.e pages and usage)
3.  **Relevant Files**: An explicit list of files used by the project with a brief description of each file.
- `path/to/potential/file1.ts` - Brief description of why this file is relevant (e.g., Contains the main component for this feature).
- `path/to/file1.test.ts` - Unit tests for `file1.ts`.
- `path/to/another/file.tsx` - Brief description (e.g., API route handler for data submission).
- `path/to/another/file.test.tsx` - Unit tests for `another/file.tsx`.
- `lib/utils/helpers.ts` - Brief description (e.g., Utility functions needed for calculations).
- `lib/utils/helpers.test.ts` - Unit tests for `helpers.ts`.
4.  **Technologies**: A bullet pointed list of the relevant tech stack used, as well as tools/common commands

## Target Audience

The summary is intended for the user to paste into a new chat window when they want to continue working on the same project or task, providing context for the AI assistant.
