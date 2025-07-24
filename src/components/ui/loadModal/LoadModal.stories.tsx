import { useModal } from '@/hooks/ui/useModal';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadModal from './LoadModal';

const meta = {
  title: 'components/LoadModal',
  component: LoadModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoadModal>;

export default meta;
type Story = StoryObj<typeof LoadModal>;

const queryClient = new QueryClient();

export const Default: Story = {
  render: () => {
    const { isOpen, openModal, closeModal } = useModal({ defaultOpen: false });

    return (
      <QueryClientProvider client={queryClient}>
        <button
          className='w-full h-[50px] px-[20px] py-[12px] rounded-[10px] bg-purple-50 text-headline1 font-semibold text-white'
          onClick={openModal}
        >
          모달 열기
        </button>
        {isOpen && (
          <LoadModal
            isOpen={isOpen}
            onCancel={closeModal}
            onConfirm={closeModal}
            type='퀴즈'
            onClick={() => alert('불러오기 버튼 클릭')}
          />
        )}
      </QueryClientProvider>
    );
  },
};
