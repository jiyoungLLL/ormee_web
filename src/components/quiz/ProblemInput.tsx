import { QuizFormValues } from '@/schemas/quiz.schema';
import { FieldArrayWithId } from 'react-hook-form';

type ProblemInputProps = {
  problem: FieldArrayWithId<QuizFormValues, 'problems', 'id'>;
  index: number;
};

const ACTIVE_BORDER_STYLE = 'border border-purple-50';

export default function ProblemInput({ problem, index }: ProblemInputProps) {
  let active = false;
  return (
    <div
      className={`flex flex-col justify-start items-center w-full px-[30px] pt-[10px] pb-[20px] bg-white ${active && ACTIVE_BORDER_STYLE}`}
    >
      {problem.context}
    </div>
  );
}
