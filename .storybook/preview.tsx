import type { Preview } from '@storybook/nextjs-vite';
import { Inter, Poppins } from 'next/font/google';
import '../app/globals.css';

// Same faces as app/layout.tsx, so stories render with the app's typography.
const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const poppins = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: ['400', '500'] });

/**
 * The font variables go on the document element, as `app/layout.tsx` puts them on `<html>`.
 *
 * `--font-default` is declared in the `@theme` block on `:root` as `var(--font-inter)`, and a
 * custom property is substituted where it is *declared*, not where it is used. Setting the
 * font classes on a wrapper `<div>` would leave `--font-inter` undefined at `:root`, so
 * `font-default` would resolve to nothing and text would fall back to the surrounding face.
 */
if (typeof document !== 'undefined') {
  document.documentElement.classList.add(inter.variable, poppins.variable, 'antialiased');
}

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="font-[family-name:var(--font-poppins)]">
        <Story />
      </div>
    ),
  ],
};

export default preview;
