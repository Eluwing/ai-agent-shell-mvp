# Chrome Tab Roadmap

This document captures the remaining work needed to make the workspace tab strip feel closer to Chrome.

Use it as a follow-up checklist. These items are intentionally deferred and should not block the current implementation.

## Current Good State

- Tabs render in the title bar.
- Active workspace switching works.
- The title bar owns the available tab width.
- The tab strip already reacts to the measured center width.
- Close actions are scoped to active tabs.

## Follow-Up Checklist

### 1. Replace threshold-based tab logic with width budgeting

- Stop relying on hard show/hide thresholds inside a single tab component.
- Compute a per-tab width budget from the available title bar space.
- Keep the strip responsible for width allocation.
- Keep the tab component responsible for rendering only.

### 2. Separate active and inactive width priorities

- Active tabs should prioritize:
  1. close button
  2. title
  3. icon
- Inactive tabs should prioritize:
  1. icon
  2. title
- When space is tight, reduce lower-priority content first.

### 3. Introduce a tab display mode model

Use explicit modes instead of ad hoc conditionals.

Example modes:

- `active-full`
- `active-title-only`
- `active-close-only`
- `inactive-full`
- `inactive-icon-only`

The strip can compute the mode, and the tab can render from that mode.

### 4. Make width allocation more Chrome-like

- Avoid giving every tab the exact same width in every state.
- Let active tabs keep a stronger presence than inactive tabs.
- Let inactive tabs compress sooner.
- Keep the strip responsive to the number of tabs and the available center width.

### 5. Improve tab layering and overlap

- Make the active tab feel visually on top of the inactive tabs.
- Use stronger z-index separation.
- Consider subtle overlap or tighter adjacency between neighboring tabs.
- Keep the content area visually connected to the active tab.

### 6. Treat the close button as an overlay action

- The close button should not consume layout space when it does not need to.
- Keep it visually tucked into the active tab.
- Preserve clickability without making the tab feel crowded.
- Avoid letting the close button drive the width of inactive tabs.

### 7. Smooth the title truncation behavior

- Titles should truncate naturally before they disappear.
- Use width-based truncation instead of abrupt visibility switches.
- Keep the title visible as long as the available width allows.
- Hide the title only after the truncated label no longer feels readable.

### 8. Improve active tab emphasis

- Active tabs should feel slightly more elevated than inactive tabs.
- Consider stronger contrast, shadow, height, or border treatment.
- Make the active tab read as the focused destination rather than just another button.

### 9. Revisit tab strip overflow behavior

- Decide whether overflow should compress further or scroll.
- If the strip cannot compress enough, define the fallback behavior explicitly.
- Keep the right-side title bar controls from being pushed around.

### 10. Keep the implementation split by responsibility

- `WorkspaceTabStrip`
  - measure available width
  - budget width across tabs
  - decide the tab display mode
- `WorkspaceTab`
  - render the icon, title, and close button from the provided mode
  - own the visual tab shell

## Suggested Order

1. Width budgeting
2. Display mode model
3. Active/inactive priority split
4. Active tab layering and close overlay
5. Title truncation polish
6. Overflow fallback

## Non-Goals For Now

- Do not rewrite the whole tab system immediately.
- Do not block current work on perfect Chrome parity.
- Do not move the tab system out of the title bar.
- Do not add more global abstractions unless they clearly reduce complexity.

