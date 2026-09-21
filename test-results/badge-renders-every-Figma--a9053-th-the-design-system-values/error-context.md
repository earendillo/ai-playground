# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: badge.spec.ts >> renders every Figma badge variant with the design system values
- Location: tests\badge.spec.ts:60:5

# Error details

```
Error: A snapshot doesn't exist at C:\Users\Mateusz\Projects\ai-playground\tests\badge.spec.ts-snapshots\badge-variants-win32.png, writing actual.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - heading "Badge — Figma 2321:8706" [level=1] [ref=e3]
    - generic [ref=e4]:
      - heading "Kind=default · Shape=full rounded" [level=2] [ref=e5]
      - generic [ref=e6]:
        - generic [ref=e7]: default
        - generic [ref=e8]: info
        - generic [ref=e9]: success
        - generic [ref=e10]: warning
        - generic [ref=e11]: danger
        - generic [ref=e12]: Invert=false
        - generic [ref=e13]: lg
        - img "default badge" [ref=e14]
        - img "info badge" [ref=e15]
        - img "success badge" [ref=e16]
        - img "warning badge" [ref=e17]
        - img "danger badge" [ref=e18]
        - generic [ref=e19]: md
        - img "default badge" [ref=e20]
        - img "info badge" [ref=e21]
        - img "success badge" [ref=e22]
        - img "warning badge" [ref=e23]
        - img "danger badge" [ref=e24]
        - generic [ref=e25]: sm
        - img "default badge" [ref=e26]
        - img "info badge" [ref=e27]
        - img "success badge" [ref=e28]
        - img "warning badge" [ref=e29]
        - img "danger badge" [ref=e30]
        - generic [ref=e31]: Invert=true
        - generic [ref=e32]: lg
        - img "default badge" [ref=e33]
        - img "info badge" [ref=e34]
        - img "success badge" [ref=e35]
        - img "warning badge" [ref=e36]
        - img "danger badge" [ref=e37]
        - generic [ref=e38]: md
        - img "default badge" [ref=e39]
        - img "info badge" [ref=e40]
        - img "success badge" [ref=e41]
        - img "warning badge" [ref=e42]
        - img "danger badge" [ref=e43]
        - generic [ref=e44]: sm
        - img "default badge" [ref=e45]
        - img "info badge" [ref=e46]
        - img "success badge" [ref=e47]
        - img "warning badge" [ref=e48]
        - img "danger badge" [ref=e49]
    - generic [ref=e50]:
      - heading "Kind=icon · Shape=full rounded" [level=2] [ref=e51]
      - generic [ref=e52]:
        - generic [ref=e53]: default
        - generic [ref=e54]: info
        - generic [ref=e55]: success
        - generic [ref=e56]: warning
        - generic [ref=e57]: danger
        - generic [ref=e58]: Invert=false
        - generic [ref=e59]: lg
        - img "default badge" [ref=e60]
        - img "info badge" [ref=e64]
        - img "success badge" [ref=e68]
        - img "warning badge" [ref=e72]
        - img "danger badge" [ref=e76]
        - generic [ref=e80]: md
        - img "default badge" [ref=e81]
        - img "info badge" [ref=e85]
        - img "success badge" [ref=e89]
        - img "warning badge" [ref=e93]
        - img "danger badge" [ref=e97]
        - generic [ref=e101]: sm
        - img "default badge" [ref=e102]
        - img "info badge" [ref=e106]
        - img "success badge" [ref=e110]
        - img "warning badge" [ref=e114]
        - img "danger badge" [ref=e118]
        - generic [ref=e122]: Invert=true
        - generic [ref=e123]: lg
        - img "default badge" [ref=e124]
        - img "info badge" [ref=e128]
        - img "success badge" [ref=e132]
        - img "warning badge" [ref=e136]
        - img "danger badge" [ref=e140]
        - generic [ref=e144]: md
        - img "default badge" [ref=e145]
        - img "info badge" [ref=e149]
        - img "success badge" [ref=e153]
        - img "warning badge" [ref=e157]
        - img "danger badge" [ref=e161]
        - generic [ref=e165]: sm
        - img "default badge" [ref=e166]
        - img "info badge" [ref=e170]
        - img "success badge" [ref=e174]
        - img "warning badge" [ref=e178]
        - img "danger badge" [ref=e182]
    - generic [ref=e186]:
      - heading "Kind=icon · Shape=rounded" [level=2] [ref=e187]
      - generic [ref=e188]:
        - generic [ref=e189]: default
        - generic [ref=e190]: info
        - generic [ref=e191]: success
        - generic [ref=e192]: warning
        - generic [ref=e193]: danger
        - generic [ref=e194]: Invert=false
        - generic [ref=e195]: lg
        - img "default badge" [ref=e196]
        - img "info badge" [ref=e200]
        - img "success badge" [ref=e204]
        - img "warning badge" [ref=e208]
        - img "danger badge" [ref=e212]
        - generic [ref=e216]: md
        - img "default badge" [ref=e217]
        - img "info badge" [ref=e221]
        - img "success badge" [ref=e225]
        - img "warning badge" [ref=e229]
        - img "danger badge" [ref=e233]
        - generic [ref=e237]: sm
        - img "default badge" [ref=e238]
        - img "info badge" [ref=e242]
        - img "success badge" [ref=e246]
        - img "warning badge" [ref=e250]
        - img "danger badge" [ref=e254]
        - generic [ref=e258]: Invert=true
        - generic [ref=e259]: lg
        - img "default badge" [ref=e260]
        - img "info badge" [ref=e264]
        - img "success badge" [ref=e268]
        - img "warning badge" [ref=e272]
        - img "danger badge" [ref=e276]
        - generic [ref=e280]: md
        - img "default badge" [ref=e281]
        - img "info badge" [ref=e285]
        - img "success badge" [ref=e289]
        - img "warning badge" [ref=e293]
        - img "danger badge" [ref=e297]
        - generic [ref=e301]: sm
        - img "default badge" [ref=e302]
        - img "info badge" [ref=e306]
        - img "success badge" [ref=e310]
        - img "warning badge" [ref=e314]
        - img "danger badge" [ref=e318]
    - generic [ref=e322]:
      - heading "Kind=text · Shape=full rounded" [level=2] [ref=e323]
      - generic [ref=e324]:
        - generic [ref=e325]: default
        - generic [ref=e326]: info
        - generic [ref=e327]: success
        - generic [ref=e328]: warning
        - generic [ref=e329]: danger
        - generic [ref=e330]: Invert=false
        - generic [ref=e331]: lg
        - generic [ref=e332]: Badge
        - generic [ref=e337]: Badge
        - generic [ref=e342]: Badge
        - generic [ref=e347]: Badge
        - generic [ref=e352]: Badge
        - generic [ref=e357]: md
        - generic [ref=e358]: Badge
        - generic [ref=e363]: Badge
        - generic [ref=e368]: Badge
        - generic [ref=e373]: Badge
        - generic [ref=e378]: Badge
        - generic [ref=e383]: sm
        - generic [ref=e384]: Badge
        - generic [ref=e389]: Badge
        - generic [ref=e394]: Badge
        - generic [ref=e399]: Badge
        - generic [ref=e404]: Badge
        - generic [ref=e409]: Invert=true
        - generic [ref=e410]: lg
        - generic [ref=e411]: Badge
        - generic [ref=e416]: Badge
        - generic [ref=e421]: Badge
        - generic [ref=e426]: Badge
        - generic [ref=e431]: Badge
        - generic [ref=e436]: md
        - generic [ref=e437]: Badge
        - generic [ref=e442]: Badge
        - generic [ref=e447]: Badge
        - generic [ref=e452]: Badge
        - generic [ref=e457]: Badge
        - generic [ref=e462]: sm
        - generic [ref=e463]: Badge
        - generic [ref=e468]: Badge
        - generic [ref=e473]: Badge
        - generic [ref=e478]: Badge
        - generic [ref=e483]: Badge
    - generic [ref=e488]:
      - heading "Kind=text · Shape=rounded" [level=2] [ref=e489]
      - generic [ref=e490]:
        - generic [ref=e491]: default
        - generic [ref=e492]: info
        - generic [ref=e493]: success
        - generic [ref=e494]: warning
        - generic [ref=e495]: danger
        - generic [ref=e496]: Invert=false
        - generic [ref=e497]: lg
        - generic [ref=e498]: Badge
        - generic [ref=e503]: Badge
        - generic [ref=e508]: Badge
        - generic [ref=e513]: Badge
        - generic [ref=e518]: Badge
        - generic [ref=e523]: md
        - generic [ref=e524]: Badge
        - generic [ref=e529]: Badge
        - generic [ref=e534]: Badge
        - generic [ref=e539]: Badge
        - generic [ref=e544]: Badge
        - generic [ref=e549]: sm
        - generic [ref=e550]: Badge
        - generic [ref=e555]: Badge
        - generic [ref=e560]: Badge
        - generic [ref=e565]: Badge
        - generic [ref=e570]: Badge
        - generic [ref=e575]: Invert=true
        - generic [ref=e576]: lg
        - generic [ref=e577]: Badge
        - generic [ref=e582]: Badge
        - generic [ref=e587]: Badge
        - generic [ref=e592]: Badge
        - generic [ref=e597]: Badge
        - generic [ref=e602]: md
        - generic [ref=e603]: Badge
        - generic [ref=e608]: Badge
        - generic [ref=e613]: Badge
        - generic [ref=e618]: Badge
        - generic [ref=e623]: Badge
        - generic [ref=e628]: sm
        - generic [ref=e629]: Badge
        - generic [ref=e634]: Badge
        - generic [ref=e639]: Badge
        - generic [ref=e644]: Badge
        - generic [ref=e649]: Badge
  - alert [ref=e654]
```

