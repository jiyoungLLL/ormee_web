import type { Meta, StoryObj } from '@storybook/react';
import OpenQuizItem from './OpenQuizItem';
import { QUIZ_ONGOING, QUIZ_READY } from '@/mock/quiz';

const meta = {
  title: 'Quiz/OpenQuizItem',
  component: OpenQuizItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-[600px]'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OpenQuizItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ongoing: Story = {
  args: {
    quiz: QUIZ_ONGOING,
    type: 'ongoing',
  },
};

export const Ready: Story = {
  args: {
    quiz: QUIZ_READY,
    type: 'ready',
  },
};
