# Claude Instructions

This repository is an MVP for an Electron + React desktop AI agent shell.

Before making structural or architectural changes, read:

- `docs/react-directory-structure.md`
- `docs/electron-architecture.md`
- `docs/tech-stack-and-progress.md`
- `docs/commit-conventions.md`

Before creating or rewriting commits, follow `docs/commit-conventions.md` exactly.

## Project Conventions

- Use the feature-first directory structure documented in `docs/react-directory-structure.md`.
- Do not add domain code to broad global folders such as `src/components`, `src/hooks`, `src/actions`, `src/api`, `src/lib`, or `src/types`.
- Put files under the feature or sub-feature that owns the behavior.
- Use `shared/` only for reusable code that does not know about agent, workspace, runtime, approval, timeline, or layout domain concepts.
- Follow the Electron main/preload/IPC structure in `docs/electron-architecture.md`.

## Folder Meaning

Use these directories inside features and sub-features:

- `components/` for React components.
- `hooks/` for React hooks.
- `stores/` for Zustand stores.
- `actions/` for user intent or workflow-level use cases.
- `api/` for IPC/API/runtime bridge calls.
- `adapters/` for external implementation wrappers.
- `lib/` for feature-local pure functions.
- `constants/` for constants.
- `types/` for TypeScript types.

Add optional directories only when useful:

- `schemas/`
- `mappers/`
- `fixtures/`
- `tests/`
- `assets/`
- `config/`
- `commands/`

## Agent Feature

The `features/agent` domain should remain split into sub-features:

- `core`
- `preview`
- `runs`
- `tools`
- `approvals`
- `timeline`

Agent browser automation, tool calls, approvals, and timeline code should not be mixed into a single flat folder.

## Implementation Notes

- Keep UI strings in the i18n layer.
- Keep renderer-to-Electron interactions typed and narrow.
- Risky browser automation actions should pass through an approval gate.
- Do not expose raw `ipcRenderer`, Node APIs, or `webContents` to the React renderer.
- Prefer incremental, scoped changes that preserve the current MVP behavior.
