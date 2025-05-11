import { NotificationFilterType } from '@/types/notification.types';

export const NOTIFICATION_TYPE_LABEL: Record<NotificationFilterType, string> = {
  total: '전체',
  assignment: '숙제',
  quiz: '퀴즈',
  question: 'Q&A',
  memo: '쪽지',
  ormee: 'ormee',
} as const;
