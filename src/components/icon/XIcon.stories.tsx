import type { Meta, StoryObj } from '@storybook/react';
import XIcon from './XIcon';

const meta = {
  title: 'Icon/XIcon',
  component: XIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof XIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 14,
    thickness: 2,
    color: 'black',
    useTailwind: false,
  },
};

export const Large: Story = {
  args: {
    size: 30,
    thickness: 3,
    color: '#696A7D',
    useTailwind: false,
  },
};

export const WithHex: Story = {
  args: {
    size: 24,
    thickness: 2,
    color: '#FF0000',
    useTailwind: false,
  },
};

export const WithTailwind: Story = {
  args: {
    size: 24,
    thickness: 2,
    color: 'bg-purple-50',
    useTailwind: true,
  },
};
