'use client';

import { homeResponseSchema } from '@/features/home/home.schema';
import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import ScrollButton from './ScrollButton';

export default function HomeSlide({ data }: { data: z.infer<typeof homeResponseSchema>['assignments'] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showRight, setShowRight] = useState(true);

  const handleScrollRight = () => {
    scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' });
  };

  const clonedData = [...data.slice(-2), ...data, ...data.slice(0, 2)];

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const itemWidth = 334;

    const handleScroll = () => {
      const maxScrollLeft = scrollEl.scrollWidth - scrollEl.clientWidth;

      if (scrollEl.scrollLeft >= maxScrollLeft - itemWidth) {
        scrollEl.scrollTo({ left: 0, behavior: 'auto' });
      }
    };

    scrollEl.addEventListener('scroll', handleScroll);
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, [data]);

  const handleTimeFormat = (time: string | undefined) => {
    if (!time) return;

    return format(new Date(time), 'yyyy.MM.dd');
  };

  const stripHtmlTags = (title: string) => {
    return title.replace(/<[^>]*>/g, '').trim();
  };

  if (data.length === 0) {
    return (
      <div
        className={`w-full h-[140px] rounded-[20px] px-[30px] py-[20px] flex flex-col gap-[10px] bg-white justify-center items-center`}
      >
        <div className='text-heading2 font-semibold text-[rgb(181_182_188)]'>진행 중인 과제가 없어요.</div>
      </div>
    );
  }

  return (
    <div className='relative w-full group'>
      <div className='overflow-hidden'>
        <div
          ref={scrollRef}
          className='h-[131px] flex gap-[8px] overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide'
        >
          {clonedData?.map((item, index) => {
            const boxStyle =
              item.type === '퀴즈'
                ? 'bg-accent-redOrange-5 text-accent-redOrange-20'
                : 'bg-accent-blue-5 text-accent-blue-20';
            const commonStyle = 'h-[20px] flex gap-[10px] text-body2-normal';

            return (
              <div
                key={`${item}-${index}`}
                className='min-w-[334px] h-[131px] rounded-[20px] px-[30px] py-[20px] flex flex-col gap-[20px] bg-white'
              >
                <div className='flex gap-[10px]'>
                  <div
                    className={`w-[44px] h-[24px] rounded-[5px] px-[10px] py-[3px] text-label font-semibold ${boxStyle}`}
                  >
                    {item.type}
                  </div>
                  <div className='text-headline1 font-semibold'>{stripHtmlTags(item.title)}</div>
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <div className={commonStyle}>
                    <Image
                      src='/assets/icons/homeSlide_student.png'
                      width={20}
                      height={20}
                      alt='학생 아이콘'
                    />
                    {`${item.submitStudents} / ${item.totalStudents}`}
                  </div>
                  <div className={commonStyle}>
                    <Image
                      src='/assets/icons/homeSlide_calendar.png'
                      width={20}
                      height={20}
                      alt='달력 아이콘'
                    />
                    {`${handleTimeFormat(item.openTime)} - ${handleTimeFormat(item.dueTime)}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ScrollButton
        onClick={handleScrollRight}
        visible={showRight}
      />
    </div>
  );
}
