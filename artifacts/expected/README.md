# Expected verification data

Source: Figma file `Dnd4QLYhJ98DHRQUNYJuvx`, node `1:2` (Bottom Nav), read via the Figma MCP
(`get_metadata` + `get_design_context`). Values are not taken from the implementation.

Figma geometry (offsets relative to node `1:2`, size in px):

| Node  | Name             | Offset (x, y) | Size    | Fill      | Radius |
|-------|------------------|---------------|---------|-----------|--------|
| 1:2   | Bottom Nav       | (0, 0)        | 393x129 | #f5f6f7   | 24     |
| 1:3   | Menu List        | (0, 41)       | 393x58  | #ffffff   | 0      |
| 1:44  | Iphone Indicator | (0, 99)       | 393x30  | #ffffff   | 0      |
| 1:45  | Line             | (129, 116)    | 135x5   | #b9c0c9   | 100    |

`scripts/ui/inspect.ts` reports viewport-absolute positions, so each expected `position` is the
Figma offset above anchored at the rendered origin of the target node `1:2` (443.5, 295.5 at the
default 1280x720 Playwright viewport). Relative geometry - the part the design actually specifies -
is what gets compared.

Properties Figma does not define for these container nodes (inherited `color`, inherited font
`size`/`lineHeight`/`weight`) are recorded as the page's inherited values so the structure matches
the inspector output; `font.family` is Poppins, which does come from Figma (`next/font` renders it
as `Poppins, "Poppins Fallback"`).

Nodes deliberately excluded from this deterministic comparison: the five menu frames (1:4, 1:12,
1:20, 1:28, 1:36) and their labels (1:11, 1:19, 1:27, 1:35, 1:43). Their widths are flex fractions
(Figma 73.8px vs. the browser's 1/64px layout grid -> 73.796875) and text-measurement results
(Figma rounds "Home" to 36px, Chromium measures 35.796875), so exact equality is not achievable.
Those nodes are verified in `tests/smoke.spec.ts` instead: typography, weight, colors, icon assets
and node-id mapping via Playwright CSS assertions.
