'use client';

import {
  foundationsCopy,
  foundationsFigmaNodes,
  numberScale,
  spacingScale,
  spacingWidthUtility,
  tokenVar,
  type SpacingToken,
} from './foundation-tokens';
import { useComputedStyle } from './use-computed';

/**
 * The Plus UI spacing scale as documented in Figma, rendered from the Tailwind theme.
 *
 * Figma "Spacing" `4907:9053` (documentation) and `4907:8772` (the token table `4907:9279`).
 * Each row draws its step with the real `w-*` utility and prints the width the browser
 * resolved, so the bar and the number both come from `app/globals.css`.
 */
export function Spacing() {
  return (
    <div className="flex w-full flex-col gap-16 bg-background-default-default p-24 font-default">
      <section
        className="flex flex-col gap-6"
        data-foundation="spacing"
        data-node-id={foundationsFigmaNodes.spacingTokenTable}
      >
        <header className="flex flex-col gap-4">
          <h2 className="text-3xl font-semi-bold text-text-default">{foundationsCopy.spacingTitle}</h2>
          <p className="text-lg font-regular text-text-default">{foundationsCopy.spacingDescription}</p>
          <p className="text-base font-regular text-text-caption">
            Three layers, as the Figma table has them: a global <code>number/*</code> scale, one{' '}
            <code>spacing-*</code> alias per step, and the value. <code>--spacing</code> sits on the
            same 4px base, so a step the table does not name still lands on the grid.
          </p>
        </header>

        <div className="flex flex-col rounded-default bg-background-surface p-16">
          <div className="grid grid-cols-[10rem_10rem_8rem_1fr] gap-6 border-w-default border-solid border-border-default p-3 text-base font-medium text-text-default">
            <span>Alias Token Name</span>
            <span>Global Token Name</span>
            <span>Value</span>
            <span>Step</span>
          </div>
          {spacingScale.map((step) => (
            <SpacingRow key={step.token} step={step} />
          ))}
        </div>
      </section>

      <NumberScaleSection />
    </div>
  );
}

function SpacingRow({ step }: { step: SpacingToken }) {
  const { measure, values } = useComputedStyle(['width']);

  return (
    <div
      className="grid grid-cols-[10rem_10rem_8rem_1fr] items-center gap-6 border-w-default border-solid border-border-default p-3"
      data-node-id={step.figmaNodeId}
      data-spacing-step={step.step}
    >
      <span className="text-base font-medium text-text-default">{step.figmaAlias}</span>
      <span className="text-base font-regular text-text-caption">{step.figmaGlobalToken}</span>
      <span className="text-base font-regular text-text-default" data-readout={`spacing-${step.step}`}>
        {values?.width ?? '—'}
      </span>
      <span
        ref={measure}
        className={`block h-6 bg-background-primary-default ${spacingWidthUtility[step.step]}`}
        data-spacing-bar={step.step}
      />
    </div>
  );
}

/**
 * Layer 1, shown on its own because spacing is not the only system that reads it: the border
 * radius and border width tables resolve through the same steps.
 */
function NumberScaleSection() {
  return (
    <section
      className="flex flex-col gap-6"
      data-foundation="number-scale"
      data-node-id={foundationsFigmaNodes.spacingDocumentation}
    >
      <header className="flex flex-col gap-4">
        <h2 className="text-3xl font-semi-bold text-text-default">Global number scale</h2>
        <p className="text-lg font-regular text-text-default">
          The <code>number/*</code> steps every <code>spacing-*</code>, <code>rounded-*</code> and{' '}
          <code>border-*</code> alias resolves to — the reason a 4px gap and a 4px radius are the
          same value rather than two that happen to agree.
        </p>
      </header>
      <div className="flex flex-wrap gap-4 rounded-default bg-background-surface p-16">
        {numberScale.map((step) => (
          <NumberChip key={step.token} figmaToken={step.figmaToken} token={step.token} />
        ))}
      </div>
    </section>
  );
}

function NumberChip({ figmaToken, token }: { figmaToken: string; token: string }) {
  const { measure, values } = useComputedStyle(['width']);

  return (
    <div className="flex w-[9rem] flex-col gap-1" data-number-step={token}>
      <span
        ref={measure}
        className="block h-4 bg-background-default-invert-default"
        data-number-bar={token}
        style={{ width: tokenVar(token) }}
      />
      <span className="text-base font-medium text-text-default">{figmaToken}</span>
      <span className="text-sm font-regular text-text-caption" data-readout={token}>
        {values?.width ?? '—'}
      </span>
    </div>
  );
}
