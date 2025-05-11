import { NotificationFilterType } from '@/types/notification.types';

export const NOTIFICATION_TYPE_TEXT: Record<NotificationFilterType, string> = {
  total: '전체',
  assignment: '숙제',
  quiz: '퀴즈',
  question: '질문',
  memo: '쪽지',
  ormee: '오르미',
} as const;
