import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './badge';
import {
  BadgeVariantGrid,
  badgeKinds as kinds,
  badgeShapes as shapes,
  badgeShapesFor,
  badgeSizes as sizes,
  badgeStatuses as statuses,
} from './badge-variant-grid';
import { PlusIcon } from './plus-icon';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge from the Figma "Plus UI" design system, component set `2321:8706`. ' +
          'The five variant axes - kind, status, size, invert and shape - map one to one onto the Figma variant properties.',
      },
    },
  },
  argTypes: {
    kind: { control: 'inline-radio', options: kinds },
    status: { control: 'inline-radio', options: statuses },
    size: { control: 'inline-radio', options: sizes },
    shape: { control: 'inline-radio', options: shapes },
    invert: { control: 'boolean' },
    children: { control: 'text' },
    icon: { control: false },
    nodeId: { control: false },
    className: { control: false },
  },
  args: {
    kind: 'text',
    status: 'default',
    size: 'lg',
    shape: 'full rounded',
    invert: false,
    children: 'Badge',
  },
  render: ({ kind, size, ...args }) => (
    <Badge icon={kind === 'default' ? undefined : <PlusIcon size={size ?? 'lg'} />} kind={kind} size={size} {...args} />
  ),
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Every prop wired to a control, for exploring a single badge. */
export const Playground: Story = {};

/**
 * All 150 Figma variants: every kind x status x size x invert x shape combination.
 * `Kind=default` (the status dot) exists only in the `full rounded` shape.
 */
export const AllVariants: Story = {
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-10 bg-[#ffffff] p-6">
      {kinds.flatMap((kind) =>
        badgeShapesFor(kind).map((shape) => <BadgeVariantGrid key={`${kind}-${shape}`} kind={kind} shape={shape} />),
      )}
    </div>
  ),
};
