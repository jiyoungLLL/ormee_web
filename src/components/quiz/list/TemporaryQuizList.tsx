'use client';

import { useGetTemporaryQuizList } from '@/hooks/queries/quiz/useGetTemporaryQuizList';
import { useLectureId } from '@/hooks/queries/useLectureId';
import TemporaryQuizItem from '@/components/quiz/list/TemporaryQuizItem';

export default function TemporaryQuizList() {
  const lectureId = useLectureId();
  const { data: temporaryQuizList = [] } = useGetTemporaryQuizList(lectureId);

  const isLastQuiz = (index: number) => index === temporaryQuizList.length - 1;

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
