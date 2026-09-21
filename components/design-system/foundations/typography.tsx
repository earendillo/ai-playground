'use client';

import {
  fontFamily,
  fontWeightUtility,
  fontWeights,
  foundationsCopy,
  foundationsFigmaNodes,
  letterSpacing,
  textStyles,
  tokenVar,
  typeScale,
  typeSizeUtility,
  type TypeSizeToken,
} from './foundation-tokens';
import { useComputedStyle } from './use-computed';

/**
 * The Plus UI type system as documented in Figma, rendered from the Tailwind theme.
 *
 * Figma "Typography" `4909:62199` (documentation) and `4909:61939` (the token table
 * `4909:62513`). Every sample on this page is typeset with the real utilities -
 * `font-default`, `text-<size>`, `font-<weight>` - and every number printed next to it is read
 * back off the rendered element, so the page is a read-out of `app/globals.css` rather than a
 * second copy of the design file.
 */
export function Typography() {
  return (
    <div className="flex w-full flex-col gap-16 bg-background-default-default p-24 font-default">
      <FontFamilySection />
      <TypeScaleSection />
      <FontWeightSection />
      <TextStyleSection />
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <header className="flex flex-col gap-4">
      <h2 className="text-3xl font-semi-bold text-text-default">{title}</h2>
      <p className="text-lg font-regular text-text-default">{description}</p>
    </header>
  );
}

/** Caption + resolved value, the shape every readout on the foundation pages takes. */
function Readout({ label, value, name }: { label: string; value: string | null; name: string }) {
  return (
    <div className="flex min-w-0 flex-col">
      <span className="text-xs font-regular text-text-caption">{label}</span>
      <span className="text-base font-medium text-text-default" data-readout={name}>
        {value ?? '—'}
      </span>
    </div>
  );
}

function FontFamilySection() {
  const { measure, values } = useComputedStyle(['font-family']);

  return (
    <section
      className="flex flex-col gap-6"
      data-foundation="font-family"
      data-node-id={foundationsFigmaNodes.typographyDocumentation}
    >
      <SectionHeader description={foundationsCopy.fontFamilyDescription} title={foundationsCopy.fontFamilyTitle} />
      <div className="flex flex-col gap-6 rounded-default bg-background-surface p-16">
        <p ref={measure} className="text-4xl font-bold text-text-default" data-font-specimen={fontFamily.token}>
          The {fontFamily.value} Typeface Family
        </p>
        <p className="text-4xl font-regular text-text-default">
          ABCDEFGHIJKLMN
          <br />
          OPQRSTUVWXYZ
          <br />
          abcdefghijklmnopqr
          <br />
          stuvwxyz() &amp; ?! @
          <br />
          1234567890.,:;/&gt;&lt;
        </p>
        <div className="flex flex-col gap-2">
          <Readout
            label={`--${fontFamily.token} (${fontFamily.figmaVariable})`}
            name="font-family"
            value={values?.['font-family'] ?? null}
          />
          <p className="text-sm font-regular text-text-caption">
            Loaded with <code>next/font</code> in <code>app/layout.tsx</code> as{' '}
            <code>--{fontFamily.cssVariable}</code>; the theme token adds the fallback stack.
          </p>
        </div>
      </div>
    </section>
  );
}

function TypeScaleRow({ size }: { size: TypeSizeToken }) {
  const { measure, values } = useComputedStyle(['font-size', 'line-height', 'letter-spacing']);
  const { measure: measureParagraph, values: paragraphValues } = useComputedStyle(['height']);

  return (
    <div
      className="grid grid-cols-[6rem_1fr_repeat(4,8rem)] items-center gap-6 border-w-default border-solid border-border-default p-4"
      data-node-id={size.figmaNodeId}
      data-type-size={size.name}
    >
      <span className="text-base font-medium text-text-default">text-{size.name}</span>
      <p
        ref={measure}
        className={`truncate text-text-default ${typeSizeUtility[size.name]}`}
        data-type-sample={size.name}
      >
        Hello Plus UI
      </p>
      <Readout label="Font Size" name={`font-size-${size.name}`} value={values?.['font-size'] ?? null} />
      <Readout label="Line Height" name={`line-height-${size.name}`} value={values?.['line-height'] ?? null} />
      <Readout label="Letter Spacing" name={`letter-spacing-${size.name}`} value={values?.['letter-spacing'] ?? null} />
      <div className="flex min-w-0 flex-col">
        <Readout
          label="Paragraph Spacing"
          name={`paragraph-spacing-${size.name}`}
          value={paragraphValues?.height ?? null}
        />
        <span
          ref={measureParagraph}
          className="w-full bg-background-primary-invert-default"
          data-paragraph-spacing={size.name}
          style={{ height: tokenVar(size.paragraphSpacingToken) }}
        />
      </div>
    </div>
  );
}

