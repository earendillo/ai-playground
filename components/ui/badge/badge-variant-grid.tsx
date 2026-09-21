import { Fragment } from 'react';
import { Badge, type BadgeKind, type BadgeShape, type BadgeSize, type BadgeStatus } from './badge';
import { figmaNodeIds } from './figma-nodes';
import { PlusIcon } from './plus-icon';

export const badgeKinds: BadgeKind[] = ['default', 'icon', 'text'];
export const badgeStatuses: BadgeStatus[] = ['default', 'info', 'success', 'warning', 'danger'];
export const badgeSizes: BadgeSize[] = ['lg', 'md', 'sm'];
export const badgeShapes: BadgeShape[] = ['full rounded', 'rounded'];

/**
 * One kind x shape slice of the Figma component set: statuses across the columns,
 * sizes down the rows, grouped by the Invert property. Shared by the gallery route
 * and the Storybook `AllVariants` story so both stay in step.
 */
export function BadgeVariantGrid({ kind, shape }: { kind: BadgeKind; shape: BadgeShape }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[14px] font-medium text-[#030712]">
        Kind={kind} · Shape={shape}
      </h2>
      <div className="grid grid-cols-[5rem_repeat(5,max-content)] items-center justify-items-center gap-x-4 gap-y-3">
        <span />
        {badgeStatuses.map((status) => (
          <span key={status} className="text-[12px] text-[#6b7280]">
            {status}
          </span>
        ))}
        {[false, true].map((invert) => (
          <Fragment key={String(invert)}>
            <span className="col-span-6 justify-self-start pt-2 text-[12px] font-medium text-[#030712]">
              Invert={String(invert)}
            </span>
            {badgeSizes.map((size) => (
              <Fragment key={size}>
                <span className="justify-self-start text-[12px] text-[#6b7280]">{size}</span>
                {badgeStatuses.map((status, index) => (
                  <Badge
                    key={status}
                    icon={kind === 'default' ? undefined : <PlusIcon size={size} />}
                    invert={invert}
                    kind={kind}
                    label={kind === 'text' ? undefined : `${status} badge`}
                    nodeId={figmaNodeIds[kind][shape][size][invert ? 'true' : 'false'][index]}
                    shape={shape}
                    size={size}
                    status={status}
                  >
                    {kind === 'text' ? 'Badge' : undefined}
                  </Badge>
                ))}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

/** Kind=default (the status dot) only exists in the `full rounded` shape. */
export function badgeShapesFor(kind: BadgeKind): BadgeShape[] {
  return badgeShapes.filter((shape) => figmaNodeIds[kind][shape] !== undefined);
}
