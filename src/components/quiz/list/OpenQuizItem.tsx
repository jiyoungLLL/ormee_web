import Button from '@/components/ui/Button';

import Image from 'next/image';
import { Quiz } from '@/schemas/quiz.schema';
import { formatDatetimeToYYYYMMDD } from '@/utils/date/formatDate';

type OpenQuizItemProps = {
  quiz: Quiz;
  type: 'ongoing' | 'ready';
};

export default function OpenQuizItem({ quiz, type }: OpenQuizItemProps) {
  const { title, limitTime, updatedAt } = quiz;

  return (
    <div className='flex justify-between items-center px-[10px] py-[20px]'>
      <div className='flex items-center gap-[10px]'>
        <div className='flex justify-center items-center w-[49px] h-[49px] bg-accent-redOrange-5 rounded-[15px]'>
          <Image
            src='/assets/icons/category-icon/quiz.png'
            width={24}
            height={24}
            className='object-contain'
            alt='진행 퀴즈'
            draggable={false}
          />
        </div>
        <div className='flex flex-col gap-[5px]'>
          <h3 className='text-headline1 font-semibold'>{title}</h3>
          <p className='text-label font-semibold text-gray-50'>{formatDatetimeToYYYYMMDD(updatedAt)}</p>
        </div>
      </div>
      <div className='flex items-center gap-[29px]'>
        <div className='flex items-center gap-[5px]'>
          <Image
            src='/assets/icons/timer.png'
            width={14}
            height={16.9}
            alt='응시 시간'
            draggable={false}
          />
          <span className='text-headline1 font-semibold'>{limitTime}</span>
        </div>
        {type === 'ongoing' && (
          <Button
            type='BUTTON_BASE_TYPE'
            size='w-fit h-[46px]'
            font='text-headline2 font-semibold'
            isPurple
            title='마감하기'
          />
        )}
        {type === 'ready' && (
          <Button
            type='BUTTON_BASE_TYPE'
            size='w-fit h-[46px]'
            font='text-headline2 font-semibold'
            isPurple
            isfilled
            title='게시하기'
          />
        )}
      </div>
    </div>
  );
}
