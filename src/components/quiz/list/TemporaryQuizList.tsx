'use client';

import { useGetTemporaryQuizList } from '@/features/quiz/hooks/useGetTemporaryQuizList';
import { useLectureId } from '@/hooks/queries/useLectureId';
import TemporaryQuizItem from '@/components/quiz/list/TemporaryQuizItem';

export default function TemporaryQuizList() {
  const lectureId = useLectureId();
  const { data: temporaryQuizList = [], error } = useGetTemporaryQuizList(lectureId);

  const isLastQuiz = (index: number) => index === temporaryQuizList?.length - 1;

  if (error) {
    return (
      <div className='flex justify-center items-center w-full h-full text-headline1 font-semibold text-gray-40'>
        {error.message}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-[5px] w-full'>
      {temporaryQuizList.map((quiz, index) => (
        <TemporaryQuizItem
          key={quiz.id}
          quiz={quiz}
          isLastQuiz={isLastQuiz(index)}
        />
      ))}
    </div>
  );
}
