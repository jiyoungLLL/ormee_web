'use server';

import { SigninFormValues, SignupFormValues } from '@/features/auth/auth.schema';
import { cookies } from 'next/headers';

export type AuthResponse = {
  status: string;
  code: number;
  message?: string;
};

export const signupAction = async (formData: SignupFormValues): Promise<AuthResponse> => {
  if (!process.env.API_BASE_URL) {
    return {
      status: 'error',
      code: 500,
      message: '잘못된 API 접근입니다.',
    };
  }

  const submitData = {
    username: formData.id,
    password: formData.password,
    phoneNumber: formData.phoneNumber,
    email: formData.emailId + '@' + formData.emailDomain,
    name: formData.name,
  };

  const response = await fetch(`${process.env.API_BASE_URL}/teachers/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submitData),
    redirect: 'follow',
  });

  const json = await response.json();

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error('회원가입 실패: ', json);

    return {
      status: 'error',
      code: response.status,
      message: json.message || '회원가입에 실패했어요.',
    };
  }

  return {
    status: json.status,
    code: json.code,
  };
};

export const signinAction = async (formData: SigninFormValues): Promise<AuthResponse> => {
  if (!process.env.API_BASE_URL) {
    return {
      status: 'error',
      code: 500,
      message: '잘못된 API 접근입니다.',
    };
  }

  const submitData = {
    username: formData.id,
    password: formData.password,
  };

  const response = await fetch(`${process.env.API_BASE_URL}/teachers/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submitData),
    redirect: 'follow',
  });

  const json = await response.json();

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error('로그인 실패: ', json);

    return {
      status: 'error',
      code: response.status,
      message: json.message || '로그인에 실패했어요.',
    };
  }

  const { accessToken, refreshToken } = json.data;

  cookies().set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  cookies().set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/nonexistent', // TODO: 임시로 존재하지 않는 경로로 설정하여 접근 차단, 토큰 갱신 api 확인 후 변경
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    status: json.status,
    code: json.code,
  };
};

export const signoutAction = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
};
