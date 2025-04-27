import type { Meta, StoryObj } from '@storybook/react';
import SideNav from './SideNav';

const meta = {
  title: 'Components/SideNav',
  component: SideNav,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof SideNav>;

export const UpperSideNav: Story = {
  args: {
    type: 'upper',
    title: ['오르미 토익 RC', '오르미 토익 LC'],
    student: 24,
    date: {
      days: ['월', '수'],
      times: ['15:30 - 16:00'],
    },
  },
};

export const LowerSideNav: Story = {
  args: {
    type: 'lower',
  },
};
