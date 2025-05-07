import { MOCK_HOME_SLIDE } from '@/mock/home';
import type { Meta, StoryObj } from '@storybook/react';
import HomeSlide from './HomeSlide';

const meta = {
  title: 'Components/HomeSlide',
  component: HomeSlide,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HomeSlide>;

export default meta;
type Story = StoryObj<typeof HomeSlide>;

/** 진행중인 과제 슬라이드 */
export const Default: Story = {
  args: {
    data: MOCK_HOME_SLIDE,
  },
};
