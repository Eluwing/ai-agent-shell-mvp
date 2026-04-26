# Commit Conventions

This document defines the commit message style for this repository so both humans and agents can write consistent commits.

When an agent is asked to create or rewrite a commit, it should follow this document by default.

## Default Format

Use Conventional Commits:

```txt
type(scope): short summary
```

Examples:

```txt
feat(ui): add custom title bar
fix(electron): restore window controls on macOS
refactor(layout): split toolbar group components
chore(build): update packaging config
```

## Recommended Rules

- Write commit messages in English.
- Keep the subject short and specific.
- Use present tense and imperative mood.
- Prefer one logical change per commit.
- Add a body only when the change needs extra context.
- Mention breaking changes explicitly with `!` or a body note.

## Allowed Types

- `feat`: new feature or user-visible improvement
- `fix`: bug fix
- `refactor`: structural change without behavior change
- `ui`: visual or layout-only change
- `chore`: maintenance, cleanup, or non-product work
- `docs`: documentation only
- `test`: tests added or updated
- `build`: build, packaging, or dependency setup
- `perf`: performance improvement

## Suggested Scopes

Use small scopes that make the area of change obvious:

- `ui`
- `layout`
- `workspace`
- `agent`
- `electron`
- `preload`
- `runtime`
- `i18n`
- `build`

## When To Add A Body

Add a body if:

- the commit touches multiple related files
- the reason for the change is not obvious from the subject
- the change affects Electron, IPC, or other boundaries
- you want to note follow-up work or migration details

Example:

```txt
feat(ui): refine macOS title bar and toolbar

- replace the native header with a renderer-controlled title bar
- keep native macOS traffic lights
- compact the layout mode controls and language selector
- split locale labels and icon resolution for future flag support
```

## Agent Checklist

Before committing, the agent should confirm:

- the commit contains only the intended change
- the message uses `type(scope): subject`
- the subject is specific and not vague
- the body is added only when it helps future readers
- the message reflects the actual files changed
- the final commit message follows this document's format exactly

## Preferred Style For This Repo

For this project, the most common patterns should be:

- `feat(ui): ...`
- `feat(layout): ...`
- `feat(workspace): ...`
- `feat(agent): ...`
- `feat(electron): ...`
- `refactor(...): ...`
- `chore(...): ...`

If a commit is mostly visual and layout-related, use `ui` or `layout`.
If a commit changes Electron window or IPC behavior, use `electron`.
If a commit changes runtime execution or window bridge logic, use `runtime` or `preload`.
