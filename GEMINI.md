# Gemini Instructions

This repository is an MVP for an Electron + React desktop AI agent shell.

Before changing architecture or directory structure, read:

- `docs/react-directory-structure.md`
- `docs/electron-architecture.md`
- `docs/tech-stack-and-progress.md`
- `docs/title-bar-guidelines.md`
- `docs/ui-component-guidelines.md`
- `docs/commit-conventions.md`

Before creating or rewriting commits, follow `docs/commit-conventions.md` exactly.

## Required Structure

Follow the feature-first React structure.

Do not create global domain folders like:

```txt
src/components/
src/hooks/
src/actions/
src/api/
src/lib/
src/types/
```

Instead, place files in the owning feature:

```txt
features/workspace/components/
features/workspace/hooks/
features/agent/tools/actions/
features/agent/tools/adapters/
features/agent/timeline/types/
```

Use `shared/` only for domain-free reusable code.

## Standard Feature Directories

Use these names consistently:

- `components/`
- `hooks/`
- `stores/`
- `actions/`
- `api/`
- `adapters/`
- `lib/`
- `constants/`
- `types/`

Use these only as needed:

- `schemas/`
- `mappers/`
- `fixtures/`
- `tests/`
- `assets/`
- `config/`
- `commands/`

## Agent Domain Layout

Keep `features/agent` organized by sub-feature:

```txt
features/agent/
  core/
  preview/
  runs/
  tools/
  approvals/
  timeline/
```

Each sub-feature can have its own `components`, `hooks`, `stores`, `actions`, `api`, `adapters`, `lib`, `constants`, and `types` directories.

## Product Notes

- The app will automate SaaS systems through Electron browser surfaces.
- Risky actions must require user approval.
- User-facing strings should be translatable.
- Keep the React renderer, Electron main process, and agent runtime separated by typed boundaries.
- Do not expose raw `ipcRenderer`, Node APIs, or `webContents` to the React renderer.
