import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteAllNotifications,
  deleteNotification,
  putAllNotificationsAsRead,
  putNotificationAsRead,
} from '@/features/notification/api/notification.api';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { Notification, NotificationFilterType, NotificationType } from '@/features/notification/notification.types';

type MutateNotificationParams = {
  notificationId: number;
  lectureId: string;
  currentFilter: NotificationFilterType;
  notificationType: NotificationType;
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ notificationId }: { notificationId: number }) => putNotificationAsRead(notificationId),
    onMutate: async ({ notificationId, lectureId, currentFilter, notificationType }: MutateNotificationParams) => {
      const queryKey = QUERY_KEYS.notification(lectureId, currentFilter);
      await queryClient.cancelQueries({ queryKey });

      const previousNotifications = queryClient.getQueryData<Notification[]>(queryKey);

      queryClient.setQueryData(queryKey, (prevNotifications: Notification[]) => {
        if (!prevNotifications) return prevNotifications;

        return prevNotifications.map((notification) =>
          notification.notificationId === notificationId ? { ...notification, isRead: true } : notification,
        );
      });

      return { previousNotifications, queryKey };
    },
    onError: (error, _, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(context.queryKey, context.previousNotifications);
      }
    },
    onSettled: (data, error, variables, context) => {
      const isOnTotalFilter = variables.currentFilter === 'total';

      const pairQueryKey = isOnTotalFilter
        ? QUERY_KEYS.notification(variables.lectureId, variables.notificationType)
        : QUERY_KEYS.notification(variables.lectureId, 'total');

      if (context?.queryKey) {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
        queryClient.invalidateQueries({ queryKey: pairQueryKey });
      }
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ notificationId }: { notificationId: number }) => deleteNotification(notificationId),
    onMutate: async ({ notificationId, lectureId, currentFilter, notificationType }: MutateNotificationParams) => {
      const queryKey = QUERY_KEYS.notification(lectureId, currentFilter);
      await queryClient.cancelQueries({ queryKey });

      const previousNotifications = queryClient.getQueryData<Notification[]>(queryKey);

      queryClient.setQueryData(queryKey, (previousNotifications: Notification[]) => {
        if (!previousNotifications) return previousNotifications;

        return previousNotifications.filter((notification) => notification.notificationId !== notificationId);
      });

      return { previousNotifications, queryKey };
    },
    onError: (error, _, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(context.queryKey, context.previousNotifications);
      }
    },
    onSettled: (data, error, variables, context) => {
      const isOnTotalFilter = variables.currentFilter === 'total';

      const pairQueryKey = isOnTotalFilter
        ? QUERY_KEYS.notification(variables.lectureId, variables.notificationType)
        : QUERY_KEYS.notification(variables.lectureId, 'total');

      if (context?.queryKey) {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
        queryClient.invalidateQueries({ queryKey: pairQueryKey });
      }
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lectureId }: { lectureId: string }) => putAllNotificationsAsRead(lectureId),
    onMutate: async ({ lectureId, currentFilter }: { lectureId: string; currentFilter: NotificationFilterType }) => {
      const queryKey = QUERY_KEYS.notification(lectureId, currentFilter);
      await queryClient.cancelQueries({ queryKey });

      const previousNotifications = queryClient.getQueryData<Notification[]>(queryKey);

      queryClient.setQueryData(queryKey, (previousNotifications: Notification[]) => {
        if (!previousNotifications) return previousNotifications;

        return previousNotifications.map((notification) => ({ ...notification, isRead: true }));
      });

      return { previousNotifications, queryKey };
    },
    onError: (error, _, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(context.queryKey, context.previousNotifications);
      }
    },
    onSettled: (data, error, variables, context) => {
      const queryKeyList: NotificationFilterType[] = ['total', 'homework', 'quiz', 'question', 'note'];

      queryKeyList.forEach((filter) => {
        const queryKey = QUERY_KEYS.notification(variables.lectureId, filter);
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });
};

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lectureId }: { lectureId: string }) => deleteAllNotifications(lectureId),
    onMutate: async ({ lectureId, currentFilter }: { lectureId: string; currentFilter: NotificationFilterType }) => {
      const queryKey = QUERY_KEYS.notification(lectureId, currentFilter);
      await queryClient.cancelQueries({ queryKey });

      const previousNotifications = queryClient.getQueryData<Notification[]>(queryKey);

      queryClient.setQueryData(queryKey, (previousNotifications: Notification[]) => {
        if (!previousNotifications) return previousNotifications;

        return [];
      });

      return { previousNotifications, queryKey };
    },
    onError: (error, _, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(context.queryKey, context.previousNotifications);
      }
    },
    onSettled: (data, error, variables, context) => {
      const queryKeyList: NotificationFilterType[] = ['total', 'homework', 'quiz', 'question', 'note'];

      queryKeyList.forEach((filter) => {
        const queryKey = QUERY_KEYS.notification(variables.lectureId, filter);
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });
};
