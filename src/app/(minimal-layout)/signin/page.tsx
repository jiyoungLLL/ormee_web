'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { signinAction } from '@/features/auth/auth.action';
import { SigninFormValues, signinSchema } from '@/features/auth/auth.schema';
import { useToastStore } from '@/stores/toastStore';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToastStore();

  const { control, handleSubmit } = useForm<SigninFormValues>({
    defaultValues: {
      id: '',
      password: '',
    },
    resolver: zodResolver(signinSchema),
    mode: 'onSubmit',
  });

  const handleSignIn = async (data: SigninFormValues) => {
    setIsLoading(true);

    try {
      const response = await signinAction(data);

      if (response.status === 'success') {
        router.push('/lectures/1/home'); // TODO: 기본 강의 홈으로 이동
      } else {
        // TODO: 비밀번호 오류 카운트 처리
        addToast({ message: response.message || '로그인에 실패했어요.', type: 'error' });
      }
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') console.error(error);
      addToast({ message: error.message || '로그인에 실패했어요.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInError = (errors: FieldErrors<SigninFormValues>) => {
    if (errors.id) {
      addToast({ message: errors.id.message || '아이디를 확인해주세요.', type: 'error' });
    } else if (errors.password) {
      addToast({ message: errors.password.message || '비밀번호를 확인해주세요.', type: 'error' });
    }
  };

  const alertPreparingFeature = () => {
    addToast({ message: '준비중인 기능입니다.', type: 'error' });
  };

  return (
    <div className='flex flex-col justify-center items-center gap-[50px] w-[400px] h-fit select-none'>
      <div className='flex flex-col justify-center items-center gap-[20px]'>
        <Image
          src='/assets/images/brand/logo.png'
          alt='오르미 로고'
          draggable={false}
          width={160}
          height={29.79}
        />
        <h1 className='text-gray-70 text-heading2 font-semibold'>하나로 끝내는 수업 관리의 새로운 기준</h1>
      </div>
      <form onSubmit={handleSubmit(handleSignIn, handleSignInError)}>
        <div className='flex flex-col justify-center items-center w-[400px] gap-[12px] mb-[50px]'>
          <Input
            name='id'
            control={control}
            size='w-full h-[50px]'
            placeholder='아이디'
            type='text'
          />
          <Input
            name='password'
            control={control}
            size='w-full h-[50px]'
            placeholder='비밀번호'
            type='password'
            showPasswordToggle
          />
        </div>
        <div className='flex flex-col justify-center items-center gap-[30px]'>
          <Button
            type='BUTTON_BASE_TYPE'
            title='로그인'
            isPurple
            isfilled
            size='w-[400px] h-[60px]'
            font='text-headline1 font-bold'
            htmlType='submit'
            disabled={isLoading}
          />
          <div className='flex flex-row justify-center items-center gap-[16px] text-gray-70 text-body1-normal'>
            <Link
              href='#'
              onClick={alertPreparingFeature}
            >
              아이디/비밀번호 찾기
            </Link>
            <span className='text-gray-30'>|</span>
            <Link href='/signup'>회원가입</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
