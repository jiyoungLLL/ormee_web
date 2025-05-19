import { QuizList } from '@/schemas/quiz.schema';

type OngoingQuizListProps = {
  readyQuizzes: QuizList;
  ongoingQuizzes: QuizList;
};

export default function OngoingQuizList({ readyQuizzes, ongoingQuizzes }: OngoingQuizListProps) {
  return (
    <div>
      <h2 className='text-heading2 font-semibold'>진행 퀴즈</h2>
      <div></div>
    </div>
  );
}
