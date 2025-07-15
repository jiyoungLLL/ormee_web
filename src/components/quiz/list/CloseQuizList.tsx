import { Quiz } from '@/features/quiz/types/quiz.types';
import CloseQuizItem from '@/components/quiz/list/CloseQuizItem';

type CloseQuizListProps = {
  closedQuizzes: Quiz[];
  error: Error | null;
};

export default function CloseQuizList({ closedQuizzes, error }: CloseQuizListProps) {
  const isLastQuiz = (index: number) => index === closedQuizzes.length - 1;

  const isEmptyQuizList = closedQuizzes.length === 0;
  if (isEmptyQuizList) return null;

  return (
    <div className='flex flex-col w-full'>
      <h2 className='text-heading2 font-semibold mb-[20px]'>마감 퀴즈</h2>
      {closedQuizzes.map((quiz, index) => (
        <CloseQuizItem
          key={quiz.id}
          quiz={quiz}
          isLastQuiz={isLastQuiz(index)}
        />
      ))}
    </div>
  );
}
