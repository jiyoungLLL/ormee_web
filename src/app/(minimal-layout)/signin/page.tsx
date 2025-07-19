'use client';

import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/checkbox/Checkbox';
import Input from '@/components/ui/Input';
import { signinAction } from '@/features/auth/auth.action';
import { SigninFormValues, signinSchema } from '@/features/auth/auth.schema';
import { useToastStore } from '@/stores/toastStore';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

export default function SignInPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [autoSignin, setAutoSignin] = useState(false);
  const [passwordErrorCount, setPasswordErrorCount] = useState(0);

  const { addToast } = useToastStore();
  const searchParams = useSearchParams();

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
      const response = await signinAction(data, autoSignin);

      if (response.status === 'success') {
        const directPath = searchParams.get('redirect') || '/';
        router.push(directPath);
      } else if (response.code === 403) {
        const currentCount = passwordErrorCount + 1;
        setPasswordErrorCount(currentCount);

        addToast({ message: `로그인 정보를 다시 확인해 주세요. (잠금까지 ${5 - currentCount}회 남음)`, type: 'error' });
      } else {
        addToast({ message: response.data || '로그인에 실패했어요.', type: 'error' });
      }
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') console.error(error);
      addToast({ message: error.message || '로그인에 실패했어요.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSignin = (id: string, isChecked: boolean) => {
    setAutoSignin((prev) => !prev);
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
        <h1 className='text-gray-70 text-heading2 font-semibold'>강사의 시간을 절반으로, 통합 수업 관리 솔루션</h1>
      </div>
      <form onSubmit={handleSubmit(handleSignIn, handleSignInError)}>
        <div className='flex flex-col justify-center items-center w-[400px] gap-[12px] mb-[16px]'>
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
        <div className='flex flex-row justify-start items-center gap-[8px] mb-[50px]'>
          <Checkbox
            id='autoSignin'
            checked={autoSignin}
            checkItemHandler={handleAuthSignin}
            size='w-[20px] h-[20px]'
          />
          <span className='text-headline2 text-[#000] font-normal'>자동 로그인</span>
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
