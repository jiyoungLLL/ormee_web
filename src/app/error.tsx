'use client';

import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <p className='text-headline1 font-bold'>{error.message}</p>
      <Button
        type='BUTTON_BASE_TYPE'
        onClick={reset}
        htmlType='button'
        title='다시 시도하기'
        size='w-[200px] h-[50px]'
        font='text-headline1 font-bold'
        isPurple
        isfilled
      />
      <Button
        type='BUTTON_BASE_TYPE'
        onClick={() => router.push('/signin')}
        htmlType='button'
        title='로그인 페이지로 이동'
        size='w-[200px] h-[50px]'
        font='text-headline1 font-bold'
        isPurple
        isfilled
      />
    </div>
  );
}
