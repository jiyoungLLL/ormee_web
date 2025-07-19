'use server';

import { SigninFormValues, SignupFormValues } from '@/features/auth/auth.schema';
import { ApiResponse } from '@/types/response.types';
import { cookies } from 'next/headers';

export const signupAction = async (formData: SignupFormValues): Promise<ApiResponse> => {
  if (!process.env.API_BASE_URL) {
    return {
      status: 'fail',
      code: 500,
      data: '잘못된 API 접근입니다.',
    };
  }

  const submitData = {
    username: formData.id,
    password: formData.password,
    phoneNumber: formData.phoneNumber,
    email: formData.emailId + '@' + formData.emailDomain,
    name: formData.name,
    nickname: formData.teacherName,
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
      status: 'fail',
      code: response.status,
      data: json.data || '회원가입에 실패했어요.',
    };
  }

  return {
    status: json.status,
    code: json.code,
  };
};

export const signinAction = async (formData: SigninFormValues, autoSignin: boolean): Promise<ApiResponse> => {
  if (!process.env.API_BASE_URL) {
    return {
      status: 'fail',
      code: 500,
      data: '잘못된 API 접근입니다.',
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
      status: 'fail',
      code: json.code,
      data: json.data || '로그인에 실패했어요.',
    };
  }

  const { accessToken, refreshToken } = json.data;

  if (autoSignin) {
    cookies().set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 60 * 60 * 1,
    });

    cookies().set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
  } else {
    cookies().set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 60 * 60 * 1,
    });

    cookies().set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
  }

  cookies().set('autoSignin', autoSignin.toString(), {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  // // NOTE: DB 초기화됐을 때 강의 생성용
  // const testLecture = await fetch(`${process.env.API_BASE_URL}/teachers/lectures`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   body: JSON.stringify({
  //     password: 'secureLecture0',
  //     title: '테스트 강의',
  //     lectureDays: ['월', '수'],
  //     startTime: '15:30:00',
  //     endTime: '17:00:00',
  //     startDate: '2025-07-19T00:00:00',
  //     dueDate: '2025-08-29T23:59:59',
  //   }),
  // });

  return {
    status: json.status,
    code: json.code,
  };
};

export const signoutAction = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
};
