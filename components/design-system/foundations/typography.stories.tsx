import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fontWeights, textStyles, typeScale, typeSizeUtility, fontWeightUtility } from './foundation-tokens';
import { Typography } from './typography';

const meta = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The Plus UI type system from Figma `4909:62199` (documentation) and `4909:61939` ' +
          '(the token table `4909:62513`), rendered straight from the Tailwind v4 theme in ' +
          '`app/globals.css`. Every sample is typeset with the real `font-default`, `text-<size>` ' +
          'and `font-<weight>` utilities and prints the value the browser resolved, so the page ' +
          'cannot drift from the theme the application uses.',
      },
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Font family, the size scale, the four weights and all 52 text styles. */
export const FullSystem: Story = {};

/** The 13 steps of the Figma type scale, each with its paired line height. */
export const TypeScale: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-background-surface p-16 font-default">
      {typeScale.map((size) => (
        <p key={size.name} className={`text-text-default ${typeSizeUtility[size.name]}`}>
          text-{size.name} — Hello Plus UI
        </p>
      ))}
    </div>
  ),
};

/** The four Figma weights, at one size so the difference is the weight and nothing else. */
export const FontWeights: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-background-surface p-16 font-default">
      {fontWeights.map((weight) => (
        <p key={weight.name} className={`text-4xl text-text-default ${fontWeightUtility[weight.name]}`}>
          {weight.label} — Hello Plus UI
        </p>
      ))}
    </div>
  ),
};

/** All 52 Figma text styles, each as the composition of the tokens it is built from. */
export const TextStyles: Story = {
  render: () => (
    <div className="flex flex-col gap-2 bg-background-surface p-16 font-default">
      {textStyles.map((style) => (
        <div key={style.name} className="flex items-baseline gap-6">
          <span className="w-[14rem] shrink-0 text-base font-medium text-text-caption">{style.name}</span>
          <p className={`min-w-0 flex-1 truncate text-text-default ${style.classNames}`}>Hello Plus UI</p>
        </div>
      ))}
    </div>
  ),
};
