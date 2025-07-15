import { Quiz } from '@/features/quiz/types/quiz.types';
import OpenQuizItem from '@/components/quiz/list/OpenQuizItem';

type OpenQuizListProps = {
  openQuizzes: Quiz[];
  error: Error | null;
};

export default function OpenQuizList({ openQuizzes, error }: OpenQuizListProps) {
  const isLastQuiz = (index: number) => index === openQuizzes.length - 1;

  const isEmptyQuizList = openQuizzes.length === 0;
  const emptyQuizMessage = error ? error.message : '진행중인 퀴즈가 없어요.';

  return (
    <div className='flex flex-col gap-[20px] w-full '>
      <h2 className='text-heading2 font-semibold'>진행 퀴즈</h2>
      {isEmptyQuizList && (
        <div className='flex justify-center items-center w-full h-[90px] text-heading2 font-semibold text-[#B5B6BC]'>
          {emptyQuizMessage}
        </div>
      )}
      <div className='flex flex-col gap-[5px]'>
        {openQuizzes.map((quiz, index) => (
          <OpenQuizItem
            key={quiz.id}
            quiz={quiz}
            isLastQuiz={isLastQuiz(index)}
          />
        ))}
      </div>
    </div>
  );
}
