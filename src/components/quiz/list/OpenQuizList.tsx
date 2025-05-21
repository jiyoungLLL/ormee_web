import { QuizList } from '@/types/quiz.types';
import OpenQuizItem from './OpenQuizItem';

type OngoingQuizListProps = {
  readyQuizzes: QuizList;
  ongoingQuizzes: QuizList;
};

export default function OngoingQuizList({ readyQuizzes, ongoingQuizzes }: OngoingQuizListProps) {
  return (
    <div className='flex flex-col gap-[20px] w-full '>
      <h2 className='text-heading2 font-semibold'>진행 퀴즈</h2>
      {ongoingQuizzes.map((quiz) => (
        <OpenQuizItem
          key={quiz.id}
          quiz={quiz}
          type='ongoing'
        />
      ))}
      {readyQuizzes.map((quiz) => (
        <OpenQuizItem
          key={quiz.id}
          quiz={quiz}
          type='ready'
        />
      ))}
    </div>
  );
}
