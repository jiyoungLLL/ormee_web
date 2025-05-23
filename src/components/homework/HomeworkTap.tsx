'use client';

import Image from 'next/image';
import { useState } from 'react';

type HomeworkProps = {
  type: '전체' | '진행중' | '마감';
};

export default function HomeworkTap({ type }: HomeworkProps) {
  const [isOpen, setIsOpen] = useState<{ [key in '진행중' | '마감']?: boolean }>({});

  const toggleOpen = (name: '진행중' | '마감') => {
    setIsOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const renderTap = (name: '진행중' | '마감') => {
    const badgeStyle = name === '진행중' ? 'bg-purple-15 text-purple-50' : 'bg-gray-10 text-gray-60';
    const open = isOpen[name];

    return (
      <div key={name}>
        <div className='text-heading2 font-semibold'>{name === '마감' ? name : '진행'} 과제</div>
        <div className='flex justify-between items-center px-[10px] py-[20px]'>
          <div className='w-[509px] flex gap-[20px]'>
            {name === '진행중' && (
              <div className='w-[49px] h-[49px] bg-purple-10 rounded-[10px] flex justify-center items-center'>
                <Image
                  src='/assets/icons/category-icon/homework.png'
                  width={24}
                  height={24}
                  alt='숙제 아이콘'
                />
              </div>
            )}
            <div className='flex flex-col gap-[5px]'>
              <div className={`text-headline1 font-semibold ${name === '마감' && 'text-gray-60'}`}>과제 이름</div>
              <div className='text-label text-gray-50'>날짜</div>
            </div>
          </div>
          <div className='flex gap-[30px]'>
            <div className={`rounded-[24px] px-[15px] py-[6px] text-headline2 font-semibold ${badgeStyle}`}>{name}</div>
            <Image
              src='/assets/icons/sidenav/dropdown.png'
              width={24}
              height={24}
              alt='드롭다운 아이콘'
              className={`w-[24px] h-[24px] cursor-pointer transition-transform ${open ? 'rotate-180' : ''}`}
              onClick={() => toggleOpen(name)}
            />
          </div>
        </div>
        {open && <div className='px-[10px]'>열림요</div>}
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-[20px]'>
      {type === '전체' ? (
        <>
          {renderTap('진행중')}
          {renderTap('마감')}
        </>
      ) : (
        renderTap(type)
      )}
    </div>
  );
}
