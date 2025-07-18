'use client';

import Button from '@/components/ui/Button';
import { useLectureId } from '@/hooks/queries/useLectureId';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SearchInput from '../ui/SearchInput';

export default function NoticeTitle() {
  const lectureId = useLectureId();
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('search') ?? '';

  const { control, watch, reset } = useForm({
    defaultValues: {
      search: '',
    },
  });

  useEffect(() => {
    reset({ search: keyword });
  }, [keyword]);

  const searchValue = watch('search');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newParams = new URLSearchParams();
      if (searchValue) newParams.set('search', searchValue);
      newParams.set('page', '1');

      router.replace(`?${newParams.toString()}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue]);

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
          <SearchInput
            name='search'
            control={control}
            size='w-[350px] h-[43px]'
            placeholder='검색'
          />
        </div>
        <Link
          href={`/lectures/${lectureId}/notice/create`}
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
