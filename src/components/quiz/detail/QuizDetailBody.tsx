'use client';

import { useGetQuizDetail } from '@/features/quiz/hooks/useGetQuizDetail';
import QuizDetailTitle from '@/components/quiz/detail/QuizDetailTitle';
import QuizDetailProblem from '@/components/quiz/detail/QuizDetailProblem';

type QuizDetailBodyProps = {
  quizId: string;
};

export default function QuizDetailBody({ quizId }: QuizDetailBodyProps) {
  const { data: quizDetail, isPending, error } = useGetQuizDetail(quizId);
  console.log('quizDetail: ', quizDetail);

  if (isPending) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다. {error.message}</div>;

  const { title, description, dueTime, timeLimit, problems } = quizDetail || {};
  return (
    <div className='flex flex-col gap-[21px] w-full'>
      <QuizDetailTitle quizDetail={quizDetail} />
      <QuizDetailProblem problems={problems} />
    </div>
  );
}