# Test source

```ts
  67  |       const style = getComputedStyle(element);
  68  |       const rect = element.getBoundingClientRect();
  69  |       const slot = element.querySelector('[data-name="Prefix Icon"]');
  70  |       const slotRect = slot?.getBoundingClientRect();
  71  | 
  72  |       result[element.getAttribute('data-node-id') as string] = {
  73  |         width: rect.width,
  74  |         height: rect.height,
  75  |         backgroundColor: style.backgroundColor,
  76  |         color: style.color,
  77  |         borderRadius: style.borderRadius,
  78  |         borderTopWidth: style.borderTopWidth,
  79  |         borderTopColor: style.borderTopColor,
  80  |         paddingLeft: style.paddingLeft,
  81  |         paddingRight: style.paddingRight,
  82  |         paddingTop: style.paddingTop,
  83  |         paddingBottom: style.paddingBottom,
  84  |         columnGap: style.columnGap,
  85  |         fontFamily: style.fontFamily,
  86  |         fontSize: style.fontSize,
  87  |         lineHeight: style.lineHeight,
  88  |         fontWeight: style.fontWeight,
  89  |         text: element.textContent?.trim() ?? '',
  90  |         iconSlot: slotRect ? { width: slotRect.width, height: slotRect.height } : null,
  91  |       };
  92  |     }
  93  | 
  94  |     return result as Record<string, Measured>;
  95  |   });
  96  | 
  97  |   let checked = 0;
  98  | 
  99  |   for (const kind of ['default', 'icon', 'text'] as const) {
  100 |     for (const shape of Object.keys(figmaNodeIds[kind]) as (keyof typeof radii)[]) {
  101 |       for (const size of sizes) {
  102 |         for (const invert of ['false', 'true'] as const) {
  103 |           const ids = figmaNodeIds[kind][shape][size][invert];
  104 |           const size_ = metrics[size];
  105 | 
  106 |           statuses.forEach((status, index) => {
  107 |             const nodeId = ids[index];
  108 |             const actual = measured[nodeId];
  109 |             const colors = palette[invert][status];
  110 | 
  111 |             expect(actual, `missing badge for Figma node ${nodeId}`).toBeDefined();
  112 |             expect(actual.backgroundColor, `${nodeId} background`).toBe(colors.background);
  113 | 
  114 |             // border/width/default 1px in color/border/base (#ffffff).
  115 |             expect(actual.borderTopWidth, `${nodeId} border width`).toBe('1px');
  116 |             expect(actual.borderTopColor, `${nodeId} border color`).toBe('rgb(255, 255, 255)');
  117 |             expect(actual.borderRadius, `${nodeId} radius`).toBe(radii[shape]);
  118 | 
  119 |             if (kind === 'default') {
  120 |               // Kind=default is a bare status dot: no padding, no content.
  121 |               expect(actual.width, `${nodeId} width`).toBe(size_.dot);
  122 |               expect(actual.height, `${nodeId} height`).toBe(size_.dot);
  123 |               expect(actual.paddingLeft, `${nodeId} padding`).toBe('0px');
  124 |               expect(actual.text, `${nodeId} text`).toBe('');
  125 |               checked += 1;
  126 |               return;
  127 |             }
  128 | 
  129 |             expect(actual.height, `${nodeId} height`).toBe(size_.box);
  130 |             expect(actual.paddingTop, `${nodeId} padding top`).toBe('2px');
  131 |             expect(actual.paddingBottom, `${nodeId} padding bottom`).toBe('2px');
  132 |             expect(actual.paddingLeft, `${nodeId} padding left`).toBe(`${size_.paddingX}px`);
  133 |             expect(actual.paddingRight, `${nodeId} padding right`).toBe(`${size_.paddingX}px`);
  134 |             expect(actual.columnGap, `${nodeId} gap`).toBe(`${size_.gap}px`);
  135 |             expect(actual.color, `${nodeId} text color`).toBe(colors.color);
  136 |             expect(actual.fontFamily, `${nodeId} font`).toBe('Inter, "Inter Fallback"');
  137 |             expect(actual.fontSize, `${nodeId} font size`).toBe(`${size_.fontSize}px`);
  138 |             expect(actual.lineHeight, `${nodeId} line height`).toBe(`${size_.lineHeight}px`);
  139 |             expect(actual.fontWeight, `${nodeId} font weight`).toBe('400');
  140 | 
  141 |             if (kind === 'icon') {
  142 |               expect(actual.width, `${nodeId} width`).toBe(size_.box);
  143 |               expect(actual.text, `${nodeId} text`).toBe('');
  144 |             } else {
  145 |               expect(actual.text, `${nodeId} text`).toBe('Badge');
  146 |               // Figma rounds the label advance width; Chromium measures "Badge" ~1.4px wider.
  147 |               expect(Math.abs(actual.width - size_.textWidth), `${nodeId} width`).toBeLessThanOrEqual(2);
  148 |             }
  149 | 
  150 |             // Prefix Icon slot is a square box sized per Figma: 20 / 16 / 12.
  151 |             const iconSlot = { lg: 20, md: 16, sm: 12 }[size];
  152 |             expect(actual.iconSlot, `${nodeId} icon slot`).toEqual({ width: iconSlot, height: iconSlot });
  153 | 
  154 |             checked += 1;
  155 |           });
  156 |         }
  157 |       }
  158 |     }
  159 |   }
  160 | 
  161 |   // 3 kinds x sizes x invert x statuses, with kind=default only in the full rounded shape.
  162 |   expect(checked).toBe(150);
  163 | 
  164 |   // The Next.js dev indicator is an overlay portal, not part of the design.
  165 |   await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });
  166 | 
> 167 |   await expect(page.locator('main')).toHaveScreenshot('badge-variants.png');
      |   ^ Error: A snapshot doesn't exist at C:\Users\Mateusz\Projects\ai-playground\tests\badge.spec.ts-snapshots\badge-variants-win32.png, writing actual.
  168 | });
  169 | 
```