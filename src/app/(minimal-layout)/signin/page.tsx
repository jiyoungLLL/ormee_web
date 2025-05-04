'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function SignInPage() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const handleSignIn = (data: any) => {
    // TODO: 로그인 요청 API 연동
    alert(`로그인 요청: ${data.id}, ${data.password}`);
  };

  return (
    <div className='flex flex-col justify-center items-center gap-[50px] w-[400px] h-fit'>
      <div className='flex flex-col justify-center items-center gap-[20px]'>
        <Image
          src='/assets/images/brand/logo.png'
          alt='오르미 로고'
          width={160}
          height={29.79}
        />
        <h1 className='text-gray-70 text-heading2 font-semibold'>체계적인 수업 관리 서비스 오르미</h1>
      </div>
      <form onSubmit={handleSubmit(handleSignIn)}>
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
            width={400}
            height={60}
            htmlType='submit'
          />
          <div className='flex flex-row justify-center items-center gap-[16px] text-gray-70 text-body1-normal'>
            <Link href='#'>아이디/비번 찾기</Link>
            <span className='text-gray-30'>|</span>
            <Link href='/signup'>회원가입</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
