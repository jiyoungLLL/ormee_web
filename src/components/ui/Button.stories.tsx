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

export const TemporarySave: Story = {
  args: {
    type: 'basic',
    title: '임시저장',
    isPurple: false,
    onClicked: () => console.log('임지저장 완료'),
    description: '임시저장 버튼',
    isfilled: false,
  },
};

export const Save: Story = {
  args: {
    type: 'basic',
    title: '등록하기',
    isPurple: true,
    onClicked: () => console.log('등록 완료'),
    description: '등록하기 버튼',
    isfilled: true,
  },
};

export const Edit: Story = {
  args: {
    type: 'basic',
    title: '수정하기',
    isPurple: true,
    onClicked: () => console.log('수정 완료'),
    description: '수정하기 버튼',
    isfilled: false,
  },
};

export const ModalCancel: Story = {
  args: {
    type: 'modal',
    title: '취소',
    isPurple: false,
    onClicked: () => console.log('모달 취소'),
    description: '취소 버튼',
  },
};

export const ModalConfirm: Story = {
  args: {
    type: 'modal',
    title: '확인',
    isPurple: true,
    onClicked: () => console.log('모달 확인'),
    description: '취소 버튼',
  },
};

export const QuizCreate: Story = {
  args: {
    type: 'create',
    title: '퀴즈 생성',
    isPurple: true,
    onClicked: () => console.log('퀴즈 생성 완료'),
    description: '수정하기 버튼',
  },
};
