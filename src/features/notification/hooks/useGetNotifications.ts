import {
  Notification,
  NotificationFilterType,
  NotificationListResponse,
} from '@/features/notification/notification.types';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { NOTIFICATION_TYPE_FROM_LABEL, NOTIFICATION_TYPE_LABEL } from '../notification.constants';
import { useApiQuery } from '@/hooks/useApi';
import { notificationListResponseSchema } from '../notification.schema';

export const useGetNotifications = ({
  lectureId,
  filter,
}: {
  lectureId: string;
  filter: NotificationFilterType | 'total';
}) => {
  const filterQueryParam = NOTIFICATION_TYPE_LABEL[filter] ?? '전체';

  return useApiQuery<NotificationListResponse, Notification[]>({
    queryKey: QUERY_KEYS.notification(lectureId, filter ?? 'total'),
    queryOptions: {
      staleTime: 1000 * 60 * 5,
      refetchOnMount: true,
    },
    fetchOptions: {
      endpoint: `/teachers/${lectureId}/notifications?filter=${filterQueryParam}`,
      authorization: true,
      errorMessage: '알림을 불러오는데 실패했어요',
    },
    schema: notificationListResponseSchema,
    transform: (data) => {
      return data.map((notification) => ({
        ...notification,
        type: NOTIFICATION_TYPE_FROM_LABEL[notification.type],
      }));
    },
  });
};
