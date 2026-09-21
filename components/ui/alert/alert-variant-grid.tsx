import { Fragment } from 'react';
import { Alert, type AlertKind, type AlertSize, type AlertStatus } from './alert';
import { alertInvertsFor, figmaNodeIds } from './figma-nodes';

export const alertKinds: AlertKind[] = ['filled', 'outlined', 'dashed'];
export const alertStatuses: AlertStatus[] = ['default', 'info', 'success', 'warning', 'danger'];
export const alertSizes: AlertSize[] = ['sm', 'md', 'lg'];

/** The placeholder copy Figma ships in every Alert variant. */
export const alertSampleMessage = 'This is a Plus UI alert message component';
export const alertSampleDescription =
  'Lorem ipsum dolor sit amet, his rebum salutatus id, purto vitae signi ferumque ea per. ' +
  'An quod erant sed. Viris aliquam impedit et est has veri deleniti sensibus id, summo paulo cetero no vel.';

/**
 * One kind slice of the Figma component set: every status down the rows, every size
 * across, grouped by the Invert property. Each alert is rendered at the 768px Figma
 * frame width. Shared by the gallery route and the Storybook `AllVariants` story so
 * both stay in step.
 */
export function AlertVariantGrid({ kind }: { kind: AlertKind }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[14px] font-medium text-[#030712]">Kind={kind}</h2>
      {alertInvertsFor(kind).map((invert) => (
        <Fragment key={String(invert)}>
          <span className="text-[12px] font-medium text-[#030712]">Invert={String(invert)}</span>
          {alertStatuses.map((status) => (
            <Fragment key={status}>
              {alertSizes.map((size) => (
                <div key={size} className="flex flex-col gap-1">
                  <span className="text-[12px] text-[#6b7280]">
                    {status} · {size}
                  </span>
                  <Alert
                    className="w-[768px]"
                    description={alertSampleDescription}
                    invert={invert}
                    kind={kind}
                    message={alertSampleMessage}
                    nodeId={figmaNodeIds[kind][invert ? 'true' : 'false']?.[status][size]}
                    size={size}
                    status={status}
                  />
                </div>
              ))}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </section>
  );
}
