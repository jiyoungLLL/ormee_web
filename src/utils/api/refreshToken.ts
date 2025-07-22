'use server';

import { cookies } from 'next/headers';
import { ApiResponse } from '@/types/response.types';
import { ERROR_MESSAGES } from '@/constants/error.constant';

export const refreshAccessToken = async (): Promise<ApiResponse> => {
  const refreshTokenCookie = cookies().get('refreshToken');
  const accessTokenCookie = cookies().get('accessToken');

  if (process.env.NODE_ENV === 'development') {
    console.log('----- 토큰 갱신 시도 ------');
    console.log('요청 시간:', new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
    console.log('RefreshToken 존재:', !!refreshTokenCookie);
    console.log('AccessToken 존재:', !!accessTokenCookie);
  }

  if (!refreshTokenCookie) {
    if (process.env.NODE_ENV === 'development') {
      console.error('RefreshToken이 쿠키에 없음');
    }

    return {
      status: 'fail',
      code: 401,
      data: ERROR_MESSAGES.REFRESH_TOKEN_NOT_FOUND,
    };
  }

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshTokenCookie.value}`,
      },
      redirect: 'follow',
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('토큰 갱신 응답 상태:', response.status);
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Cannot read response');

      if (process.env.NODE_ENV === 'development') {
        console.error('----- 토큰 갱신 실패 ------');
        console.error('상태코드: ', response.status);
        console.error('응답 내용: ', errorText);
      }
    }

    const data = await response.json();

    if (process.env.NODE_ENV === 'development') {
      console.log('헤더 방식으로 토큰 갱신 성공!');
      console.log('새 AccessToken 존재:', !!data.data?.accessToken);
      console.log('새 RefreshToken 존재:', !!data.data?.refreshToken);
    }

    const newAccessToken = data.data.accessToken;
    const newRefreshToken = data.data.refreshToken;

    if (!newAccessToken) {
      if (process.env.NODE_ENV === 'development') {
        console.error('응답에 새 AccessToken이 없음:', data);
      }
      return {
        status: 'fail',
        code: 500,
        data: '새로운 토큰을 받지 못했습니다.',
      };
    }

    const autoSigninCookie = cookies().get('autoSignin');
    const isAutoSignin = autoSigninCookie?.value === 'true';

    if (isAutoSignin) {
      cookies().set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 60 * 60 * 1,
      });

      cookies().set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
    } else {
      cookies().set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 60 * 60 * 1,
      });

      cookies().set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 60 * 60 * 24,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('토큰 갱신 완료!');
    }

    return {
      status: 'success',
      code: 200,
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('토큰 갱신 중 오류 발생:', error);
    }

    return {
      status: 'fail',
      code: 401,
      data: ERROR_MESSAGES.UNAUTHORIZED,
    };
  }
};
