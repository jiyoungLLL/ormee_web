'use server';

import { profileSchema } from '@/features/profile/profile.schema';
import { ProfileResponse, UserProfileData } from '@/features/profile/profile.types';
import { fetcher } from '@/utils/api/api';

export const getProfileAction = async (): Promise<UserProfileData> => {
  const response = await fetcher<{ status: string; data: ProfileResponse; message: string }>({
    method: 'GET',
    endpoint: '/teachers/profile',
    authorization: true,
    errorMessage: '프로필 정보를 가져오는데 실패했어요.',
  });

  const { status, data, message } = response;

  if (status === 'error') {
    if (process.env.NODE_ENV === 'development') console.error('----- api 에러 ------');
    if (process.env.NODE_ENV === 'development') console.error(response);
    throw new Error(message || '프로필 정보를 가져오는데 실패했어요.');
  }

  const parsedData = profileSchema.safeParse(data);
  if (!parsedData.success) {
    if (process.env.NODE_ENV === 'development') console.error('----- 프로필정보 파싱 에러 ------');
    if (process.env.NODE_ENV === 'development') console.error('json: ', response);
    if (process.env.NODE_ENV === 'development') console.error(parsedData.error);
    throw new Error('올바르지 않은 프로필 정보입니다.');
  }

  return {
    name: parsedData.data.name,
    image: parsedData.data.image,
    bio: parsedData.data.introduction,
  };
};
