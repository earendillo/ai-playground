import { ColorSwatch } from './color-swatch';
import { colorShades, type ColorShade } from './color-tokens';

/**
 * One 950 -> 50 ramp, in the Figma reading order (darkest first).
 *
 * Figma: `Swatch` rows are an 11 column layout with a 13px gap; the `Detail` row below
 * each swatch carries the shade name and its value.
 */
export type ColorRampProps = {
  /** Token prefix, e.g. `gray` or `primary`; each shade resolves to `<prefix>-<shade>`. */
  tokenPrefix: string;
  label: string;
  /** Figma node id of the ramp frame. */
  nodeId?: string;
  /** Short note rendered next to the label, e.g. the primitive a semantic ramp aliases. */
  note?: string;
  /** Figma node id per swatch, where the design defines one. */
  shadeNodeIds?: Record<ColorShade, string>;
};

export function ColorRamp({ tokenPrefix, label, nodeId, note, shadeNodeIds }: ColorRampProps) {
  return (
    <section className="flex flex-col gap-[0.375rem]" data-color-ramp={tokenPrefix} data-node-id={nodeId}>
      <h3 className="flex items-baseline gap-[0.5rem] text-[1rem] leading-[1.5rem] font-medium text-text-default">
        {label}
        {note ? <span className="text-[0.875rem] leading-[1.25rem] font-normal text-text-caption">{note}</span> : null}
      </h3>
      <div className="grid grid-cols-11 gap-[0.8125rem]">
        {colorShades.map((shade) => (
          <ColorSwatch
            key={shade}
            label={shade}
            nodeId={shadeNodeIds?.[shade]}
            token={`${tokenPrefix}-${shade}`}
          />
        ))}
      </div>
    </section>
  );
}
