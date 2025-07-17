import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiMutation, useApiQuery } from '@/hooks/useApi';
import { UserInfoEditRequest, UserInfoResponse } from '@/features/user/types/userApi.types';
import { ApiResponse } from '@/types/response.types';
import { useToastStore } from '@/stores/toastStore';

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

export const useEditPersonalInfo = () => {
  const { addToast } = useToastStore();

  return useApiMutation<ApiResponse, UserInfoEditRequest>({
    method: 'PUT',
    endpoint: '/teachers/info',
    fetchOptions: {
      errorMessage: '개인정보 수정에 실패했습니다.',
      authorization: true,
    },
    invalidateKey: QUERY_KEYS.personalInfo(),
    onSuccess: () => {
      addToast({ type: 'success', message: '개인정보가 수정됐어요.' });
    },
    onError: (error) => {
      addToast({ type: 'error', message: error.message || '개인정보 수정에 실패했어요.' });
    },
  });
};
