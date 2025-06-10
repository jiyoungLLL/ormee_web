'use client';

import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { getProfileAction } from '@/features/profile/profile.action';

export const useGetProfileData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.profile(),
    queryFn: getProfileAction,
    staleTime: 1000 * 60 * 60, // 1시간
    gcTime: 1000 * 60 * 60 * 3, // 3시간
  });
};
