'use client';

import { homeSlide } from '@/types/homeSlide.types';
import Image from 'next/image';

type HomSlideData = {
  /** 진행중인 과제 슬라이드 데이터 */
  data: homeSlide[];
};

export default function HomeSlide({ data }: HomSlideData) {
  return (
    <div className='h-[131px] flex gap-[8px] overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar'>
      {data?.map((item, index) => {
        const boxStyle =
          item.cate === '퀴즈'
            ? 'bg-accent-redOrange-5 text-accent-redOrange-20'
            : 'bg-accent-blue-5 text-accent-blue-20';
        const commonStyle = 'h-[20px] flex gap-[10px] text-body2 ';

        return (
          <div
            key={`${item}-${index}`}
            className='min-w-[334px] h-[131px] rounded-[20px] px-[30px] py-[20px] flex flex-col gap-[20px] bg-white'
          >
            <div className='flex gap-[10px]'>
              <div
                className={`w-[44px] h-[24px] rounded-[5px] px-[10px] py-[3px] text-label font-semibold ${boxStyle}`}
              >
                {item.cate}
              </div>
              <div className='text-headline1 font-semibold'>{item.title}</div>
            </div>
            <div className='flex flex-col gap-[6px]'>
              <div className={`${commonStyle}`}>
                <Image
                  src={'/assets/icons/homeSlide_student.png'}
                  width={20}
                  height={20}
                  alt='진행중인 과제 학생 아이콘'
                />
                {item.student}
              </div>
              <div className={`${commonStyle}`}>
                {' '}
                <Image
                  src={'/assets/icons/homeSlide_calendar.png'}
                  width={20}
                  height={20}
                  alt='진행중인 과제 달력 아이콘'
                />
                {item.date}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
