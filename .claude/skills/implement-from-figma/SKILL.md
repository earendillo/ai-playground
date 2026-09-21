---
name: implement-from-figma
description: Implement a UI component from a Figma node and verify the implementation against the browser-rendered result.
---

# Implement from Figma

## Input

The user provides a Figma design URL containing a target `node-id`.

## Goal

Implement the specified Figma node in the current application and verify the result against the design.

## Workflow

### 1. Inspect the Figma target

Extract the `fileKey` and `nodeId` from the provided Figma URL.

Use the Figma MCP to retrieve:

- metadata for the target node,
- design context for the target node,
- relevant child nodes,
- provided image/SVG assets.

Do not start implementation until the target node and its relevant children are understood.

Treat the Figma MCP output as the source of truth rather than inferring measurements from the screenshot.

After retrieving the Figma MCP data, extract the measurable design properties required for browser verification.

Create or update the expected verification data from the Figma MCP result before comparing the implementation.

The expected data must come from Figma, not from the browser implementation and not from manually adjusted values.

The expected verification data must use the same property structure as the browser inspection output whenever the corresponding Figma value is available.

Do not transform values merely to match the browser representation when the comparison tooling already normalizes that representation.

Keep the expected data limited to measurable properties that can be compared deterministically.

### Figma request budget

Minimize Figma MCP requests.

For each implementation task:

- retrieve the required Figma data once at the beginning of the task,
- collect all required target-node, child-node, geometry, typography, color, layout, and asset information during this initial Figma inspection,
- save the retrieved design information as a local snapshot before implementation,
- use the local snapshot as the source of truth for all subsequent implementation and verification iterations,
- do not call Figma MCP again during the fix-and-verify loop unless the initial snapshot is missing information that is strictly required to complete the task.

If additional Figma data is required, first check the local snapshot and existing project artifacts before making another Figma MCP request.

### 2. Inspect the project

Before modifying code:

- identify the application framework,
- identify the styling system,
- inspect relevant existing components,
- inspect relevant tests,
- identify the appropriate location for the new component.

Prefer extending the existing project structure over introducing new abstractions.

Do not add dependencies unless they are necessary for the implementation.

### 3. Implement the design

Implement the target node in the existing application.

### Component architecture

Implement the Figma target as a dedicated reusable component.

Do not implement the component directly inside `page.tsx` or another route/page file.

Before creating the component:

- inspect the existing component structure,
- identify the appropriate component directory,
- follow the project's existing naming and file conventions.

The page or route should only compose and render the component.

When the design contains values that are expected to vary between usages, expose them as typed component props instead of hardcoding them.

Keep the component API minimal:
- add props only when a value is meaningfully variable,
- do not create props for static Figma design tokens,
- do not introduce abstractions that are not required by the design or existing application architecture.

Requirements:

- preserve the visual structure from Figma,
- use the exact Figma-provided assets when available,
- preserve relevant `data-node-id` attributes,
- reproduce dimensions, spacing, typography, colors, borders, radii, and positioning,
- use the project's existing styling conventions,
- do not introduce placeholder values when Figma provides an explicit value.
- Prefer `rem` for CSS dimensions, spacing, typography, and other scalable values instead of hardcoded `px` values.
- Convert Figma pixel values to `rem` using the project's root font size.
- Preserve pixel values only when they are required for exact rendering, asset dimensions, borders, or other values that should remain fixed.
- Do not change the visual result when converting values from `px` to `rem`.

After implementation, identify the DOM element corresponding to the target Figma node using its `data-node-id`.

Identify the DOM elements corresponding to relevant Figma child nodes using their `data-node-id` attributes.

Prefer stable Figma-to-DOM mapping over positional or CSS-selector-based identification.

### 4. Verify the implementation

Start the application and inspect the rendered target element in a real browser.

Use the existing browser inspection tooling to collect structured values for:

- position,
- dimensions,
- padding,
- margin,
- typography,
- text color,
- background color,
- border radius,
- relevant child elements.

The verification must cover every measurable property that is available from both Figma and the browser inspection output for the target and relevant child nodes.

Compare the browser values against the measurable values obtained from Figma.

Do not rely on visual inspection alone.

When a mismatch is found, report:

- Figma value,
- browser value,
- Figma node ID,
- DOM selector or `data-node-id`,
- the property that differs.

Then fix the implementation and repeat the verification.

Stop only when all required measurable properties satisfy the verification criteria.

### 5. Completion criteria

The task is complete only when:

- the target Figma node is implemented,
- the target and relevant children have stable Figma-to-DOM mapping,
- required Figma assets are used,
- deterministic browser verification passes,
- existing automated tests pass,
- no known visual mismatch remains within the defined verification criteria.

Do not regenerate or update visual snapshots merely to make a failing visual test pass.

### Verification tooling

Use the repository's existing UI verification tools:

- `scripts/ui/inspect.ts` to inspect rendered DOM/CSS values.
- `scripts/ui/compare.ts` to compare expected and actual structured values.
- Playwright tests for browser-level verification.

Do not recreate these tools inside the skill.
Reuse the existing scripts.

### Verification loop

For the target Figma node:

1. Ensure the application is running.
2. Use the target Figma node ID as the DOM `data-node-id`.
3. Run:

   `pnpm exec tsx scripts/ui/inspect.ts "[data-node-id='<NODE_ID>']"`

4. Store the resulting browser measurements as the actual result.
5. Compare the actual result against the expected design measurements using:

   `pnpm exec tsx scripts/ui/compare.ts`

6. If the comparison fails, inspect the reported differences and fix the implementation.
7. Repeat the inspection and comparison after every fix.
8. Run the Playwright suite after the verification loop completes.

Use screenshot comparison as a supplementary visual check, not as a replacement for deterministic property comparison.

Never modify the expected values simply to make the comparison pass.

## Rules

- Treat the Figma design as the source of truth for visual properties.
- Inspect the existing codebase before modifying files.
- Preserve the project's existing technology and styling conventions.
- Do not replace existing project configuration unnecessarily.
- Do not use placeholder UI when Figma provides the required assets.
- Preserve Figma node IDs as `data-node-id` attributes where they are useful for verification.
- Do not consider the implementation complete merely because a screenshot looks approximately correct.

## Verification

The implementation must be verified using the browser.

At minimum, verify:

- dimensions
- position
- spacing
- typography
- colors
- border radius
- relevant child elements
- provided image/SVG assets

Use deterministic comparisons where possible.

If verification finds a mismatch:

1. identify the mismatch,
2. modify the implementation,
3. re-run verification,
4. repeat until the defined verification criteria are satisfied.

## Completion

Only report success after the implementation and verification pass.