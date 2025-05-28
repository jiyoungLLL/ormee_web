'use client';

import Feedback from '@/components/homework/Feedback';
import RenderHomework from '@/components/homework/RenderHomework';
import Image from 'next/image';
import { useState } from 'react';

const SELECTEDSTYLE =
  'h-[55px] w-[145px] rounded-t-[20px] flex items-center justify-center gap-[9px] bg-white font-semibold text-purple-50';
const BASICSTYLE = 'w-[145px] h-[43px] rounded-[20px] bg-gray-20 text-gray-60 text-center';

export default function Homework() {
  const [tab, setTab] = useState<'ongoing' | 'done'>('ongoing');

  return (
    <div>
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
      {/* 탭 */}
      <div className='pt-[20px] flex gap-4 items-center'>
        <div className='relative flex items-end'>
          <button
            className={`text-headline1 ${tab === 'ongoing' ? `${SELECTEDSTYLE} text-[20px]` : BASICSTYLE}`}
            onClick={() => setTab('ongoing')}
          >
            제출 관리
          </button>

          {tab === 'ongoing' && (
            <Image
              src={'/assets/icons/class/right-vector.png'}
              width={25}
              height={25}
              alt='오른쪽 벡터 아이콘'
              className='absolute left-[100%] bottom-0 z-10'
            />
          )}
        </div>

        <div className='relative flex items-end'>
          {tab === 'done' && (
            <Image
              src={'/assets/icons/class/left-vector.png'}
              width={25}
              height={25}
              alt='왼쪽 벡터 아이콘'
              className='absolute right-[100%] bottom-0 z-10'
            />
          )}
          <button
            className={`text-headline1 ${tab === 'done' ? SELECTEDSTYLE : BASICSTYLE}`}
            onClick={() => setTab('done')}
          >
            피드백
          </button>
          {tab === 'done' && (
            <Image
              src={'/assets/icons/class/right-vector.png'}
              width={25}
              height={25}
              alt='오른쪽 벡터 아이콘'
              className='absolute left-[100%] bottom-0 z-10'
            />
          )}
        </div>
      </div>
      <div className='w-[1018px] max-h-[666px]'>{tab === 'ongoing' ? <RenderHomework /> : <Feedback />}</div>
    </div>
  );
}
