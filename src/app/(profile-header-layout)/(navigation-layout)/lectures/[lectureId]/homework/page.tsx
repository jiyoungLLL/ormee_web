'use client';

import RenderHomework from '@/components/homework/RenderHomework';
import Image from 'next/image';

export default function Homework() {
  return (
    <div className='flex flex-col gap-[17px]'>
      <div className='flex gap-[10px] items-center px-[5px] text-title3 font-bold'>
        <div className='w-[28px] h-[28px] flex justify-center items-center'>
          <Image
            src='/assets/icons/sidenav/homework_selected.png'
            width={28}
            height={28}
            alt='숙제 아이콘'
          />
        </div>
        숙제
      </div>
      <RenderHomework />
    </div>
  );
}
