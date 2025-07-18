'use client';

import { HomeResponse } from '@/features/home/home.types';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiQuery } from '@/hooks/useApi';

export const useGetHome = (lectureId: string) => {
  return useApiQuery<HomeResponse>({
    queryKey: QUERY_KEYS.home(lectureId),
    fetchOptions: {
      endpoint: `/home/${lectureId}`,
      authorization: true,
      errorMessage: '강의 홈 정보를 가져오는데 실패했어요.',
    },
    queryOptions: {
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 60 * 3,
      enabled: !!lectureId,
      retry: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  });
};
