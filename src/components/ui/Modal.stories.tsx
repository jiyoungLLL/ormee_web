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

const ModalTemplateWithButton: Story = {
  render: (args) => {
    const { isOpen, modalOpen, modalClose } = useModal({ defaultOpen: false });

    return (
      <>
        <button
          onClick={modalOpen}
          className='w-full h-[50px] px-[20px] py-[12px] rounded-[10px] bg-purple-50 text-headline1 font-semibold text-white'
        >
          모달 열기
        </button>
        <Modal
          {...args}
          isOpen={isOpen}
          onCancel={modalClose}
        >
          <div className='flex justify-center items-center text-center w-full h-[200px]'>모달 내용</div>
        </Modal>
      </>
    );
  },
};

/** 기본 모달, 내부 컨텐츠만 있는 경우 */
export const Default: Story = {
  ...ModalTemplateWithButton,
};

/** 제목 있는 모달 */
export const WithTitle: Story = {
  ...ModalTemplateWithButton,
  args: {
    title: '모달 제목',
  },
};

/** 설명 있는 모달 */
export const WithDescription: Story = {
  ...ModalTemplateWithButton,
  args: {
    description: '모달 설명 텍스트',
  },
};

/** 확인버튼 상호작용 테스트 (onConfirm 호출) */
export const ConfirmInteraction: Story = {
  ...ModalTemplateWithButton,
  args: {
    onConfirm: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const modalButton = within(canvasElement).getByRole('button', { name: '모달 열기' });
    await userEvent.click(modalButton);

    const confirmButton = await within(document.body).findByText('확인');
    await userEvent.click(confirmButton);

    expect(args.onConfirm).toHaveBeenCalled();
  },
};

/** 취소버튼 상호작용 테스트 (모달 닫힘) */
export const CancelInteraction: Story = {
  ...ModalTemplateWithButton,
  play: async ({ canvasElement, args }) => {
    const modalButton = within(canvasElement).getByRole('button', { name: '모달 열기' });
    await userEvent.click(modalButton);

    const cancelButton = await within(document.body).findByText('취소');
    await userEvent.click(cancelButton);

    expect(cancelButton).not.toBeInTheDocument();
  },
};

/** 백드롭 클릭 상호작용 테스트 (모달 닫힘) */
export const BackdropInteraction: Story = {
  ...ModalTemplateWithButton,
  play: async ({ canvasElement, args }) => {
    const modalButton = within(canvasElement).getByRole('button', { name: '모달 열기' });
    await userEvent.click(modalButton);

    const backdrop = await within(document.body).findByTestId('modal-backdrop');
    await userEvent.click(backdrop);

    expect(backdrop).not.toBeInTheDocument();
  },
};
