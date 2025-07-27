'use client';

import Button from '@/components/ui/Button';
import { useGetQuizList } from '@/features/quiz/hooks/useGetQuizList';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import OpenQuizList from '@/components/quiz/list/OpenQuizList';
import CloseQuizList from '@/components/quiz/list/CloseQuizList';
import { useLectureId } from '@/hooks/queries/useLectureId';

export default function QuizListContainer() {
  const pathname = usePathname();

  const lectureId = useLectureId();
  const { data: quizList, error } = useGetQuizList(lectureId);

  const { openQuizzes, closedQuizzes } = quizList ?? { openQuizzes: [], closedQuizzes: [] };

  const isEmptyQuizList = openQuizzes.length === 0 && closedQuizzes.length === 0;

  return (
    <div className='flex flex-col gap-[20px] w-full min-h-[730px] px-[30px] py-[20px] rounded-[20px] box-border bg-white'>
      <div className='flex justify-end items-center'>
        <Link href={`${pathname}/create`}>
          <Button
            type='BUTTON_CREATE_TYPE'
            size='w-fit h-[49px]'
            title='퀴즈 생성'
            font='text-headline1 font-bold'
            htmlType='button'
            isPurple={false}
          />
        </Link>
      </div>
      {isEmptyQuizList ? (
        <div className='flex justify-center items-center w-full h-full text-heading2 font-semibold text-[#B5B6BC]'>
          생성한 퀴즈가 없어요.
        </div>
      ) : (
        <div className='flex flex-col justify-start items-start gap-[45px]'>
          <OpenQuizList
            openQuizzes={openQuizzes}
            error={error}
          />
          <CloseQuizList
            closedQuizzes={closedQuizzes}
            error={error}
          />
        </div>
      )}
    </div>
  );
}
