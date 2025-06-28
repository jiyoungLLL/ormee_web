import type { Meta, StoryObj } from '@storybook/react';
import OpenNote from './OpenNote';

const meta = {
  title: 'Components/Note/OpenNote',
  component: OpenNote,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OpenNote>;

export default meta;
type Story = StoryObj<typeof OpenNote>;

export const Default: Story = {
  args: {
    title: '10/29 쪽지',
    date: '2024.10.29 15:00',
    totalCount: 20,
    submitCount: 10,
  },
};

export const NoContents: Story = {
  args: {
    title: '',
    date: '',
    totalCount: 20,
    submitCount: 10,
  },
};
