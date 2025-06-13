'use client';

import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { getProfileAction } from '@/features/profile/profile.action';
import { UserProfileData } from './profile.types';

export const getProfile = async () => {
  const response = await getProfileAction();

  if (response.status === 'error') {
    throw new Error(response.message);
  }

  return response.data;
};

export const useGetProfileData = (options?: { initialData?: UserProfileData }) => {
  return useQuery<UserProfileData>({
    queryKey: QUERY_KEYS.profile(),
    queryFn: getProfile,
    staleTime: 1000 * 60 * 60, // 1시간
    gcTime: 1000 * 60 * 60 * 3, // 3시간
    ...options,
  });
};
