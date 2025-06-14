'use client';

import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { ProfileResponse, UserProfileData } from '@/features/profile/profile.types';
import { useApiQuery } from '@/hooks/useApi';
import { profileSchema } from '@/features/profile/profile.schema';

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
      name: data.name,
      image: data.image,
      bio: data.introduction,
    }),
    queryOptions: {
      staleTime: 1000 * 60 * 60 * 1,
      gcTime: 1000 * 60 * 60 * 3,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  });
};
