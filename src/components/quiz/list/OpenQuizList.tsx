import { QuizList } from '@/types/quiz.types';
import OpenQuizItem from './OpenQuizItem';

type OpenQuizListProps = {
  openQuizzes: QuizList;
};

export default function OpenQuizList({ openQuizzes }: OpenQuizListProps) {
  return (
    <div className='flex flex-col gap-[20px] w-full '>
      <h2 className='text-heading2 font-semibold'>진행 퀴즈</h2>
      {openQuizzes.length === 0 && (
        <div className='flex justify-center items-center w-full h-[90px] text-heading2 font-semibold text-gray-50'>
          진행 중인 퀴즈가 없어요.
        </div>
      )}
      {openQuizzes.map((quiz) => (
        <OpenQuizItem
          key={quiz.id}
          quiz={quiz}
          type={quiz.state as 'ongoing' | 'ready'}
        />
      ))}
    </div>
  );
}
