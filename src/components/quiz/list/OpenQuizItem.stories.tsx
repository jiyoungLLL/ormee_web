import { Meta, StoryObj } from '@storybook/react';
import OpenQuizItem from './OpenQuizItem';
import { QUIZ_READY, QUIZ_ONGOING } from '@/mock/quiz'; // 실제 경로에 맞게 수정
import { useParams } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const withMockedParams = (Story: React.ComponentType) => {
  (useParams as jest.Mock).mockReturnValue({ lectureId: 'mock-lecture-id' });
  return (
    <div className='w-[800px]'>
      <Story />
    </div>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
    mutations: {
      retry: false,
    },
  },
});

const meta = {
  title: 'Quiz/OpenQuizItem',
  component: OpenQuizItem,
  tags: ['autodocs'],
  decorators: [
    withMockedParams,
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        params: {
          lectureId: 'mock-lecture-id',
        },
      },
    },
  },
} as Meta<typeof OpenQuizItem>;

export default meta;
type Story = StoryObj<typeof OpenQuizItem>;

export const Ongoing: Story = {
  args: {
    quiz: QUIZ_ONGOING,
  },
};

export const Ready: Story = {
  args: {
    quiz: QUIZ_READY,
  },
};
