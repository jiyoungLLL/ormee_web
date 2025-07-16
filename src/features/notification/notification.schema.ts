import { z } from 'zod';

export const notificationResponseSchema = z.object({
  notificationId: z.number(),
  type: z.enum(['쪽지', '숙제', '퀴즈', '질문']),
  title: z.string(),
  description: z.string(),
  parentId: z.number(),
  isRead: z.boolean(),
  createdAt: z.string(),
});

export const notificationListResponseSchema = z.array(notificationResponseSchema);
