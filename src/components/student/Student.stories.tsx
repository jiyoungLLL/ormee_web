import type { Meta, StoryObj } from '@storybook/react';
import Student from './Student';

const meta = {
  title: 'Components/Student',
  component: Student,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Student>;

export default meta;
type Story = StoryObj<typeof Student>;

export const Default: Story = {
  args: {
    type: 'title',
  },
};
