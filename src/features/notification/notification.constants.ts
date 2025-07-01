import { NotificationFilterType } from '@/features/notification/notification.types';

export const NOTIFICATION_TYPE_LABEL: Record<NotificationFilterType, string> = {
  total: '전체',
  quiz: '퀴즈',
  memo: '쪽지',
  assignment: '숙제',
  question: '질문',
} as const;
