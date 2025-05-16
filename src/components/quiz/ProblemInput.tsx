import { QuizFormValues } from '@/schemas/quiz.schema';
import { useActiveProblemStore } from '@/stores/activeProblemStore';
import { FieldArrayWithId } from 'react-hook-form';

type ProblemInputProps = {
  problem: FieldArrayWithId<QuizFormValues, 'problems', 'id'>;
  index: number;
};

const ACTIVE_BORDER_STYLE = 'border-purple-50';
const INACTIVE_BORDER_STYLE = 'border-white';
export default function ProblemInput({ problem, index }: ProblemInputProps) {
  const { activeProblemId, setActiveProblemId } = useActiveProblemStore();
  const isActive = activeProblemId === problem.id;

  const handleClick = () => {
    if (isActive) return;
    setActiveProblemId(problem.id);
  };

  return (
    <div
      className={`flex flex-col justify-start items-center w-full px-[30px] pt-[10px] pb-[20px] bg-white box-border border ${isActive ? ACTIVE_BORDER_STYLE : INACTIVE_BORDER_STYLE}`}
      onClick={handleClick}
    >
      {index + 1}번 문제:
      {problem.context}
    </div>
  );
}
