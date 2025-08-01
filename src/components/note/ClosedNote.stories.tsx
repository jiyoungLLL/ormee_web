import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ClosedNote from './ClosedNote';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/Note/ClosedNote',
  component: ClosedNote,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof ClosedNote>;

export default meta;
type Story = StoryObj<typeof ClosedNote>;

const handleClick = () => {
  console.log('드롭다운');
};

export const Default: Story = {
  args: {
    noteId: 1,
    title: '10/29 쪽지',
    date: '2024.10.29 15:00',
    totalCount: 30,
    submitCount: 12,
    isOpen: false,
    onClick: handleClick,
  },
};
