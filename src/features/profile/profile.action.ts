'use server';

import { profileSchema } from '@/features/profile/profile.schema';
import { UserProfileData } from '@/features/profile/profile.types';
import { cookies } from 'next/headers';

export const getProfileAction = async (): Promise<UserProfileData> => {
  const accessToken = cookies().get('accessToken');

  if (!accessToken) {
    if (process.env.NODE_ENV === 'development') console.error('----- accessToken 에러 ------');
    if (process.env.NODE_ENV === 'development') console.error('accessToken: ', accessToken);
    throw new Error('로그인 후 이용해주세요.');
  }

  const response = await fetch(`${process.env.API_BASE_URL}/teachers/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
    redirect: 'follow',
  });

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error('----- api 응답 에러 ------');
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);
    throw new Error('프로필 정보를 가져오는데 실패했어요.');
  }

  const json = await response.json();
  const { status, data, message } = json;

  if (status === 'error') {
    if (process.env.NODE_ENV === 'development') console.error('----- api 에러 ------');
    if (process.env.NODE_ENV === 'development') console.error(json);
    throw new Error(message || '프로필 정보를 가져오는데 실패했어요.');
  }

  const parsedData = profileSchema.safeParse(data);
  if (!parsedData.success) {
    if (process.env.NODE_ENV === 'development') console.error('----- 프로필정보 파싱 에러 ------');
    if (process.env.NODE_ENV === 'development') console.error('json: ', json);
    if (process.env.NODE_ENV === 'development') console.error(parsedData.error);
    throw new Error('올바르지 않은 프로필 정보입니다.');
  }

  return {
    name: parsedData.data.name,
    image: parsedData.data.image,
    bio: parsedData.data.introduction,
  };
};
