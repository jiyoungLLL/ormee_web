import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const SmallVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge
        size='small'
        color='purple'
        label='Purple'
      />
      <Badge
        size='small'
        color='green'
        label='Green'
      />
      <Badge
        size='small'
        color='blue'
        label='Blue'
      />
      <Badge
        size='small'
        color='orange'
        label='Orange'
      />
      <Badge
        size='small'
        color='gray'
        label='Gray'
      />
    </div>
  ),
};

export const MediumVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge
        size='medium'
        color='purple'
        label='Purple'
      />
      <Badge
        size='medium'
        color='green'
        label='Green'
      />
      <Badge
        size='medium'
        color='blue'
        label='Blue'
      />
      <Badge
        size='medium'
        color='orange'
        label='Orange'
      />
      <Badge
        size='medium'
        color='gray'
        label='Gray'
      />
    </div>
  ),
};

export const Default: Story = {
  args: {
    size: 'small',
    color: 'purple',
    label: 'small',
  },
};
