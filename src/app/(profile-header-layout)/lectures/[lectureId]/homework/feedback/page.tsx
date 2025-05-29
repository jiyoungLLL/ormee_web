'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function HomeworkFeedback() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div className=''>
      <div className='flex gap-[20px] items-center justify-start'>
        <div className='flex gap-[15px] px-[5px] items-center'>
          <Image
            src='/assets/icons/left_arrow.png'
            width={24}
            height={24}
            alt='뒤로가기 아이콘'
            className='w-[24px] h-[24px]'
          />
          <span className='text-title3 font-bold'>과제 피드백</span>
        </div>
        <span className='text-headline1 font-semibold text-gray-70'>{id}</span>
      </div>
    </div>
  );
}
