'use client';

import {
  borderRadiusScale,
  borderRadiusUtility,
  borderWidthScale,
  borderWidthUtility,
  foundationsCopy,
  foundationsFigmaNodes,
  semanticBorderTokens,
  type BorderToken,
  type SemanticBorderToken,
} from './foundation-tokens';
import { useComputedStyle } from './use-computed';

/**
 * The Plus UI border system as documented in Figma, rendered from the Tailwind theme.
 *
 * Figma "Borders" `4908:8172` (documentation) and `4908:7980` (the radius table `4908:8597`
 * and the width table `4908:8790`). Radius and width are two separate alias families over one
 * shared `number/*` scale, and the page keeps them apart the way the design file does.
 */
export function Borders() {
  return (
    <div className="flex w-full flex-col gap-16 bg-background-default-default p-24 font-default">
      <RadiusSection />
      <WidthSection />
      <SemanticSection />
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

function RadiusSample({ step }: { step: BorderToken }) {
  const { measure, values } = useComputedStyle(['border-top-left-radius']);

  return (
    <div className="flex w-[11rem] flex-col gap-2" data-radius-step={step.token} data-node-id={step.figmaNodeId}>
      <span
        ref={measure}
        className={`block h-24 w-full bg-background-primary-default ${borderRadiusUtility[step.token.replace('radius-', '')]}`}
        data-radius-sample={step.token}
      />
      <span className="text-base font-medium text-text-default">{step.figmaAlias}</span>
      <span className="text-sm font-regular text-text-caption">{step.figmaGlobalToken ?? '—'}</span>
      <span className="text-base font-regular text-text-default" data-readout={step.token}>
        {values?.['border-top-left-radius'] ?? '—'}
      </span>
    </div>
  );
}

function RadiusSection() {
  return (
    <section
      className="flex flex-col gap-6"
      data-foundation="border-radius"
      data-node-id={foundationsFigmaNodes.borderRadiusTable}
    >
      <SectionHeader description={foundationsCopy.borderRadiusDescription} title={foundationsCopy.borderRadiusTitle} />
      <div className="flex flex-wrap gap-6 rounded-default bg-background-surface p-16">
        {borderRadiusScale.map((step) => (
          <RadiusSample key={step.token} step={step} />
        ))}
      </div>
    </section>
  );
}

function WidthSample({ step }: { step: BorderToken }) {
  const { measure, values } = useComputedStyle(['border-top-width']);

  return (
    <div className="flex w-[11rem] flex-col gap-2" data-width-step={step.token} data-node-id={step.figmaNodeId}>
      <span
        ref={measure}
        className={`block h-24 w-full border-solid border-border-primary ${borderWidthUtility[step.token.replace('border-width-', '')]}`}
        data-width-sample={step.token}
      />
      <span className="text-base font-medium text-text-default">{step.figmaAlias}</span>
      <span className="text-sm font-regular text-text-caption">{step.figmaGlobalToken}</span>
      <span className="text-base font-regular text-text-default" data-readout={step.token}>
        {values?.['border-top-width'] ?? '—'}
      </span>
    </div>
  );
}

function WidthSection() {
  return (
    <section
      className="flex flex-col gap-6"
      data-foundation="border-width"
      data-node-id={foundationsFigmaNodes.borderWidthTable}
    >
      <SectionHeader description={foundationsCopy.borderWidthDescription} title={foundationsCopy.borderWidthTitle} />
      <div className="flex flex-wrap gap-6 rounded-default bg-background-surface p-16">
        {borderWidthScale.map((step) => (
          <WidthSample key={step.token} step={step} />
        ))}
      </div>
      <p className="text-base font-regular text-text-caption">
        Tailwind v4 has no border-width theme namespace and the <code>border-*</code> name is
        already border-colour, so these tokens are consumed through the project&apos;s{' '}
        <code>border-w-*</code> utility rather than through <code>border-2</code> and friends,
        which write their px value straight into the rule. Figma writes the global token for{' '}
        <code>border-2</code> as <code>number/0-51</code>, which is not a step of the number scale;
        the theme resolves it to <code>number/0-5</code>, the 2px step, and keeps the Figma
        spelling above rather than silently correcting it.
      </p>
    </section>
  );
}

function SemanticRow({ token }: { token: SemanticBorderToken }) {
  const property = token.kind === 'radius' ? 'border-top-left-radius' : 'border-top-width';
  const { measure, values } = useComputedStyle([property]);

  return (
    <div
      className="grid grid-cols-[16rem_12rem_8rem_1fr] items-center gap-6 border-w-default border-solid border-border-default p-3"
      data-semantic-border={token.token}
    >
      <span className="text-base font-medium text-text-default">{token.figmaVariable}</span>
      <span className="text-base font-regular text-text-caption">--{token.aliasOf}</span>
      <span className="text-base font-regular text-text-default" data-readout={`semantic-${token.token}`}>
        {values?.[property] ?? '—'}
      </span>
      <span
        ref={measure}
        className={
          token.kind === 'radius'
            ? `block h-12 w-24 bg-background-primary-default ${token.utility}`
            : `block h-12 w-24 border-solid border-border-primary ${token.utility}`
        }
        data-semantic-border-sample={token.token}
      />
    </div>
  );
}

function SemanticSection() {
  return (
    <section
      className="flex flex-col gap-6"
      data-foundation="semantic-borders"
      data-node-id={foundationsFigmaNodes.bordersTokens}
    >
      <header className="flex flex-col gap-4">
        <h2 className="text-3xl font-semi-bold text-text-default">Semantic border tokens</h2>
        <p className="text-lg font-regular text-text-default">
          The three <code>border/*</code> roles Figma names. Components reach for these rather than
          for a step of the scale, so a change to what &ldquo;default&rdquo; means reaches every
          component through the token layer.
        </p>
      </header>
      <div className="flex flex-col rounded-default bg-background-surface p-16">
        <div className="grid grid-cols-[16rem_12rem_8rem_1fr] gap-6 border-w-default border-solid border-border-default p-3 text-base font-medium text-text-default">
          <span>Figma variable</span>
          <span>Aliases</span>
          <span>Value</span>
          <span>Sample</span>
        </div>
        {semanticBorderTokens.map((token) => (
          <SemanticRow key={token.token} token={token} />
        ))}
      </div>
    </section>
  );
}
