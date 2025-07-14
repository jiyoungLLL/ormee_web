import { Notification, NotificationListResponse } from '@/features/notification/notification.types';

export const MOCK_NOTIFICATION_LIST_ONE_UNREAD: Notification[] = [
  {
    notificationId: 1,
    type: 'homework',
    title: '미친토익 기본반 rc',
    description: '과제 마감까지 하루 남았습니다.',
    createdAt: '2025-06-12T12:34:50.211426',
    parentId: 1,
    isRead: false,
  },
];

export const MOCK_NOTIFICATION_LIST_ONE_READ: Notification[] = [
  {
    notificationId: 1,
    type: 'homework',
    title: '미친토익 기본반 rc',
    description: '과제 마감까지 하루 남았습니다.',
    createdAt: '2025-06-12T12:34:50.211426',
    parentId: 1,
    isRead: true,
  },
];

export const MOCK_NOTIFICATION_LIST_EMPTY: Notification[] = [];

export const MOCK_NOTIFICATION_LIST_BULK: NotificationListResponse = [
  {
    notificationId: 54,
    type: '쪽지',
    title: '영어 듣기',
    description: '쪽지가 마감되었어요.',
    parentId: 1,
    isRead: false,
    createdAt: '2025-06-12T12:42:00.105106',
  },
  {
    notificationId: 53,
    type: '숙제',
    title: '영어 듣기',
    description: '숙제가 마감되었어요.',
    parentId: 1,
    isRead: false,
    createdAt: '2025-06-12T12:42:00.093422',
  },
  {
    notificationId: 52,
    type: '숙제',
    title: '영어 듣기',
    description: '숙제가 마감되었어요.',
    parentId: 2,
    isRead: false,
    createdAt: '2025-06-12T12:42:00.058451',
  },
  {
    notificationId: 2,
    type: '퀴즈',
    title: '영어 듣기',
    description: '퀴즈가 마감되었어요.',
    parentId: 1,
    isRead: false,
    createdAt: '2025-06-12T12:41:00.098435',
  },
  {
    notificationId: 1,
    type: '질문',
    title: '영어 듣기',
    description: '김학생 학생이 질문을 등록했어요.',
    parentId: 1,
    isRead: true,
    createdAt: '2025-06-12T12:34:50.211426',
  },
];
