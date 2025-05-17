import { QuizFormValues } from '@/schemas/quiz.schema';
import { useActiveProblemStore } from '@/stores/activeProblemStore';
import { FieldArrayWithId, UseFieldArrayRemove, useFormContext } from 'react-hook-form';
import ProblemTypeDropdown from './problem/ProblemTypeDropdown';
import Input from '../ui/Input';
import ChoiceItemContainer from './problem/ChoiceItemContainer';
import Answer from './problem/Answer';
import RemoveProblemButton from './problem/RemoveProblemButton';

type ProblemInputProps = {
  problem: FieldArrayWithId<QuizFormValues, 'problems', 'id'>;
  index: number;
  remove: UseFieldArrayRemove;
};

const ACTIVE_BORDER_STYLE = 'border-purple-50';
const INACTIVE_BORDER_STYLE = 'border-white';

export default function ProblemInput({ problem, index, remove }: ProblemInputProps) {
  const { activeProblemId, setActiveProblemId } = useActiveProblemStore();
  const { control } = useFormContext<QuizFormValues>();
  const isActive = activeProblemId === problem.id;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isActive) return;
    setActiveProblemId(problem.id);
  };

  return (
    <div
      className={`flex flex-col justify-start items-start w-full px-[30px] py-[20px] gap-[24px] rounded-[10px] bg-white box-border border ${isActive ? ACTIVE_BORDER_STYLE : INACTIVE_BORDER_STYLE}`}
      onClick={handleClick}
    >
      <div className='w-full'>
        <div className='flex justify-between items-center self-stretch w-full mb-[10px]'>
          <span className='text-title3 font-normal text-center'>{index + 1}</span>
          <ProblemTypeDropdown index={index} />
        </div>
        <Input
          control={control}
          name={`problems.${index}.context`}
          size='w-full h-[68px]'
          placeholder='질문을 입력하세요.'
          inputStyle='flex items-center p-[20px] rounded-[10px] border border-gray-20 focus:outline-none'
        />
      </div>
      <ChoiceItemContainer problemIndex={index} />
      <div className='flex justify-between items-center w-full'>
        <Answer problemIndex={index} />
        <RemoveProblemButton
          problemIndex={index}
          remove={remove}
        />
      </div>
    </div>
  );
}
