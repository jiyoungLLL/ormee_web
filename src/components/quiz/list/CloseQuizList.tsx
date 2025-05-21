import { Quiz } from '@/types/quiz.types';
import CloseQuizItem from './CloseQuizItem';

type CloseQuizListProps = {
  closedQuizzes: Quiz[];
};

export default function CloseQuizList({ closedQuizzes }: CloseQuizListProps) {
  return (
    <div className='flex flex-col w-full'>
      <h2 className='text-heading2 font-semibold mb-[20px]'>마감 퀴즈</h2>
      {closedQuizzes.length === 0 && (
        <div className='flex justify-center items-center w-full h-[90px] text-heading2 font-semibold text-gray-50'>
          마감된 퀴즈가 없어요.
        </div>
      )}
      {closedQuizzes.map((quiz) => (
        <CloseQuizItem
          key={quiz.id}
          quiz={quiz}
        />
      ))}
    </div>
  );
}
