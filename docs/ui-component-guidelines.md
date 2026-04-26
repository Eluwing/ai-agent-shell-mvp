# UI Component Guidelines

This document defines the general UI component style for this repository.

It applies to feature components, shared UI wrappers, and reusable control surfaces.

## Default Rule

- Prefer props first.
- Use `const` only as a helper for repeated or meaningful values.
- Keep component responsibilities small and explicit.

## Props First

Use props when the caller should control a visual or behavioral choice.

Good examples:

- `active`
- `ariaLabel`
- `onClick`
- `withSeparator`
- `variant`
- `className`

Prefer props when:

- the same component is used in more than one place
- the caller should own the size or placement policy
- the value is part of the component contract

## Use `const` Sparingly

Use local constants only when they help readability.

Good reasons to extract a `const`:

- a class string is repeated more than once
- a value has clear semantic meaning
- a value would otherwise make the render tree noisy

Avoid extracting `const` when:

- the value is used only once
- the inline version is shorter and easier to scan
- the constant name adds more noise than clarity

## Component Ownership

- The parent decides placement and grouping.
- The child decides its own size and density.
- Shared wrappers should not swallow control-specific styling policy.
- If a component needs special sizing, make that decision in the component that owns the UI.

## Layout And Chrome

For shell-like UI such as title bars and toolbars:

- keep the outer shell structural
- keep control sizing local to the control component
- use section wrappers only for grouping and separators
- avoid pushing all sizing rules into the shell component

## Prefer Small Contracts

- Keep interfaces typed and narrow.
- Pass only the styling knobs that are actually needed.
- Avoid generic style dumping grounds.
- Prefer meaningful names over catch-all utility props.

## Avoid

- Mixing unrelated control policies in one parent component.
- Overusing `const` for values that are clearer inline.
- Making shared wrappers responsible for every size decision.
- Creating global UI folders for domain-specific components.

## Examples

### Good

```tsx
<LayoutModeToolbar />
<LanguageSwitcher />
<TitleBarSection withSeparator />
```

## Practical Rule

If a style choice is local to one component, keep it there.
If a style choice is part of a reusable contract, expose it through props.
If a value is repeated or meaningful, a small `const` is fine.
