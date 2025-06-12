'use server';

import { ERROR_MESSAGES } from '@/constants/error.constant';
import { cookies } from 'next/headers';
import { ActionResponse } from '@/types/response.types';

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
type FetchOptions = {
  method: Method;
  endpoint: string;
  body?: any;
  contentType?: ContentType;
  authorization?: boolean;
  errorMessage?: string;
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
      return { status: 'error', code: 401, message: ERROR_MESSAGES.ACCESS_TOKEN_NOT_FOUND };
    }

    accessToken = accessTokenCookie?.value;
  }

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

  const res = await fetch(`${process.env.API_BASE_URL}${endpoint}`, fetchOptions);

  if (!res.ok) {
    const err = await res.json().catch(() => {});
    if (process.env.NODE_ENV === 'development') console.error('----- API 요청 실패 ------');
    if (process.env.NODE_ENV === 'development') console.error(res.status);
    if (process.env.NODE_ENV === 'development') console.error(err);

    if (res.status === 401) {
      return { status: 'error', code: 401, message: ERROR_MESSAGES.UNAUTHORIZED };
    }

    return { status: 'error', code: res.status, message: errorMessage || err.message || 'API 요청 실패' };
  }

  const data = await res.json();
  return { status: data.status, code: data.code, data: data.data as T };
}
