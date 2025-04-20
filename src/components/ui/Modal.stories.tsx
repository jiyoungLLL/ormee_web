import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

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
