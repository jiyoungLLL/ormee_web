'use server';

import { ERROR_MESSAGES } from '@/constants/error.constant';
import { ActionResponse } from '@/types/response.types';
import { cookies } from 'next/headers';
import { refreshAccessToken } from './refreshToken';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type ContentType = 'application/json' | 'multipart/form-data';

/**
 * API 요청을 위한 옵션 타입
 * @property {Method} method - HTTP 메서드
 * @property {string} endpoint - API 엔드포인트
 * @property {any} [body] - body 데이터 (필요시 JSON 형식으로 변환됨)
 * @property {ContentType} [contentType='application/json'] - Content-Type 헤더 값
 * @property {boolean} [authorization=true] - 인증 토큰 필요 여부
 * @property {string} [errorMessage] - API 요청 실패 시 표시할 에러 메시지
 * @returns {Promise<T>} API 응답 데이터 (response.json()으로 변환된 값)
 */
export type FetchOptions = {
  method: Method;
  endpoint: string;
  body?: any;
  contentType?: ContentType;
  authorization?: boolean;
  errorMessage?: string;
};

/**
 * 토큰 갱신 실패 시 쿠키를 정리하는 함수
 */
const clearAuthCookies = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
};

/**
 * API 요청을 실행하는 함수
 */
const executeRequest = async (
  endpoint: string,
  method: Method,
  body: any,
  contentType: ContentType,
  accessToken?: string,
): Promise<Response> => {
  const headers: HeadersInit = {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  if (contentType !== 'multipart/form-data') {
    headers['Content-Type'] = contentType;
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
    redirect: 'follow',
  };

  if (body) {
    if (contentType === 'application/json') {
      fetchOptions.body = JSON.stringify(body);
    } else {
      fetchOptions.body = body;
    }
  }

  return fetch(`${process.env.API_BASE_URL}${endpoint}`, fetchOptions);
};

export async function fetcher<T>({
  method,
  endpoint,
  body,
  contentType = 'application/json',
  authorization = true,
  errorMessage,
}: FetchOptions): Promise<ActionResponse<T>> {
  let accessToken = null;

  if (authorization) {
    const accessTokenCookie = cookies().get('accessToken');

    if (!accessTokenCookie) {
      const refreshResult = await refreshAccessToken();

      if (refreshResult.status === 'fail') {
        clearAuthCookies();
        return { status: 'fail', code: 401, data: refreshResult.data };
      }

      const newAccessTokenCookie = cookies().get('accessToken');
      if (!newAccessTokenCookie) {
        clearAuthCookies();
        return { status: 'fail', code: 401, data: ERROR_MESSAGES.ACCESS_TOKEN_NOT_FOUND };
      }

      accessToken = newAccessTokenCookie.value;
    } else {
      accessToken = accessTokenCookie.value;
    }
  }

  // 첫 번째 API 요청
  let res = await executeRequest(endpoint, method, body, contentType, accessToken || undefined);

  if (res.status === 401 && authorization) {
    if (process.env.NODE_ENV === 'development') console.log('AccessToken 만료, 토큰 갱신 요청');

    const refreshResult = await refreshAccessToken();

    if (refreshResult.status === 'fail') {
      if (process.env.NODE_ENV === 'development') console.error('토큰 갱신 실패:', refreshResult.data);

      clearAuthCookies();
      return { status: 'fail', code: 401, data: refreshResult.data };
    }

    if (process.env.NODE_ENV === 'development') console.log('토큰 갱신 성공, 요청 재시도');

    const newAccessTokenCookie = cookies().get('accessToken');
    if (!newAccessTokenCookie) {
      clearAuthCookies();
      return { status: 'fail', code: 401, data: ERROR_MESSAGES.ACCESS_TOKEN_NOT_FOUND };
    }

    res = await executeRequest(endpoint, method, body, contentType, newAccessTokenCookie.value);
  }

  if (!res.ok) {
    const json = await res.json();
    let finalErrorMessage = json.data || json.message || json.error || errorMessage || 'API 요청 실패';

    if (json.status === 500) {
      finalErrorMessage = errorMessage;
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('----- API 요청 실패 ------');
      console.error('상태코드: ', res.status);
      console.error('에러: ', json);
      console.error('에러 메시지: ', finalErrorMessage);
      console.error('요청 데이터: ', body);
    }

    return {
      status: 'fail',
      code: res.status,
      data: finalErrorMessage,
    };
  }

  const data = await res.json();
  return { status: data.status, code: data.code, data: data.data as T };
}
