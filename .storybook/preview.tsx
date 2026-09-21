import type { Preview } from '@storybook/nextjs-vite';
import { Inter, Poppins } from 'next/font/google';
import '../app/globals.css';

// Same faces as app/layout.tsx, so stories render with the app's typography.
const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const poppins = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: ['400', '500'] });

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className={`${inter.variable} ${poppins.variable} font-[family-name:var(--font-poppins)] antialiased`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
