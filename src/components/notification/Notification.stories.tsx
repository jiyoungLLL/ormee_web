import type { Meta, StoryObj } from '@storybook/react';
import NotificationItem from './NotificationItem';
import type { Notification, NotificationFilterType } from '@/features/notification/notification.types';

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

const Template = (args: {
  notification: Notification;
  onClose?: () => void;
  currentFilter?: NotificationFilterType;
}) => {
  return (
    <div className='w-[512px]'>
      <NotificationItem
        notification={args.notification}
        onClose={args.onClose || (() => {})}
        currentFilter={args.currentFilter || 'total'}
      />
    </div>
  );
};

/** 읽지 않은 알림 */
export const Unread: Story = {
  render: Template,
  args: {
    notification: {
      notificationId: 1,
      type: 'question',
      title: '미친토익 중급반 rc',
      description: '새로운 질문이 등록됐습니다.',
      parentId: 123,
      createdAt: '2024-01-15T16:35:00Z',
      isRead: false,
    },
    onClose: () => {},
    currentFilter: 'total',
  },
};

/** 읽은 알림 */
export const Read: Story = {
  render: Template,
  args: {
    notification: {
      notificationId: 2,
      type: 'homework',
      title: '오픽 기본반',
      description: '과제 마감까지 3일 남았습니다.',
      parentId: 456,
      createdAt: '2025-06-15T17:25:00Z',
      isRead: true,
    },
    onClose: () => {},
    currentFilter: 'total',
  },
};
