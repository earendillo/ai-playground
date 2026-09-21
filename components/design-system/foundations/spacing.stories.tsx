import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { numberScale, spacingScale, spacingWidthUtility, tokenVar } from './foundation-tokens';
import { Spacing } from './spacing';

const meta = {
  title: 'Design System/Spacing',
  component: Spacing,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The Plus UI spacing scale from Figma `4907:9053` (documentation) and `4907:8772` ' +
          '(the token table `4907:9279`), rendered from the Tailwind v4 theme in ' +
          '`app/globals.css`. Each step is drawn with the real `w-*` utility and prints the width ' +
          'the browser resolved, so the bar and the number both come from the theme.',
      },
    },
  },
} satisfies Meta<typeof Spacing>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The 35 alias steps and the global number scale they resolve through. */
export const FullSystem: Story = {};

/** The alias scale on its own, drawn with the `w-*` utilities. */
export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-2 bg-background-surface p-16 font-default">
      {spacingScale.map((step) => (
        <div key={step.token} className="flex items-center gap-6">
          <span className="w-[10rem] shrink-0 text-base font-medium text-text-default">{step.figmaAlias}</span>
          <span className={`block h-6 bg-background-primary-default ${spacingWidthUtility[step.step]}`} />
        </div>
      ))}
    </div>
  ),
};

/** Layer 1 - the `number/*` steps spacing, border radius and border width all share. */
export const NumberScale: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 bg-background-surface p-16 font-default">
      {numberScale.map((step) => (
        <div key={step.token} className="flex w-[9rem] flex-col gap-1">
          <span
            className="block h-4 bg-background-default-invert-default"
            style={{ width: tokenVar(step.token) }}
          />
          <span className="text-base font-medium text-text-default">{step.figmaToken}</span>
        </div>
      ))}
    </div>
  ),
};
