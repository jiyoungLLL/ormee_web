import { NotificationFilterType } from '@/features/notification/notification.types';

export const NOTIFICATION_TYPE_LABEL: Record<NotificationFilterType, string> = {
  total: '전체',
  assignment: '숙제',
  quiz: '퀴즈',
  question: '질문',
  memo: '쪽지',
} as const;
