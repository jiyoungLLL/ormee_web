import { Quiz } from '@/schemas/quiz.schema';
import { formatDatetimeToYYYYMMDD } from '@/utils/date/formatDate';
import Image from 'next/image';

type CloseQuizItemProps = {
  quiz: Quiz;
};

export default function CloseQuizItem({ quiz }: CloseQuizItemProps) {
  const { id, title, dueTime, limitTime, submitStudents, totalStudents } = quiz;
  const formattedDueTime = formatDatetimeToYYYYMMDD(dueTime);

  return (
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
          />
          <span className='text-headline1 font-semibold text-gray-50'>{limitTime}</span>
        </div>
        <div className='flex items-center gap-[5px]'>
          <Image
            src='/assets/icons/people.png'
            alt='제출 인원'
            width={16}
            height={16}
          />
          <p className='flex items-center gap-[2px]'>
            <span className='text-headline1 font-semibold text-gray-60'>{submitStudents}</span>
            <span className='text-headline1 font-normal text-gray-50'>/</span>
            <span className='text-headline1 font-normal text-gray-50'>{totalStudents}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
