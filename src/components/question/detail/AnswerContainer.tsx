'use client';

import { useGetAnswer } from '@/features/question/hooks/queries/useAnswer';
import { useParams } from 'next/navigation';
import AnswerItem from '@/components/question/detail/AnswerItem';

export default function Answer() {
  const { questionId } = useParams();
  const { data: answerList } = useGetAnswer(questionId as string);

  return (
    <div className='flex flex-col gap-[15px]'>
      {answerList?.map((answer) => (
        <AnswerItem
          key={answer.id}
          answer={answer}
        />
      ))}
    </div>
  );
}
