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
    size: 'w-[400px] h-[60px]',
    font: 'text-headline1',
    title: '로그인',
    isPurple: true,
    description: '로그인 버튼',
    isfilled: true,
  },
};

export const DisabledTest: Story = {
  args: {
    type: 'BUTTON_BASE_TYPE',
    size: 'w-[400px] h-[60px]',
    title: '로그인',
    isPurple: true,
    description: '로그인 버튼',
    isfilled: true,
    disabled: true,
  },
};

export const TemporarySave: Story = {
  args: {
    type: 'BUTTON_BASE_TYPE',
    size: 'w-[102px] h-[50px]',
    font: 'text-headline1 font-semibold',
    title: '임시저장',
    isPurple: false,
    description: '임시저장 버튼',
    isfilled: false,
  },
};

export const Save: Story = {
  args: {
    type: 'BUTTON_BASE_TYPE',
    size: 'w-[102px] h-[50px]',
    font: 'text-headline1 font-semibold',
    title: '등록하기',
    isPurple: true,
    description: '등록하기 버튼',
    isfilled: true,
  },
};

export const Edit: Story = {
  args: {
    type: 'BUTTON_BASE_TYPE',
    size: 'w-[102px] h-[50px]',
    font: 'text-headline2 font-semibold',
    title: '수정하기',
    isPurple: true,
    description: '수정하기 버튼',
    isfilled: false,
  },
};

export const ModalCancel: Story = {
  args: {
    type: 'BUTTON_MODAL_TYPE',
    size: 'w-[162px] h-[50px]',
    font: 'text-headline1 font-bold',
    title: '취소',
    isPurple: false,
    description: '취소 버튼',
  },
};

export const ModalConfirm: Story = {
  args: {
    type: 'BUTTON_MODAL_TYPE',
    size: 'w-[162px] h-[50px]',
    font: 'text-headline1 font-bold',
    title: '확인',
    isPurple: true,
    description: '취소 버튼',
  },
};

export const QuizCreate: Story = {
  args: {
    type: 'BUTTON_CREATE_TYPE',
    size: 'w-[133px] h-[49px]',
    font: 'text-headline1 font-bold',
    title: '퀴즈 생성',
    isPurple: true,
    description: '수정하기 버튼',
  },
};

export const FileUpload: Story = {
  args: {
    type: 'BUTTON_BASE_TYPE',
    size: 'w-[98px] h-[40px]',
    font: 'text-headline2 font-semibold',
    title: '파일 찾기',
    isPurple: false,
    description: '파일 찾기 버튼',
    htmlType: 'button',
  },
};
