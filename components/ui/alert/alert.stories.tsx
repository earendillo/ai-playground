import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Alert } from './alert';
import {
  AlertVariantGrid,
  alertKinds as kinds,
  alertSampleDescription,
  alertSampleMessage,
  alertSizes as sizes,
  alertStatuses as statuses,
} from './alert-variant-grid';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Alert from the Figma "Plus UI" design system, component set `1515:6165`. ' +
          'The four variant axes - kind, status, size and invert - map one to one onto the Figma variant ' +
          'properties, and the `showIcon` / `message` / `description` / `dismissible` props map onto the ' +
          'four Figma boolean slots. `invert` is only defined for `kind="filled"`.',
      },
    },
  },
  argTypes: {
    kind: { control: 'inline-radio', options: kinds },
    status: { control: 'inline-radio', options: statuses },
    size: { control: 'inline-radio', options: sizes },
    invert: { control: 'boolean', description: 'Figma `Invert`, defined only for `kind="filled"`.' },
    message: { control: 'text' },
    description: { control: 'text' },
    showIcon: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    dismissLabel: { control: 'text' },
    icon: { control: false },
    onDismiss: { control: false },
    nodeId: { control: false },
    className: { control: false },
  },
  args: {
    kind: 'filled',
    status: 'default',
    size: 'md',
    invert: false,
    message: alertSampleMessage,
    description: alertSampleDescription,
    showIcon: true,
    dismissible: true,
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Every prop wired to a control, for exploring a single alert. */
export const Playground: Story = {};

/** The five Figma statuses at `Kind=filled`, the default styling. */
export const Statuses: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {statuses.map((status) => (
        <Alert key={status} {...args} status={status} />
      ))}
    </div>
  ),
};

/** Sizes sm / md* / lg, which drive padding, both gaps and the two type ramps. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <Alert key={size} {...args} size={size} status="info" />
      ))}
    </div>
  ),
};

/** `filled`, `outlined` and `dashed`, the three Figma kinds. */
export const Kinds: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {kinds.map((kind) => (
        <Alert key={kind} {...args} kind={kind} status="danger" />
      ))}
    </div>
  ),
};

/** `Invert=true`, the light-surface treatment Figma defines for `kind="filled"` only. */
export const Inverted: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {statuses.map((status) => (
        <Alert key={status} {...args} invert kind="filled" status={status} />
      ))}
    </div>
  ),
};

/** The four Figma boolean slots, toggled one at a time. */
export const Slots: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Alert {...args} status="success" />
      <Alert {...args} description={undefined} status="success" />
      <Alert {...args} message={undefined} status="success" />
      <Alert {...args} showIcon={false} status="success" />
      <Alert {...args} dismissible={false} status="success" />
    </div>
  ),
};

/** All 60 Figma variants: every kind x status x size x invert combination. */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-10 bg-[#ffffff] p-6">
      {kinds.map((kind) => (
        <AlertVariantGrid key={kind} kind={kind} />
      ))}
    </div>
  ),
};
