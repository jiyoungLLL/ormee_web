import { useQuery } from '@tanstack/react-query';
import { Notification } from '@/features/notification/notification.types';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';

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
    retry: false, // TODO: msw 제거 후 설정 변경
  });
};
