import { Meta, StoryObj } from '@storybook/react';
import Toast, { TOAST_ANIMATION_DURATION } from './Toast';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/test';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

/** success 타입 토스트 */
export const Success: Story = {
  args: {
    id: 'toast-1',
    message: '토스트 메세지입니다. (2500ms)',
    type: 'success',
    duration: 2500,
  },
};

/** error 타입 토스트 */
export const Error: Story = {
  args: {
    id: 'toast-2',
    message: '토스트 메세지입니다. (3000ms)',
    type: 'error',
    duration: 3000,
  },
};

/** duration 경과 후 토스트 컴포넌트 fade-out 테스트 */
export const DurationTest: Story = {
  args: {
    id: 'toast-3',
    message: '토스트 메세지입니다.',
    type: 'success',
    duration: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const toast = await canvas.findByText('토스트 메세지입니다.');
    expect(toast).toBeVisible();

    await new Promise((resolve) => setTimeout(resolve, 10 + TOAST_ANIMATION_DURATION));
    expect(toast).not.toBeVisible();
  },
};
