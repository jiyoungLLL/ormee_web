import { NotificationType } from '@/types/notification.types';
import Badge, { BadgeProps } from '../ui/Badge';

type NotificationBadgeProps = {
  type: NotificationType;
  read: boolean;
};

const NOTIFICATION_BADGE_COLOR: Record<NotificationType, BadgeProps['color']> = {
  assignment: 'blue',
  quiz: 'orange',
  question: 'green',
  memo: 'purple',
  ormee: 'gray',
} as const;

const NOTIFICATION_BADGE_TEXT: Record<NotificationType, string> = {
  assignment: '숙제',
  quiz: '퀴즈',
  question: '질문',
  memo: '쪽지',
  ormee: '오르미',
} as const;

export default function NotificationBadge({ type, read }: NotificationBadgeProps) {
  return (
    <Badge
      size='small'
      color={read ? 'gray' : NOTIFICATION_BADGE_COLOR[type]}
      text={NOTIFICATION_BADGE_TEXT[type]}
    />
  );
}
