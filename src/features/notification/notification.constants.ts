import { NotificationFilterType, NotificationType } from '@/features/notification/notification.types';

export const NOTIFICATION_TYPE_LABEL: Record<NotificationFilterType, string> = {
  total: '전체',
  quiz: '퀴즈',
  memo: '쪽지',
  assignment: '숙제',
  question: '질문',
} as const;

export const NOTIFICATION_TYPE_FROM_LABEL: Record<string, NotificationType> = {
  퀴즈: 'quiz',
  쪽지: 'memo',
  숙제: 'assignment',
  질문: 'question',
} as const;
