import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { Notification } from '@/types/notification.types';

const fetchNotifications = async (): Promise<Notification[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_MOCK_BASE_URL}/api/teacher/notification/`);

  if (!response.ok) {
    throw new Error('알림을 불러오는데 실패했습니다.');
  }

  return response.json();
};

export const useGetNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: QUERY_KEYS.notification(),
    queryFn: fetchNotifications,
  });
};
