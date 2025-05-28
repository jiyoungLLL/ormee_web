'use client';

import Link from 'next/link';
import { Question } from '@/features/question/question.types';
import { formatDatetimeWithoutTime } from '@/utils/date/formatDate';
import { usePathname, useSearchParams } from 'next/navigation';

type QuestionItemProps = {
  question: Question;
};

export default function QuestionItem({ question }: QuestionItemProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { order, id, title, isAnswered, author, createdAt } = question;
  const formattedCreatedAt = formatDatetimeWithoutTime(createdAt);

  return (
    <article className='grid grid-cols-[34px_360px_55px_68px_82px] justify-between items-center w-full min-h-[50px]'>
      <span className='text-headline2 font-normal text-gray-70'>{order}</span>
      <Link
        href={`${pathname}/${id}?${searchParams}`}
        className='text-headline2 font-semibold text-gray-90 cursor-pointer'
      >
        {title}
      </Link>
      <div
        className={`flex justify-center items-center w-[55px] px-[15px] py-[5px] rounded-[16px] text-body1-normal ${isAnswered ? 'bg-state-success text-[#5CB86C]' : 'bg-state-error text-[#CE5353]'}`}
      >
        {isAnswered ? 'O' : 'X'}
      </div>
      <span className='text-body1-normal text-gray-90'>{author}</span>
      <span className='text-body1-normal text-gray-90'>{formattedCreatedAt}</span>
    </article>
  );
}
