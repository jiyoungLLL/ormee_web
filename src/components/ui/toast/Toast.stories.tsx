import { Meta, StoryObj } from '@storybook/react';
import Toast, { TOAST_ANIMATION_DURATION } from './Toast';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/test';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
토스트 메세지를 표시하기 위해 useToastStore 훅을 사용합니다.

## 사용법

\`\`\`tsx
import { useToastStore } from '@/stores/toastStore';

const YourComponent = () => {
  const { addToast } = useToastStore();

  // 추가할 토스트 메세지에 대한 정보와 함께 addToast 함수를 호출합니다.
  addToast({
    message: '토스트 메시지 내용',
    type: 'success', // 또는 'error'
    duration: 2500,
  });
};
\`\`\`

> 동시에 **최대 3개의 토스트만 표시**되며, 3개 이상의 토스트가 추가되면 가장 오래된 토스트가 자동으로 제거됩니다.`,
      },
    },
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
    duration: 100,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await new Promise((resolve) => setTimeout(resolve, 50));

    const toast = await canvas.findByText('토스트 메세지입니다.');
    expect(toast).toBeVisible();

    await new Promise((resolve) => setTimeout(resolve, 100 + TOAST_ANIMATION_DURATION));
    expect(toast).not.toBeVisible();
  },
};
