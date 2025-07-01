'use client';

import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { ProfileEditRequest, ProfileResponse, UserProfileData } from '@/features/profile/profile.types';
import { useApiMutation, useApiQuery } from '@/hooks/useApi';
import { profileSchema } from '@/features/profile/profile.schema';
import { ApiResponse } from '@/types/response.types';
import { useToastStore } from '@/stores/toastStore';

export const useGetProfileData = () => {
  return useApiQuery<ProfileResponse, UserProfileData>({
    queryKey: QUERY_KEYS.profile(),
    fetchOptions: {
      endpoint: '/teachers/profile',
      authorization: true,
      errorMessage: '프로필 정보를 가져오는데 실패했어요.',
    },
    schema: profileSchema,
    transform: (data) => ({
      nickname: data.nickname || '',
      image: data.image,
      bio: data.introduction,
    }),
    queryOptions: {
      staleTime: 1000 * 60 * 60 * 3,
      gcTime: 1000 * 60 * 60 * 5,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
    },
  });
};

export const usePutProfileData = () => {
  const { addToast } = useToastStore();

  return useApiMutation<ApiResponse, ProfileEditRequest>({
    method: 'PUT',
    endpoint: '/teachers/profile',
    fetchOptions: {
      authorization: true,
      errorMessage: '프로필 정보 수정이 실패했어요.',
      contentType: 'application/json',
    },
    invalidateKey: QUERY_KEYS.profile(),
    onSuccess: () => {
      addToast({ message: '프로필 정보가 수정됐어요.', type: 'success' });
    },
    onError: (err) => {
      addToast({ message: err.message, type: 'error' });
    },
  });
};
