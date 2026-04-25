# Agent Instructions

This repository is an MVP for an Electron + React desktop AI agent shell.

Before making structural or architectural changes, read these documents:

- `docs/react-directory-structure.md`
- `docs/tech-stack-and-progress.md`

## Core Rules

- Follow the feature-first React directory structure documented in `docs/react-directory-structure.md`.
- Do not create broad global folders like `src/components`, `src/hooks`, `src/services`, `src/utils`, or `src/types` for domain code.
- Place code inside the feature that owns it.
- Use `shared/` only for code that has no domain knowledge.
- Keep Electron-specific code outside React features unless it is a typed renderer-facing API wrapper.

## Feature Folder Roles

Inside a feature or sub-feature, use these folder names consistently:

- `components/`: React components.
- `hooks/`: React custom hooks.
- `stores/`: Zustand stores and client state.
- `services/`: side effects, IPC calls, workflow execution, API calls.
- `utils/`: pure helper functions.
- `constants/`: constants.
- `types/`: TypeScript types.

Add these only when the feature actually needs them:

- `schemas/`: validation schemas for tool inputs, forms, IPC payloads.
- `adapters/`: wrappers around external implementations such as OpenAI, Electron, CDP, or browser automation.
- `mappers/`: DB/API-to-UI model transformations.
- `fixtures/`: development mock data.
- `tests/`: feature-local tests when colocated tests become too many.
- `assets/`: feature-specific static assets.
- `config/`: feature configuration.
- `commands/`: command palette, shortcut, or app command actions.

## Agent Domain

The `agent` feature should be organized by sub-feature:

- `core/`
- `preview/`
- `runs/`
- `tools/`
- `approvals/`
- `timeline/`

Do not let one large `agent/components` or `agent/hooks` folder become a dumping ground.

## Safety And Product Constraints

- Browser/SaaS automation must be designed with approval gates for risky actions.
- Deleting, submitting, sending, permission changes, payment-related actions, or sensitive data entry must require explicit user approval.
- Keep user-facing text translatable through the shared i18n layer.
- Prefer small, typed interfaces between renderer, Electron main process, and agent runtime.

