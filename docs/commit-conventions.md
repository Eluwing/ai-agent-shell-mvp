# Commit Conventions

This document defines the commit message style for this repository so both humans and agents can write consistent commits.

When an agent is asked to create or rewrite a commit, it should follow this document by default.

## Default Format

Use Conventional Commits with a required body:

```txt
type(scope): short summary

- what changed
- why it changed
- any follow-up or boundary notes
```

For every commit, include a short body under the subject.

Examples:

```txt
feat(ui): add custom title bar

- introduce a renderer-controlled header for the app shell
- keep the existing macOS traffic lights behavior
- prepare the title bar for future control composition

fix(electron): restore window controls on macOS

- fix the native window button placement in the hidden title bar mode
- keep renderer layout offsets aligned with the traffic light area

refactor(layout): split toolbar group components

- separate the toolbar into smaller title bar sections
- make the layout easier to read and extend

chore(build): update packaging config

- adjust the packaging config for the current build pipeline
```

## Recommended Rules

- Write commit messages in English.
- Keep the subject short and specific.
- Use present tense and imperative mood.
- Prefer one logical change per commit.
- Always include a body, even for small changes.
- Keep the body to 2-5 short bullet points.
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

## Body Required

Add a body for every commit. The body should:

- explain what changed
- explain why it changed
- mention any follow-up work or boundary notes when relevant

Example:

```txt
feat(ui): refine macOS title bar and toolbar

- replace the native header with a renderer-controlled title bar
- keep native macOS traffic lights
- compact the layout mode controls and language selector
- split locale labels and icon resolution for future flag support
```

Preferred shape for this repo:

```txt
type(scope): short summary

- what changed
- why it changed
- any follow-up or boundary notes
```

## Agent Checklist

Before committing, the agent should confirm:

- the commit contains only the intended change
- the message uses `type(scope): subject`
- the subject is specific and not vague
- the body is present for every commit
- the body captures the important details
- the message reflects the actual files changed
- the final commit message follows this document's format exactly
- the subject is short and the body captures the important details

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
