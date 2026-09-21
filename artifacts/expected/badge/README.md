# Expected verification data - Badge

Source: Figma file `vR3AuW3jxvnMMMMLDQvYJ6` ("Plus UI"), component set `2321:8706` (Badge),
read via the Figma MCP (`get_metadata`, `get_design_context`, `get_variable_defs`).
Values are not taken from the implementation.

Variant axes, exactly as Figma names them: `Kind` (default / icon / text), `Status`
(default / info / success / warning / danger), `Size` (sm / md* / lg), `Invert` (false / true),
`Shape` (full rounded / rounded). `Kind=default` exists only in the `full rounded` shape, so the
set is 150 variants. `components/ui/badge/figma-nodes.ts` maps every variant to its node id; each
rendered badge carries that id as `data-node-id`.

## Figma values

| Size | Box | Dot | padding | gap | Icon slot | Font          |
|------|-----|-----|---------|-----|-----------|---------------|
| lg   | 28  | 10  | 2 / 6   | 6   | 20        | Inter 16 / 24 |
| md*  | 24  | 8   | 2 / 6   | 6   | 16        | Inter 14 / 20 |
| sm   | 22  | 6   | 2 / 4   | 4   | 12        | Inter 12 / 16 |

Every variant carries `border/width/default` 1px in `color/border/base` (#ffffff).
`Shape=full rounded` is `border/radius/full` (9999), `Shape=rounded` is `border/radius/default` (4).

| Status  | Background (Invert=false) | Background (Invert=true) |
|---------|---------------------------|--------------------------|
| default | #f3f4f6                   | #374151                  |
| info    | #1d4ed8                   | #e0e7ff                  |
| success | #15803d                   | #dcfce7                  |
| warning | #a16207                   | #fef9c3                  |
| danger  | #b91c1c                   | #fee2e2                  |

Text is `color/text/default` (#030712) on the light backgrounds and `color/text/base` (#ffffff)
on the dark ones (info/success/warning/danger at `Invert=false`, and default at `Invert=true`).

## Deterministic comparison

The JSON files here are compared with `scripts/ui/compare.ts` against
`pnpm exec tsx scripts/ui/inspect.ts "[data-node-id='<id>']" badge`, which renders
`app/badge/page.tsx`. Eleven nodes are covered, chosen to exercise every axis:

| Node        | Variant                                        |
|-------------|------------------------------------------------|
| 2321:8707   | default / default / lg / false / full rounded  |
| 2321:8727   | default / default / md / false / full rounded  |
| 2321:8747   | default / default / sm / false / full rounded  |
| 2321:8715   | default / danger  / lg / false / full rounded  |
| 2321:8725   | default / danger  / lg / true  / full rounded  |
| 2321:8827   | icon    / default / lg / false / full rounded  |
| 2321:8857   | icon    / default / md / false / full rounded  |
| 2321:8887   | icon    / default / sm / false / full rounded  |
| 4368:70141  | icon    / default / lg / false / rounded       |
| 2321:8839   | icon    / danger  / lg / false / full rounded  |
| 2321:8842   | icon    / default / lg / true  / full rounded  |

`position` is not a design-defined property here: `app/badge/page.tsx` is a variant gallery, not a
reproduction of the Figma `2321:8706` frame layout, so each expected `position` records the
rendered origin and only the remaining properties are Figma-derived. Likewise, properties Figma
does not define for `Kind=default` (it has no text, so inherited `color` and the inherited Poppins
font metrics) are recorded as the page's inherited values so the object shape matches the
inspector output.

`Kind=text` is deliberately excluded from this comparison: its width is a text-measurement result
("Badge" is 87px in Figma at lg, 88.39px in Chromium at the same Inter 16px/24px), so exact
equality is not achievable - the same limitation documented in `../README.md` for the bottom-nav
labels. All 150 variants, text included, are verified in `tests/badge.spec.ts` instead: size,
padding, gap, border, radius, typography and both colors per variant, with width asserted against
the Figma frame width within 2px.

## Values that could not be read from Figma

The Figma MCP hit the Starter-plan tool-call limit before two values could be confirmed, so they
are derived rather than read:

- `Kind=default` (the status dot) keeps the 1px `color/border/base` border that every fetched
  `icon` and `text` variant carries; the dot variants themselves were not fetched.
- `Status=default, Invert=true` text/icon colour is taken as `color/text/base` (#ffffff) from its
  `color/background/default/invert/default` (#374151) background; every other status/invert pair
  was read directly.
