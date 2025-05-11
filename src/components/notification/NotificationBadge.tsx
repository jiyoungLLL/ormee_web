import { NotificationType } from '@/types/notification.types';
import Badge, { BadgeProps } from '../ui/Badge';
import { NOTIFICATION_TYPE_LABEL } from '@/constants/notification.constants';

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

export default function NotificationBadge({ type, read }: NotificationBadgeProps) {
  return (
    <Badge
      size='small'
      color={read ? 'gray' : NOTIFICATION_BADGE_COLOR[type]}
      text={NOTIFICATION_TYPE_LABEL[type]}
    />
  );
}
