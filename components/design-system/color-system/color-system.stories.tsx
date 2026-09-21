import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ColorRamp } from './color-ramp';
import { ColorSystem } from './color-system';
import { primitiveFamilies, roleTokenGroups, semanticFamilies } from './color-tokens';
import { RoleTokenTable } from './role-token-table';

const meta = {
  title: 'Design System/Colors',
  component: ColorSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The Plus UI colour system from Figma `4922:7320` ("Color Palette"), `4922:8423` ' +
          '("Color Classification") and `4922:6167` ("Color Tokens"), rendered straight from the Tailwind v4 ' +
          'theme in `app/globals.css`. Every chip is filled with `var(--color-*)` and prints the value that ' +
          'token resolves to - including the Dark column, which resolves the same token inside ' +
          '`data-theme="dark"` - so the story cannot drift from the theme the application uses.',
      },
    },
  },
} satisfies Meta<typeof ColorSystem>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The whole system: primitive palette, semantic classification and role tokens. */
export const FullSystem: Story = {};

/** Layer 1 only - the 22 primitive ramps plus the two base values. */
export const PrimitivePalette: Story = {
  render: () => (
    <div className="flex flex-col gap-[3rem] bg-background-surface p-[6rem] font-[family-name:var(--font-inter)]">
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
  ),
};

/** Layer 2 only - the six classified families, each aliasing a primitive ramp. */
export const SemanticFamilies: Story = {
  render: () => (
    <div className="flex flex-col gap-[3rem] bg-background-default-default p-[6rem] font-[family-name:var(--font-inter)]">
      {semanticFamilies.map((family) => (
        <ColorRamp
          key={family.name}
          label={family.label}
          nodeId={family.figmaNodeId}
          note={`--color-${family.name}-* aliases the ${family.primitive} ramp`}
          tokenPrefix={family.name}
        />
      ))}
    </div>
  ),
};

/** Layer 3 only - the role tokens, with the interaction states and both modes. */
export const RoleTokens: Story = {
  render: () => (
    <div className="flex flex-col gap-[3rem] bg-background-surface p-[6rem] font-[family-name:var(--font-inter)]">
      {roleTokenGroups.map((group) => (
        <RoleTokenTable key={group.name} group={group} />
      ))}
    </div>
  ),
};
