import type { Meta, StoryObj } from '@storybook/react';
import CloseQuizItem from './CloseQuizItem';
import { QUIZ_CLOSED, QUIZ_CLOSED_ERROR } from '@/mock/quiz';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof CloseQuizItem> = {
  title: 'quiz/CloseQuizItem',
  component: CloseQuizItem,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div className='w-[800px]'>
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CloseQuizItem>;

export const Default: Story = {
  args: {
    quiz: QUIZ_CLOSED,
  },
};

export const Error: Story = {
  args: {
    quiz: QUIZ_CLOSED_ERROR,
  },
};
