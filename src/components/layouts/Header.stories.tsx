import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

/** 로고만 있는 기본 헤더, 왼쪽에 정렬됩니다. */
export const Default: Story = {
  args: {},
};

/** 프로필 등 다른 요소가 있는 헤더, 로고와 justify-between 으로 배치됩니다. */
export const WithProfile: Story = {
  args: {
    children: (
      <div className='flex gap-[10px]'>
        <div className='rounded-full w-[32px] h-[32px] bg-red-500' />
        <div className='rounded-full w-[32px] h-[32px] bg-blue-400' />
      </div>
    ),
  },
};
