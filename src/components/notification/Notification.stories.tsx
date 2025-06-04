import type { Meta, StoryObj } from '@storybook/react';
import NotificationItem from './NotificationItem';
import type { Notification } from '@/features/notification/notification.types';

const meta = {
  title: 'Components/Notification/NotificationItem',
  component: NotificationItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: { notification: Notification }) => {
  return (
    <div className='w-[512px]'>
      <NotificationItem {...args} />
    </div>
  );
};

/** 읽지 않은 알림 */
export const Unread: Story = {
  render: Template,
  args: {
    notification: {
      id: '1',
      type: 'question',
      title: '미친토익 중급반 rc',
      description: '새로운 질문이 등록됐습니다.',
      createdAt: '오후 4시 35분',
      read: false,
    },
  },
};

/** 읽은 알림 */
export const Read: Story = {
  render: Template,
  args: {
    notification: {
      id: '2',
      type: 'assignment',
      title: '오픽 기본반',
      description: '과제 마감까지 3일 남았습니다.',
      createdAt: '오후 5시 25분',
      read: true,
    },
  },
};
