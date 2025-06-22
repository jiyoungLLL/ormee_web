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
    noteId: 1,
    title: '10/29 쪽지',
    date: '2024.10.29 15:00',
  },
};

export const NoContents: Story = {
  args: {
    noteId: 1,
    title: '',
    date: '',
  },
};
