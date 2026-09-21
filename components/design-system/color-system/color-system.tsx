import { ColorRamp } from './color-ramp';
import { ColorSwatch } from './color-swatch';
import { RoleTokenTable } from './role-token-table';
import {
  baseTokens,
  colorSystemCopy,
  colorSystemFigmaNodes,
  primitiveFamilies,
  roleTokenGroups,
  semanticFamilies,
} from './color-tokens';

/**
 * The Plus UI colour system as documented in Figma, rendered from the Tailwind theme.
 *
 * Three sections mirror the three token layers:
 *
 *   1. Color Palette (Figma `4922:7320`) - the primitive ramps.
 *   2. Color Classification (Figma `4922:8423`) - the semantic families, each aliasing
 *      one primitive ramp.
 *   3. Role tokens - the `color/text`, `color/background` and `color/border` variables.
 *
 * Every chip is filled with `var(--color-*)` and prints the value it resolves to, so this
 * page is a read-out of `app/globals.css`, never a second copy of the Figma values.
 */
export function ColorSystem() {
  return (
    <div className="flex w-full flex-col font-default">
      <section
        className="flex flex-col gap-16 bg-background-surface p-24"
        data-node-id={colorSystemFigmaNodes.colorPalette}
      >
        <header className="flex flex-col gap-6">
          <h2 className="text-3xl font-semi-bold text-text-default">
            {colorSystemCopy.paletteTitle}
          </h2>
          <p className="text-xl font-regular text-text-default">
            {colorSystemCopy.paletteDescription}
          </p>
        </header>

        <section className="flex flex-col gap-1.5" data-color-ramp="base">
          <h3 className="text-base font-medium text-text-default">Base</h3>
          <div className="grid grid-cols-11 gap-[0.8125rem]">
            {baseTokens.map((base) => (
              <ColorSwatch
                key={base.token}
                className="col-span-2"
                detail={base.figmaVariable}
                label={base.label}
                nodeId={base.figmaNodeId}
                token={base.token}
              />
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-12">
          {primitiveFamilies.map((family) => (
            <ColorRamp
              key={family.name}
              label={family.label}
              nodeId={family.figmaNodeId}
              shadeNodeIds={family.shadeNodeIds}
              tokenPrefix={family.name}
            />
          ))}
        </div>
      </section>

      <section
        className="flex flex-col gap-16 bg-background-default-default p-24"
        data-node-id={colorSystemFigmaNodes.colorClassification}
      >
        <header className="flex flex-col gap-6">
          <h2 className="text-3xl font-semi-bold text-text-default">
            {colorSystemCopy.classificationTitle}
          </h2>
          <p className="text-xl font-regular text-text-default">
            {colorSystemCopy.classificationDescription}
          </p>
        </header>

        <div className="flex flex-col gap-12">
          {semanticFamilies.map((family) => (
            <article
              key={family.name}
              className="flex flex-col gap-6"
              data-node-id={family.figmaNodeId}
              data-semantic-family={family.name}
            >
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-medium text-text-default">{family.label}</h3>
                <p className="text-lg font-regular text-text-default">{family.description}</p>
              </div>
              <ColorRamp
                label={`--color-${family.name}-*`}
                note={`aliases the ${family.primitive} ramp`}
                tokenPrefix={family.name}
              />
            </article>
          ))}
        </div>
      </section>

      <section
        className="flex flex-col gap-16 bg-background-surface p-24"
        data-node-id={colorSystemFigmaNodes.colorTokens}
      >
        <header className="flex flex-col gap-6">
          <h2 className="text-3xl font-semi-bold text-text-default">
            {colorSystemCopy.tokensTitle}
          </h2>
          <p className="text-xl font-regular text-text-default">
            {colorSystemCopy.tokensDescription}
          </p>
          <p className="text-lg font-regular text-text-caption">
            Each role resolves through a semantic family rather than holding a value of its own, and backgrounds carry
            the five interaction states Figma defines. The Dark column renders the same token inside{' '}
            <code>data-theme=&quot;dark&quot;</code>, so both columns read the theme rather than the design file.
          </p>
        </header>

        <div className="flex flex-col gap-12">
          {roleTokenGroups.map((group) => (
            <RoleTokenTable key={group.name} group={group} />
          ))}
        </div>
      </section>
    </div>
  );
}
