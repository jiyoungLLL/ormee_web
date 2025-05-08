import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import { expect, fn } from '@storybook/test';
import { userEvent } from '@storybook/test';
import { within } from '@storybook/test';
import { useModal } from '@/hooks/useModal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalTemplate: Story = {
  render: (args) => {
    const { isOpen, modalClose } = useModal({ defaultOpen: true });

    return (
      <Modal
        {...args}
        isOpen={isOpen}
        onCancel={modalClose}
        onConfirm={modalClose}
      >
        <div>모달 내용</div>
      </Modal>
    );
  },
};

export const Default: Story = {
  args: {
    isOpen: true,
    title: '모달 제목',
    description: '모달 설명 텍스트입니다.',
    onCancel: () => console.log('취소'),
    onConfirm: () => console.log('확인'),
    children: <div>모달 내용</div>,
  },
};

export const WithoutDescription: Story = {
  args: {
    isOpen: true,
    title: '모달 제목',
    onCancel: () => console.log('취소'),
    onConfirm: () => console.log('확인'),
    children: <div>모달 내용</div>,
  },
};

export const WithoutTitle: Story = {
  args: {
    isOpen: true,
    onCancel: () => console.log('취소'),
    onConfirm: () => console.log('확인'),
    children: <div>모달 내용</div>,
  },
};

export const ConfirmInteraction: Story = {
  args: {
    isOpen: true,
    title: '확인 모달',
    description: '클릭 테스트용',
    onCancel: fn(),
    onConfirm: fn(),
    children: <div>모달 내부</div>,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const confirmButton = canvas.getByText('확인');
    await userEvent.click(confirmButton);

    expect(args.onConfirm).toHaveBeenCalled();
  },
};

export const CancelInteraction: Story = {
  args: {
    isOpen: true,
    title: '취소 모달',
    description: '클릭 테스트용',
    onCancel: fn(),
    onConfirm: fn(),
    children: <div>모달 내부</div>,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const cancelButton = canvas.getByText('취소');
    await userEvent.click(cancelButton);

    expect(args.onCancel).toHaveBeenCalled();
  },
};

/** 백드롭 클릭 시 모달이 닫히는지 테스트 */
export const BackdroptInteraction: Story = {
  ...ModalTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const backdrop = canvas.getByTestId('modal-backdrop');
    await userEvent.click(backdrop);

    expect(backdrop).not.toBeInTheDocument();
  },
};