function TypeScaleSection() {
  return (
    <section
      className="flex flex-col gap-6"
      data-foundation="type-scale"
      data-node-id={foundationsFigmaNodes.typographyTokenTable}
    >
      <SectionHeader description={foundationsCopy.fontSizeDescription} title={foundationsCopy.fontSizeTitle} />
      <div className="flex flex-col rounded-default bg-background-surface p-16">
        {typeScale.map((size) => (
          <TypeScaleRow key={size.name} size={size} />
        ))}
        <p className="pt-6 text-sm font-regular text-text-caption">
          Figma names the base step <code>font-size/md</code> in its variables and{' '}
          <code>text-base</code> in the style names; the theme keeps the style name and records the
          variable name alongside it. Letter spacing is <code>{letterSpacing.value}</code> for every
          step, carried by <code>--{letterSpacing.token}</code>.
        </p>
      </div>
    </section>
  );
}

function FontWeightCard({ label, name, utility }: { label: string; name: string; utility: string }) {
  const { measure, values } = useComputedStyle(['font-weight']);

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center gap-8 rounded-default bg-background-surface p-16"
      data-font-weight={name}
    >
      <p ref={measure} className={`text-7xl text-text-default ${utility}`} data-font-weight-sample={name}>
        PUI
      </p>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-regular text-text-default">{label}</span>
        <span className="text-base font-medium text-text-caption" data-readout={`font-weight-${name}`}>
          {values?.['font-weight'] ?? '—'}
        </span>
      </div>
    </div>
  );
}

function FontWeightSection() {
  return (
    <section className="flex flex-col gap-6" data-foundation="font-weight">
      <SectionHeader description={foundationsCopy.fontWeightDescription} title={foundationsCopy.fontWeightTitle} />
      <div className="flex gap-2">
        {fontWeights.map((weight) => (
          <FontWeightCard
            key={weight.name}
            label={weight.label}
            name={weight.name}
            utility={fontWeightUtility[weight.name]}
          />
        ))}
      </div>
    </section>
  );
}

function TextStyleRow({ classNames, name }: { classNames: string; name: string }) {
  const { measure, values } = useComputedStyle(['font-size', 'line-height', 'font-weight']);

  return (
    <div className="flex items-baseline gap-6 border-w-default border-solid border-border-default p-3" data-text-style={name}>
      <span className="w-[14rem] shrink-0 text-base font-medium text-text-default">{name}</span>
      <p
        ref={measure}
        className={`min-w-0 flex-1 truncate text-text-default ${classNames}`}
        data-text-style-sample={name}
      >
        Hello Plus UI
      </p>
      <span className="w-[14rem] shrink-0 text-base font-regular text-text-caption" data-readout={`text-style-${name}`}>
        {values ? `${values['font-size']} / ${values['line-height']} · ${values['font-weight']}` : '—'}
      </span>
    </div>
  );
}

function TextStyleSection() {
  return (
    <section
      className="flex flex-col gap-6"
      data-foundation="text-styles"
      data-node-id={foundationsFigmaNodes.typographyTokens}
    >
      <SectionHeader description={foundationsCopy.typographyDescription} title={foundationsCopy.typographyTitle} />
      <div className="flex flex-col rounded-default bg-background-surface p-16">
        <p className="pb-6 text-lg font-regular text-text-caption">
          The {textStyles.length} Figma text styles, one per weight × size. A text style is a
          composite of four values and Tailwind has no single token for that shape, so each is the
          composition of the tokens it is built from — <code>font-default text-&lt;size&gt;
          font-&lt;weight&gt;</code> — which is why a size and its leading can never drift apart.
        </p>
        {textStyles.map((style) => (
          <TextStyleRow key={style.name} classNames={style.classNames} name={style.name} />
        ))}
      </div>
    </section>
  );
}
