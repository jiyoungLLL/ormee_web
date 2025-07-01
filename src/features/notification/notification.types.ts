import { z } from 'zod';
import {
  notificationListResponseSchema,
  notificationResponseSchema,
} from '@/features/notification/notification.schema';

export type NotificationType = 'homework' | 'question' | 'quiz' | 'note';

export type Notification = {
  notificationId: number;
  type: NotificationType;
  title: string;
  description: string;
  parentId: number;
  isRead: boolean;
  createdAt: string;
};

export type NotificationFilterType = 'total' | NotificationType;
export type NotificationResponse = z.infer<typeof notificationResponseSchema>;
export type NotificationListResponse = z.infer<typeof notificationListResponseSchema>;
