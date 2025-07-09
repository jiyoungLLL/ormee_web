'use client';

import { useGetProfileData } from '@/features/profile/useProfileQuery';

export const getAuthorRole = (authorNickname: string) => {
  // API 수정 후 강의홈 api에서 isOwner 값 받아와 사용
  const { data: userProfileData } = useGetProfileData();

  if (authorNickname === userProfileData?.nickname) {
    return 'Owner';
  }

  return 'Partner';
};
