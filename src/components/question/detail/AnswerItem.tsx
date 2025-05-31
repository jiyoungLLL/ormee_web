'use client';

import { Answer } from '@/features/question/question.types';
import { formatDatetimeWithoutTime } from '@/utils/date/formatDate';
import Image from 'next/image';

type AnswerItemProps = {
  answer: Answer;
};

export default function AnswerItem({ answer }: AnswerItemProps) {
  const { author, content, files, createdAt } = answer;
  const formattedCreatedAt = createdAt ? formatDatetimeWithoutTime(createdAt) : '';

  return (
    <div className='flex flex-col items-start gap-[15px] w-full px-[30px] py-[20px] rounded-[10px] bg-gray-10'>
      <div className='flex justify-center items-center gap-[10px]'>
        <div className='flex justify-center items-center gap-[5px] w-fit h-[28px] px-[10px] py-[3px] bg-purple-15 rounded-[5px]'>
          <span className='text-headline1 font-semibold text-purple-50'>{author}</span>
          <span className='text-headline1 font-normal text-purple-50'>선생님</span>
        </div>
        <span className='text-body2-normal text-gray-70'>{formattedCreatedAt}</span>
      </div>
      <div className='text-body1-reading'>{content}</div>
      <div className='flex flex-wrap gap-[10px]'>
        {files.map((file) => (
          <Image
            key={file.id}
            src={file.url}
            alt='답변 첨부 이미지'
            width={300}
            height={300}
            objectFit='contain'
            className='rounded-[8px]'
          />
        ))}
      </div>
    </div>
  );
}
