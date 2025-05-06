'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function NoticeTitle() {
  const { control } = useForm();

  return (
    <>
      <div className='relative w-[90px] h-[34px] flex px-[5px] gap-[10px] text-title3 font-bold font-gray-90 items-center'>
        <Image
          src='/assets/icons/sidenav/notice_selected.png'
          width={28}
          height={28}
          alt='공지 아이콘'
          className='w-[28px] h-[28px]'
        />
        공지
      </div>
      <div className='flex justify-between'>
        <div className='relative top-[20px]'>
          <Input
            name='search'
            control={control}
            size='w-[350px] h-[43px]'
            placeholder='검색'
          />
        </div>
        <Link
          href='/notice/write'
          className='relative top-[14px]'
        >
          <Button
            type='BUTTON_CREATE_TYPE'
            size='w-[133px] h-[49px]'
            font='text-headline1 font-bold'
            title='공지 작성'
            isPurple={true}
            description='공지작성 버튼'
          />
        </Link>
      </div>
    </>
  );
}
