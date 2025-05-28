'use client';

import { useGetQuestionDetail } from '@/features/question/hooks/queries/useGetQuestionDetail';
import { formatDatetimeWithAMPM } from '@/utils/date/formatDate';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function QuestionDetail() {
  const { questionId } = useParams();
  const { data, error, isLoading } = useGetQuestionDetail(questionId as string);

  if (isLoading)
    return (
      <div className='w-full h-full flex justify-center items-center text-heading2 font-semibold text-gray-70'>
        Loading...
      </div>
    );

  if (error)
    return (
      <div className='w-full h-full flex justify-center items-center text-heading2 font-semibold text-gray-70'>
        Error: {error.message}
      </div>
    );

  const formattedCreatedAt = data ? formatDatetimeWithAMPM(data.createdAt) : '';
  return (
    <article className='flex flex-col gap-[20px] w-full h-full'>
      <div className='flex flex-col gap-[10px]'>
        <div className='flex justify-between items-center'>
          <h2 className='text-heading2 font-semibold'>{data?.title}</h2>
          <span className='text-body2 font-normal text-gray-70'>{formattedCreatedAt}</span>
        </div>
        <span className='text-headline2 font-semibold text-gray-60 mb-[20px]'>{data?.author}</span>
      </div>
      <div className='w-full h-[1px] bg-gray-30' />
      <div className='w-full text-body1-reading'>
        <p>{data?.content}</p>
      </div>
      <div className='w-full h-[1px] bg-gray-30' />
      {data?.filePaths.map((filePath) => (
        <Image
          src={filePath}
          alt='첨부파일'
          width={450}
          height={450}
        />
      ))}
    </article>
  );
}
