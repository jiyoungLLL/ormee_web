'use server';

import { cookies } from 'next/headers';

export const getAccessToken = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('acceesToken')?.value;

  if (!accessToken) {
    // TODO: 로그인 로직 완료 후 throw error로 변경
    console.error('로그인이 필요합니다.');
  }

  return accessToken;
};

export const getHeaders = async () => {
  if (typeof window) return;

  const accessToken = await getAccessToken();

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};
