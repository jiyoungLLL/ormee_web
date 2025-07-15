'use client';

import { useGetHome } from '@/features/home/hooks/useGetHome';
import { useGetProfileData } from '@/features/profile/useProfileQuery';

export const useGetAuthorRole = (authorNickname: string) => {
  const { data: homeData } = useGetHome();
  const { data: profileData } = useGetProfileData();

  const userNickname = profileData?.nickname;

  if (homeData?.lecture.isOwner) {
    return userNickname === authorNickname ? 'Owner' : 'Partner';
  }

  return userNickname === authorNickname ? 'Partner' : 'Owner';
};
