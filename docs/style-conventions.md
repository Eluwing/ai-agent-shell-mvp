# Style Conventions

This document defines how style values should be organized in this repository.

Use it when touching layout spacing, shell chrome, theme tokens, utility classes, or any shared visual values.

## Core Rule

- Put style values in the layer that actually owns them.
- Keep CSS-only values in CSS.
- Keep JavaScript calculation values in TypeScript.
- Keep component-local tweaks local unless they are repeated or shared.

## Value Ownership

### CSS Variables

Use CSS variables for values that are part of styling or layout and are consumed only by CSS.

Good examples:

- `--titlebar-leading-space`
- `--workspace-sidebar-width`
- `--workspace-inspector-width`
- `--app-titlebar-height`
- `--browser-toolbar-height`
- `--layout-gutter`
- `--titlebar-horizontal-padding`
- `--browser-horizontal-padding`

Use CSS variables for:

- colors
- borders
- shadows
- radii
- spacing
- widths and heights that only affect styling
- values that may differ by theme or layout mode

### Semantic Utility Classes

If a CSS variable is used repeatedly in class names, wrap it in a semantic utility class instead of using arbitrary values everywhere.

Prefer:

```txt
.h-app-titlebar
.px-titlebar-horizontal
.grid-cols-workspace-sidebar
```

Avoid repeating arbitrary value classes like:

```txt
h-[var(--app-titlebar-height)]
pl-[var(--titlebar-leading-space)]
grid-cols-[var(--workspace-sidebar-width)_1fr]
```

Use semantic utilities when:

- the value is reused in more than one component
- the class should read like a layout contract
- the style belongs to the shell or another shared surface

### TypeScript Constants

Use TypeScript constants only for values that participate in JavaScript logic.

Good examples:

- tab min width
- tab max width
- tab collapse threshold
- measurement offsets used in calculations

Use TypeScript constants when:

- the value is used in `Math.min`, `Math.max`, or other calculations
- the value is compared in logic branches
- the value is derived from measured DOM width or runtime state

### Component Local Values

Keep values local when they are:

- used only once
- tightly tied to a single component
- not part of a shared layout contract

If the value does not need a shared name, keep it inline.

## Naming

### CSS Variable Names

Use descriptive names that express the role of the value.

Examples:

- `--workspace-sidebar-width`
- `--browser-toolbar-height`
- `--titlebar-leading-space`

### Semantic Utility Names

Use utility names that read like a layout contract.

Examples:

- `h-app-titlebar`
- `px-titlebar-horizontal`
- `grid-cols-workspace-sidebar`
- `grid-rows-app-shell`

### TypeScript Constant Names

Use uppercase snake case for measurement constants.

Examples:

- `WORKSPACE_TAB_MIN_WIDTH`
- `WORKSPACE_TAB_MAX_WIDTH`
- `WORKSPACE_TAB_GAP`

## Preferred Layering

Use this order of preference:

```txt
1. CSS variables for shared style values
2. semantic utility classes for repeated CSS-only values
3. TypeScript constants for JS calculations
4. component local values for one-off tweaks
```

## Avoid

- Using Tailwind arbitrary values for repeated shared layout values when a semantic utility class would be clearer.
- Moving CSS-only layout values into TypeScript just because they are numeric.
- Putting calculation-only numbers into CSS variables.
- Letting a single component become the source of truth for unrelated spacing rules.

## Practical Rule

If the value is only styling, keep it in CSS.
If the value is only used in JavaScript logic, keep it in TypeScript.
If the value is shared across multiple components, give it a semantic name.
If the value is only needed once, keep it local.

