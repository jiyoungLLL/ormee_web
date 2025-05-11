export type NotificationType = 'assignment' | 'question' | 'quiz' | 'memo' | 'ormee';

export type Notification = {
  id: string;
  type: NotificationType;
  createdAt: string;
  read: boolean;
  title: string;
  description: string;
};

export type NotificationFilterType = 'total' | NotificationType;
