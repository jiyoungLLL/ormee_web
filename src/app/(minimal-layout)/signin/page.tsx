'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { SigninFormValues, signinSchema } from '@/features/auth/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { FieldErrors, useForm } from 'react-hook-form';

export default function SignInPage() {
  const { control, handleSubmit } = useForm<SigninFormValues>({
    defaultValues: {
      id: '',
      password: '',
    },
    resolver: zodResolver(signinSchema),
    mode: 'onSubmit',
  });

  const handleSignIn = (data: SigninFormValues) => {
    // TODO: 로그인 요청 API 연동
    alert(`로그인 요청: ${data.id}, ${data.password}`);
  };

  const handleSignInError = (errors: FieldErrors<SigninFormValues>) => {
    if (errors.id) {
      alert(errors.id.message);
    } else if (errors.password) {
      alert(errors.password.message);
    }
  };

  const alertPreparingFeature = () => {
    alert('준비중인 기능입니다.');
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
        <h1 className='text-gray-70 text-heading2 font-semibold'>체계적인 수업 관리 서비스 오르미</h1>
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
          />
          <div className='flex flex-row justify-center items-center gap-[16px] text-gray-70 text-body1-normal'>
            <Link
              href='#'
              onClick={alertPreparingFeature}
            >
              아이디/비번 찾기
            </Link>
            <span className='text-gray-30'>|</span>
            <Link href='/signup'>회원가입</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
