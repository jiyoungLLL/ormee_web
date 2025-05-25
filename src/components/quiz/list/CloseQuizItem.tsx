'use client';

import { Quiz } from '@/types/quiz.types';
import { formatDatetimeWithTime } from '@/utils/date/formatDate';
import Image from 'next/image';
import { useState } from 'react';
import CloseQuizStats from './CloseQuizStats';

type CloseQuizItemProps = {
  quiz: Quiz;
};

export default function CloseQuizItem({ quiz }: CloseQuizItemProps) {
  const { id, title, dueTime, limitTime, submitStudents, totalStudents } = quiz;
  const formattedDueTime = formatDatetimeWithTime(dueTime);

  const [isOpen, setIsOpen] = useState(false);

  const handleStatsToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex flex-col w-full gap-[5px]'>
      <div className='flex justify-between items-center px-[10px] py-[20px] rounded-[15px]'>
        <div className='flex flex-col gap-[5px]'>
          <span className='text-headline1 font-semibold text-gray-60'>{title}</span>
          <span className='text-label font-semibold text-gray-50'>{formattedDueTime}</span>
        </div>
        <div className='flex items-center gap-[29px]'>
          <div className='flex items-center gap-[5px]'>
            <Image
              src='/assets/icons/timer.png'
              alt='응시 시간'
              width={14}
              height={14}
              draggable={false}
            />
            <span className='text-headline1 font-semibold text-gray-50'>{limitTime}</span>
          </div>
          <div className='flex items-center gap-[5px]'>
            <Image
              src='/assets/icons/people.png'
              alt='제출 인원'
              width={16}
              height={16}
              draggable={false}
            />
            <p className='flex items-center gap-[2px]'>
              <span className='text-headline1 font-semibold text-gray-60'>{submitStudents}</span>
              <span className='text-headline1 font-normal text-gray-50'>/</span>
              <span className='text-headline1 font-normal text-gray-50'>{totalStudents}</span>
            </p>
          </div>
          <button
            onClick={handleStatsToggle}
            className={`w-[18px] h-[18px] bg-contain bg-no-repeat bg-center ${
              isOpen
                ? 'bg-[url("/assets/icons/sidenav/dropdown_up.png")]'
                : 'bg-[url("/assets/icons/sidenav/dropdown.png")]'
            }`}
            aria-label='마감퀴즈 통계'
          />
        </div>
      </div>
      {!isOpen && <div className='w-full h-[1px] bg-gray-30' />}
      {isOpen && <CloseQuizStats quizId={id} />}
    </div>
  );
}
