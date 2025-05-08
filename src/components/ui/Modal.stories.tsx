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
    docs: {
      story: {
        inline: false,
      },
    },
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
  ...ModalTemplate,
  args: {
    title: '확인 모달',
    description: '클릭 테스트용',
    onConfirm: fn(),
  },
  play: async ({ args }) => {
    const confirmButton = await within(document.body).findByText('확인');
    await userEvent.click(confirmButton);

    expect(args.onConfirm).toHaveBeenCalled();
  },
};

export const CancelInteraction: Story = {
  ...ModalTemplate,
  play: async () => {
    const cancelButton = await within(document.body).findByText('취소');
    await userEvent.click(cancelButton);

    expect(cancelButton).not.toBeInTheDocument();
  },
};

/** 백드롭 클릭 시 모달이 닫히는지 테스트 */
export const BackdroptInteraction: Story = {
  ...ModalTemplate,
  play: async () => {
    const backdrop = await within(document.body).findByTestId('modal-backdrop');
    await userEvent.click(backdrop);

    expect(backdrop).not.toBeInTheDocument();
  },
};
