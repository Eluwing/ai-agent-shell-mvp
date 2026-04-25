# Gemini Instructions

This repository is an MVP for an Electron + React desktop AI agent shell.

Before changing architecture or directory structure, read:

- `docs/react-directory-structure.md`
- `docs/tech-stack-and-progress.md`

## Required Structure

Follow the feature-first React structure.

Do not create global domain folders like:

```txt
src/components/
src/hooks/
src/services/
src/utils/
src/types/
```

Instead, place files in the owning feature:

```txt
features/workspace/components/
features/workspace/hooks/
features/agent/tools/services/
features/agent/timeline/types/
```

Use `shared/` only for domain-free reusable code.

## Standard Feature Directories

Use these names consistently:

- `components/`
- `hooks/`
- `stores/`
- `services/`
- `utils/`
- `constants/`
- `types/`

Use these only as needed:

- `schemas/`
- `adapters/`
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

Each sub-feature can have its own `components`, `hooks`, `services`, `utils`, `constants`, and `types` directories.

## Product Notes

- The app will automate SaaS systems through Electron browser surfaces.
- Risky actions must require user approval.
- User-facing strings should be translatable.
- Keep the React renderer, Electron main process, and agent runtime separated by typed boundaries.

