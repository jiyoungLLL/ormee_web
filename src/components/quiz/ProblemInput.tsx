import { QuizFormValues } from '@/schemas/quiz.schema';
import { useActiveProblemStore } from '@/stores/activeProblemStore';
import { FieldArrayWithId } from 'react-hook-form';
import ProblemTypeDropdown from './problem/ProblemTypeDropdown';

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
      className={`flex flex-col justify-start items-center w-full px-[30px] py-[20px] rounded-[10px] bg-white box-border border ${isActive ? ACTIVE_BORDER_STYLE : INACTIVE_BORDER_STYLE}`}
      onClick={handleClick}
    >
      <div className='flex justify-between items-center self-stretch w-full'>
        <span className='text-title3 font-normal text-center'>{index + 1}</span>
        <ProblemTypeDropdown index={index} />
      </div>
    </div>
  );
}
