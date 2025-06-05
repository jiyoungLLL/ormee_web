import { QuizList } from '@/features/quiz/quiz.types';
import OpenQuizItem from '@/components/quiz/list/OpenQuizItem';

type OpenQuizListProps = {
  openQuizzes: QuizList;
};

export default function OpenQuizList({ openQuizzes }: OpenQuizListProps) {
  const isLastQuiz = (index: number) => index === openQuizzes.length - 1;

  return (
    <div className='flex flex-col gap-[20px] w-full '>
      <h2 className='text-heading2 font-semibold'>진행 퀴즈</h2>
      {openQuizzes.length === 0 && (
        <div className='flex justify-center items-center w-full h-[90px] text-heading2 font-semibold text-gray-50'>
          진행 중인 퀴즈가 없어요.
        </div>
      )}
      <div className='flex flex-col gap-[5px]'>
        {openQuizzes.map((quiz, index) => (
          <OpenQuizItem
            key={quiz.id}
            quiz={quiz}
            type={quiz.state as 'ongoing' | 'ready'}
            isLastQuiz={isLastQuiz(index)}
          />
        ))}
      </div>
    </div>
  );
}
