import type { Meta, StoryObj } from '@storybook/react';
import ClosedNote from './ClosedNote';

const meta = {
  title: 'Components/Note/ClosedNote',
  component: ClosedNote,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ClosedNote>;

export default meta;
type Story = StoryObj<typeof ClosedNote>;

export const Default: Story = {
  args: {
    noteId: 1,
    title: '10/29 쪽지',
    date: '2024.10.29 15:00',
  },
};
