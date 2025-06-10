'use server';

import { SignupFormValues } from '@/features/auth/auth.schema';

export type SignupResponse = {
  status: string;
  code: number;
  message?: string;
};

export async function signupAction(formData: SignupFormValues): Promise<SignupResponse> {
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
    phoneNumber: formData.primaryPhone.prefix + formData.primaryPhone.number,
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
}
