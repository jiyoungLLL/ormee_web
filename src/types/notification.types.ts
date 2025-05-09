export type Notification = {
  id: string;
  type: 'assignment' | 'question' | 'quiz' | 'memo' | 'ormee';
  createdAt: string;
  read: boolean;
  title: string;
  description: string;
};
