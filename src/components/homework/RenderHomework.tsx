'use client';

import { useLectureId } from '@/hooks/queries/useLectureId';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import Dropdown from '../ui/dropdown/Dropdown';
import HomeworkTap from './HomeworkTap';

export default function RenderHomework() {
  const lectureNum = useLectureId();
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterMap = {
    전체: '',
    진행중: 'ongoing',
    마감: 'done',
  };

  const reverseFilterMap = {
    ongoing: '진행중',
    done: '마감',
  } as const;

  type FilterType = '전체' | '진행중' | '마감';

  const paramFilter = searchParams.get('filter');
  const initialFilter = (paramFilter && reverseFilterMap[paramFilter as keyof typeof reverseFilterMap]) || '전체';
  const [selected, setSelected] = useState<FilterType>(initialFilter as FilterType);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const mappedValue = filterMap[selected];

    if (!mappedValue) {
      params.delete('filter');
    } else {
      params.set('filter', mappedValue);
    }

    router.replace(`?${params.toString()}`);
  }, [selected]);

  const menuList = [
    { id: 'hw-all', label: '전체', onClick: () => setSelected('전체') },
    { id: 'hw-ongoing', label: '진행중', onClick: () => setSelected('진행중') },
    { id: 'hw-done', label: '마감', onClick: () => setSelected('마감') },
  ];

  return (
    <div className='bg-white rounded-[25px] px-[30px] py-[20px] flex flex-col gap-[20px]'>
      {/* 과제 드롭다운 & 과제 생성 */}
      <div className='w-full flex justify-between'>
        <Dropdown
          showTrigger={true}
          menuList={menuList}
          selectedItem={selected}
        />
        <Link href={`/lectures/${lectureNum}/homework/create`}>
          <Button
            type='BUTTON_CREATE_TYPE'
            size='h-[49px]'
            font='text-headline1 font-bold'
            title='숙제 생성'
            isPurple={true}
          />
        </Link>
      </div>
      <div className='flex flex-col gap-[45px] overflow-auto'>
        <HomeworkTap type={selected} />
      </div>
    </div>
  );
}
