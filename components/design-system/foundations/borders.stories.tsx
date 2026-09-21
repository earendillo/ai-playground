import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Borders } from './borders';
import {
  borderRadiusScale,
  borderRadiusUtility,
  borderWidthScale,
  borderWidthUtility,
  semanticBorderTokens,
} from './foundation-tokens';

const meta = {
  title: 'Design System/Borders',
  component: Borders,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The Plus UI border system from Figma `4908:8172` (documentation) and `4908:7980` ' +
          '(the radius table `4908:8597` and the width table `4908:8790`), rendered from the ' +
          'Tailwind v4 theme in `app/globals.css`. Radius and width are two separate alias ' +
          'families over one shared `number/*` scale, and the page keeps them apart as the ' +
          'design file does.',
      },
    },
  },
} satisfies Meta<typeof Borders>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Radii, widths and the three semantic border roles. */
export const FullSystem: Story = {};

/** The 9 steps of the Figma border radius table. */
export const BorderRadius: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 bg-background-surface p-16 font-default">
      {borderRadiusScale.map((step) => (
        <div key={step.token} className="flex w-[11rem] flex-col gap-2">
          <span
            className={`block h-24 w-full bg-background-primary-default ${borderRadiusUtility[step.token.replace('radius-', '')]}`}
          />
          <span className="text-base font-medium text-text-default">{step.figmaAlias}</span>
        </div>
      ))}
    </div>
  ),
};

/** The 5 steps of the Figma border width table, drawn with the `border-w-*` utility. */
export const BorderWidth: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 bg-background-surface p-16 font-default">
      {borderWidthScale.map((step) => (
        <div key={step.token} className="flex w-[11rem] flex-col gap-2">
          <span
            className={`block h-24 w-full border-solid border-border-primary ${borderWidthUtility[step.token.replace('border-width-', '')]}`}
          />
          <span className="text-base font-medium text-text-default">{step.figmaAlias}</span>
        </div>
      ))}
    </div>
  ),
};

/** Layer 3 - the `border/*` roles components consume. */
export const SemanticTokens: Story = {
  render: () => (
    <div className="flex flex-col gap-6 bg-background-surface p-16 font-default">
      {semanticBorderTokens.map((token) => (
        <div key={token.token} className="flex items-center gap-6">
          <span className="w-[16rem] shrink-0 text-base font-medium text-text-default">{token.figmaVariable}</span>
          <span
            className={
              token.kind === 'radius'
                ? `block h-12 w-24 bg-background-primary-default ${token.utility}`
                : `block h-12 w-24 border-solid border-border-primary ${token.utility}`
            }
          />
        </div>
      ))}
    </div>
  ),
};
