import { Meta, StoryObj } from '@storybook/react';
import ToastContainer from './ToastContainer';
import { useToastStore } from '@/stores/toastStore';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import { TOAST_ANIMATION_DURATION } from './Toast';

/** 토스트 추가 및 자동 제거 테스트 */
export const ToastLifecycleTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { addToast } = useToastStore.getState();
    const testDuration = 500;

    useToastStore.setState({ toasts: [] });

    addToast({
      message: '테스트 토스트',
      type: 'success',
      duration: testDuration,
    });

    const toast = await canvas.findByText('테스트 토스트');
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(toast).toBeVisible();

    await new Promise((resolve) => setTimeout(resolve, testDuration + TOAST_ANIMATION_DURATION + 100));

    const removedToast = canvas.queryByText('테스트 토스트');
    expect(removedToast).toBeNull();
  },
};

const meta = {
  title: 'Components/ToastContainer',
  component: ToastContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToastContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 최대 3개의 토스트만 표시되는지 테스트 */
export const MaxToastsTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { addToast } = useToastStore.getState();

    useToastStore.setState({ toasts: [] });

    addToast({ message: '첫 번째 토스트', type: 'success' });
    addToast({ message: '두 번째 토스트', type: 'success' });
    addToast({ message: '세 번째 토스트', type: 'success' });
    addToast({ message: '네 번째 토스트', type: 'success' });

    await new Promise((resolve) => setTimeout(resolve, 100));

    const firstToast = canvas.queryByText('첫 번째 토스트');
    expect(firstToast).toBeNull();

    expect(canvas.getByText('두 번째 토스트')).toBeVisible();
    expect(canvas.getByText('세 번째 토스트')).toBeVisible();
    expect(canvas.getByText('네 번째 토스트')).toBeVisible();
  },
};
