# Branch Conventions

This document defines the branch naming style for this repository so humans and agents can create consistent branches.

When an agent is asked to create or rename a branch, it should follow this document by default.

## GitFlow Style

Use a GitFlow-style prefix followed by a short kebab-case description:

```txt
<type>/<short-topic>
```

Examples:

```txt
feature/workspace-tab-strip
feature/chrome-style-tabs
feature/title-bar-tabs
fix/sidebar-toggle-icon
fix/language-switcher-spacing
refactor/title-bar-controls
docs/title-bar-guidelines
hotfix/webview-view-switch
release/0.2.0
```

## Recommended Rules

- Write branch names in English.
- Use lowercase letters, numbers, and hyphens only.
- Keep the branch name short and descriptive.
- Prefer one logical change per branch.
- Make the branch name reflect the area being changed when possible.
- Prefer `feature/`, `fix/`, `hotfix/`, `release/`, `docs/`, `refactor/`, or `chore/`.
- If the team uses ticket numbers, place them after the prefix, such as `feature/ABC-123-add-tabs`.

## Suggested Patterns

- `feature/<topic>` for new user-facing work.
- `fix/<topic>` for bug fixes.
- `refactor/<topic>` for structure changes without behavior changes.
- `docs/<topic>` for documentation-only work.
- `chore/<topic>` for maintenance, cleanup, or tooling.
- `test/<topic>` for test-only work.
- `hotfix/<topic>` for urgent production fixes.

## Project-Flavored Examples

- `feature/workspace-tab-strip` for the Chrome-style tab work.
- `feature/title-bar-tabs` for tab UI inside the app chrome.
- `fix/sidebar-toggle-icon` for icon or toggle state issues.
- `refactor/title-bar-controls` for control group cleanup.
- `docs/title-bar-guidelines` for title bar guidance updates.
- `hotfix/webview-view-switch` for urgent workspace switching bugs.

## Avoid

- Branch names with spaces.
- Branch names with uppercase letters.
- Very long branch names that repeat the whole task description.
- Reusing a branch for unrelated work.
- Mixing multiple unrelated areas into one branch name.
- Custom prefixes that are not understood by the team.

## Practical Rule

If the task is small and focused, keep the branch name specific.
If the task is broad, use the main area plus a short topic.
If the branch will be shared or reviewed, make the name easy to scan in `git branch` and PR lists.
If the work maps cleanly to a common Git workflow type, use that type as the prefix.
