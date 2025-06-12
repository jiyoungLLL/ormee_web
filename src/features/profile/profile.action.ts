'use server';

import { profileSchema } from '@/features/profile/profile.schema';
import { ProfileResponse, UserProfileData } from '@/features/profile/profile.types';
import { fetcher } from '@/utils/api/api';
import { ActionResponse } from '@/types/response.types';

export const getProfileAction = async (): Promise<ActionResponse<UserProfileData>> => {
  const response = await fetcher<ProfileResponse>({
    method: 'GET',
    endpoint: '/teachers/profile',
    authorization: true,
    errorMessage: '프로필 정보를 가져오는데 실패했어요.',
  });

  if (response.status === 'error') {
    if (process.env.NODE_ENV === 'development') console.error('----- api 에러 ------');
    if (process.env.NODE_ENV === 'development') console.error(response);

    return {
      status: 'error',
      code: response.code,
      message: response.message,
    };
  }

  const parsedData = profileSchema.safeParse(response.data);
  if (!parsedData.success) {
    if (process.env.NODE_ENV === 'development') console.error('----- 프로필정보 파싱 에러 ------');
    if (process.env.NODE_ENV === 'development') console.error('json: ', response);
    if (process.env.NODE_ENV === 'development') console.error(parsedData.error);
    return {
      status: 'error',
      code: 500,
      message: '올바르지 않은 프로필 정보입니다.',
    };
  }

  return {
    status: 'success',
    code: 200,
    data: {
      name: parsedData.data.name,
      image: parsedData.data.image,
      bio: parsedData.data.introduction,
    },
  };
};

export const getProfileServer = async (): Promise<UserProfileData> => {
  const response = await fetcher<ProfileResponse>({
    method: 'GET',
    endpoint: '/teachers/profile',
    authorization: true,
    errorMessage: '프로필 정보를 가져오는데 실패했어요.',
  });

  if (response.status === 'error') {
    return Promise.reject(response.message);
  }

  return { name: response.data.name, image: response.data.image, bio: response.data.introduction };
};
