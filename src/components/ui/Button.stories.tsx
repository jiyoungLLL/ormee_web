import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Login: Story = {
  args: {
    type: 'BUTTON_BASE_TYPE',
    width: 400,
    height: 60,
    title: '로그인',
    isPurple: true,
    description: '로그인 버튼',
    isfilled: true,
  },
};

export const TemporarySave: Story = {
  args: {
    type: 'BUTTON_BASE_TYPE',
    width: 102,
    height: 50,
    title: '임시저장',
    isPurple: false,
    description: '임시저장 버튼',
    isfilled: false,
  },
};

export const Save: Story = {
  args: {
    type: 'BUTTON_BASE_TYPE',
    width: 102,
    height: 50,
    title: '등록하기',
    isPurple: true,
    description: '등록하기 버튼',
    isfilled: true,
  },
};

export const Edit: Story = {
  args: {
    type: 'BUTTON_BASE_TYPE',
    width: 102,
    height: 50,
    title: '수정하기',
    isPurple: true,
    description: '수정하기 버튼',
    isfilled: false,
  },
};

export const ModalCancel: Story = {
  args: {
    type: 'BUTTON_MODAL_TYPE',
    width: 162,
    height: 50,
    title: '취소',
    isPurple: false,
    description: '취소 버튼',
  },
};

export const ModalConfirm: Story = {
  args: {
    type: 'BUTTON_MODAL_TYPE',
    width: 162,
    height: 50,
    title: '확인',
    isPurple: true,
    description: '취소 버튼',
  },
};

export const QuizCreate: Story = {
  args: {
    type: 'BUTTON_CREATE_TYPE',
    width: 133,
    height: 49,
    title: '퀴즈 생성',
    isPurple: true,
    description: '수정하기 버튼',
  },
};
