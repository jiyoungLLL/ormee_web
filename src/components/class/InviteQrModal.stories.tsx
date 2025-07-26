import { useModal } from '@/hooks/ui/useModal';
import { Meta, StoryObj } from '@storybook/react';
import InviteQrModal from './InviteQrModal';

const meta = {
  title: 'Components/InviteQrModal',
  component: InviteQrModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InviteQrModal>;

export default meta;
type Story = StoryObj<typeof InviteQrModal>;

export const Default: Story = {
  render: () => {
    const { isOpen, openModal, closeModal } = useModal({ defaultOpen: false });

    return (
      <>
        <button
          onClick={openModal}
          className='w-full h-[50px] px-[20px] py-[12px] rounded-[10px] bg-purple-50 text-headline1 font-semibold text-white'
        >
          모달 열기
        </button>
        <InviteQrModal
          title='오르미 토익'
          lectureId={1}
          isOpen={isOpen}
        />
      </>
    );
  },
};
