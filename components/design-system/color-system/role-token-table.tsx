import { ColorSwatch } from './color-swatch';
import type { RoleTokenGroup } from './color-tokens';

/**
 * One `color.*` group as Figma documents it on "Color Tokens" (`4922:6167`): a Name column,
 * then the Light and the Dark value of every token.
 *
 * The dark column renders inside `data-theme="dark"`, so its chips resolve the same tokens
 * through the dark overrides in `app/globals.css` instead of restating the Figma values.
 */
export function RoleTokenTable({ group }: { group: RoleTokenGroup }) {
  return (
    <section className="flex flex-col gap-1.5" data-node-id={group.figmaNodeId} data-role-group={group.name}>
      <h3 className="text-base font-medium text-text-default">{group.label}</h3>

      <div className="grid grid-cols-[minmax(12rem,1fr)_1fr_1fr] gap-x-[0.8125rem] gap-y-6">
        <span className="text-sm text-text-caption">Name</span>
        <span className="text-sm text-text-caption">Light</span>
        <span className="text-sm text-text-caption">Dark</span>

        {group.tokens.map((role) => (
          <div key={role.token} className="col-span-3 grid grid-cols-subgrid items-start">
            <div className="flex min-w-0 flex-col py-1">
              <span className="text-base font-medium break-words text-text-default">
                {role.figmaVariable.replace(/\//g, '.')}
              </span>
              <span className="text-xs break-words text-text-caption">
                --color-{role.token}
              </span>
            </div>

            <ColorSwatch label={role.light.figmaRef ?? 'literal'} mode="light" token={role.token} />

            <ColorSwatch label={role.dark.figmaRef ?? 'literal'} mode="dark" token={role.token} />
          </div>
        ))}
      </div>
    </section>
  );
}
