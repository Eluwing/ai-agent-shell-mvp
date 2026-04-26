# Title Bar Guidelines

This document defines how to structure and style title bar UI in this repository.

Use it when touching `AppTitleBar`, title bar sections, or the controls that live in the top chrome.

## Core Principle

- `AppTitleBar` owns structure.
- Individual controls own their own size, density, and visual details.
- `TitleBarSection` only groups related controls and optionally adds a separator.

## Responsibilities

### `AppTitleBar`

- Own the overall height of the title bar.
- Arrange the left drag area and the right control area.
- Decide the section order.
- Add separators only between major groups.
- Keep drag and no-drag areas explicit.

### `TitleBarSection`

- Wrap one logical group of controls.
- Optionally render a separator after the section.
- Avoid styling individual buttons or icons.
- Avoid knowing about the internal layout of the controls it wraps.

### Control Components

Examples include `ViewControls`, `LayoutModeToolbar`, and `LanguageSwitcher`.

- Own their own padding, icon size, and button height.
- Own their own active and hover states.
- Keep their own size rules local.
- Accept layout placement from `AppTitleBar`, but not styling policy from it.

## Spacing And Separators

- Use separators between major control groups, not between every button.
- Keep separators thin and low-contrast.
- Use consistent vertical alignment across the title bar.
- Prefer compact spacing that feels native on macOS.

## Preferred Patterns

- Keep the title text and the control groups visually balanced.
- Use sections for semantic grouping, not for decorative framing.
- Make controls self-contained so they can evolve independently.
- If a control needs a different size, change the control, not the title bar.

## Avoid

- Putting icon size rules in `AppTitleBar`.
- Using the title bar as a dumping ground for control-specific styles.
- Mixing layout concerns with control density rules.
- Adding unnecessary separators inside a control group.

## Example Structure

```txt
AppTitleBar
├─ drag area
├─ TitleBarSection
│  └─ ViewControls
├─ TitleBarSection
│  └─ LayoutModeToolbar
└─ TitleBarSection
   └─ LanguageSwitcher
```

## Practical Rule

If the change affects placement or grouping, edit `AppTitleBar` or `TitleBarSection`.
If the change affects button size, icon size, padding, or hover state, edit the control component itself.
