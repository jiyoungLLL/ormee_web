import { NotificationFilterType, NotificationType } from '@/features/notification/notification.types';

export const NOTIFICATION_TYPE_LABEL: Record<NotificationFilterType, string> = {
  total: '전체',
  quiz: '퀴즈',
  note: '쪽지',
  homework: '숙제',
  question: '질문',
} as const;

export const NOTIFICATION_TYPE_FROM_LABEL: Record<string, NotificationType> = {
  퀴즈: 'quiz',
  쪽지: 'note',
  숙제: 'homework',
  질문: 'question',
} as const;
