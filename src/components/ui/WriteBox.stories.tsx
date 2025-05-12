import type { Meta, StoryObj } from '@storybook/react';
import WriteBox from './WriteBox';

const meta = {
  title: 'Components/WriteBox',
  component: WriteBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WriteBox>;

export default meta;
type Story = StoryObj<typeof WriteBox>;

export const Default: Story = {
  args: { type: '공지' },
};
