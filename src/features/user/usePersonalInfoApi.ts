import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiQuery } from '@/hooks/useApi';
import { UserInfoResponse } from '@/features/user/types/userApi.types';

export const useGetPersonalInfo = () => {
  return useApiQuery<UserInfoResponse>({
    queryKey: QUERY_KEYS.personalInfo(),
    fetchOptions: {
      endpoint: '/teachers/info',
      errorMessage: '개인정보 조회에 실패했습니다.',
    },
    queryOptions: {
      staleTime: 1000 * 60 * 60 * 24,
      gcTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  });
};
