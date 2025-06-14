'use server';

import { ProfileResponse, UserProfileData } from '@/features/profile/profile.types';
import { fetcher } from '@/utils/api/api';

export const getProfileServer = async (): Promise<UserProfileData> => {
  const response = await fetcher<ProfileResponse>({
    method: 'GET',
    endpoint: '/teachers/profile',
    authorization: true,
    errorMessage: '프로필 정보를 가져오는데 실패했어요.',
  });

  if (response.status === 'fail') {
    return Promise.reject(response.data);
  }

  return { name: response.data.name, image: response.data.image, bio: response.data.introduction };
};
