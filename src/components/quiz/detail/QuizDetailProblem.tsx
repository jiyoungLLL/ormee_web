import { ProblemResponse } from '@/features/quiz/types/quizDetail.types';

type QuizDetailProblemProps = {
  problems: ProblemResponse[];
};

export default function QuizDetailProblem({ problems }: QuizDetailProblemProps) {
  return (
    <>
      {problems.map((problem, index) => (
        <div
          key={`quiz-detail-problem-${problem.id}`}
          className='flex gap-[10px] w-full px-[30px] py-[20px] rounded-[10px] bg-white text-body-reading font-normal'
        >
          <div className='flex items-center gap-[5px] text-heading1 font-normal text-gray-50'>
            <span className='text-gray-90'>{index + 1}</span>
            <span>/</span>
            <span>{problems.length}</span>
          </div>
        </div>
      ))}
    </>
  );
}
