# Pull Request Conventions

This document defines the pull request writing style for this repository so both humans and agents can open consistent PRs.

When an agent is asked to open a PR, it should follow this document by default.

## Default Format

Use a short, specific title in English.

Prefer the same family of labels as commit messages:

```txt
feat(scope): short summary
fix(scope): short summary
refactor(scope): short summary
ui(scope): short summary
docs(scope): short summary
chore(scope): short summary
```

Examples:

```txt
feat(theme): add global theme toggle
refactor(workspace): split tab strip and browser frame
ui(workspace): polish Chrome-style tabs
docs(layout): add directory structure guidance
```

## Recommended Rules

- Write the title in English.
- Keep the title short and specific.
- Prefer one logical change per PR.
- Make the title reflect the area being changed.
- Match the PR title to the dominant commit type when possible.
- Avoid vague titles such as `update`, `fixes`, or `changes`.

## Preferred PR Body Shape

Use a short summary followed by bullets:

```md
## Summary
One short paragraph that explains the overall goal.

## What changed
- bullet point
- bullet point
- bullet point

## Verification
- command or check
- command or check
```

## Body Guidance

Add a body if:

- the PR touches multiple related files
- the change affects Electron, IPC, browser surface, or other boundaries
- the change includes documentation or migration details
- you want to highlight follow-up work
- you want the PR to be self-explanatory in the review list

## Required Review Checklist

Before opening a PR, the agent should confirm:

- the PR contains only the intended change
- the title uses a concise `type(scope): subject` style when possible
- the body explains what changed and why
- verification steps are included when relevant
- any follow-up work or known limitations are noted
- the title reflects the actual files changed
- the PR is easy to scan in a review queue

## Preferred Notes For This Repo

- Use `feat` for new user-visible work.
- Use `ui` for visual or layout-only changes.
- Use `refactor` for structural changes without behavior change.
- Use `docs` for documentation-only PRs.
- Use `fix` for bug fixes.
- Mention migration details when a PR moves files or changes boundaries.
- If a PR includes a mix of unrelated work, split it before opening.

## Avoid

- Overly long titles that repeat the whole task description.
- Titles that only say `update` or `adjust`.
- Mixing unrelated areas in one PR when it can be split.
- Omitting verification when the change was actually built or tested.
- Writing the body as a copy of the file diff.

## Practical Rule

If the PR is small and focused, keep the title narrow.
If the PR is broad, use the main area plus a short topic.
If the PR touches boundaries or infrastructure, mention that explicitly in the body.
If the PR is likely to be reviewed by others, make the summary readable without opening the diff.
