import { QuizFormValues } from '@/features/quiz/types/quiz.types';
import { useActiveProblemStore } from '@/features/quiz/activeProblemStore';
import { FieldArrayWithId, Path, useFormContext } from 'react-hook-form';
import ProblemTypeDropdown from '@/components/quiz/problem/ProblemTypeDropdown';
import ChoiceItemContainer from '@/components/quiz/problem/ChoiceItemContainer';
import ChoiceAnswer from '@/components/quiz/problem/ChoiceAnswer';
import RemoveProblemButton from '@/components/quiz/problem/RemoveProblemButton';
import TipTapField from '@/components/ui/TipTapField';
import { Editor } from '@tiptap/react';
import ProblemImagePreview from '@/components/quiz/problem/ProblemImagePreview';
import EssayAnswerInput from '@/components/quiz/problem/EssayAnswerInput';

type ProblemInputProps = {
  /** useFieldArray의 fields에서 가져온 problem 데이터 */
  problem: FieldArrayWithId<QuizFormValues, 'problems', 'id'>;
  /** problem의 index */
  index: number;
  /** Toolbar에 에디터, react-hook-form의 file 경로를 세팅할 함수 */
  setEditor: (editor: Editor | null, fileName: Path<QuizFormValues> | null) => void;
};

const ACTIVE_BORDER_STYLE = 'border-purple-50';
const INACTIVE_BORDER_STYLE = 'border-white';

export default function ProblemInput({ problem, index, setEditor }: ProblemInputProps) {
  const { activeProblemId, handleClickProblem } = useActiveProblemStore();
  const { control, watch } = useFormContext<QuizFormValues>();
  const isActive = activeProblemId === problem.id;

  const problemType = watch(`problems.${index}.type`);

  return (
    <div
      className={`flex flex-col justify-start items-start w-full px-[30px] py-[20px] gap-[24px] rounded-[10px] bg-white box-border border ${isActive ? ACTIVE_BORDER_STYLE : INACTIVE_BORDER_STYLE}`}
    >
      <div className='w-full'>
        <div className='flex justify-between items-center self-stretch w-full mb-[10px]'>
          <span className='text-title3 font-normal text-center'>{index + 1}</span>
          <ProblemTypeDropdown index={index} />
        </div>
        <ProblemImagePreview fileName={`problems.${index}.files`} />
        <TipTapField
          control={control}
          name={`problems.${index}.content`}
          fileName={`problems.${index}.files`}
          placeholder='질문을 입력하세요.'
          size='w-full min-h-[50px]'
          fieldStyle='p-[20px] rounded-[10px] border border-gray-20 focus:outline-none'
          placeholderStyle='placeholder-pl-20'
          setEditor={setEditor}
          onFocus={() => handleClickProblem(problem.id)}
        />
      </div>
      {problemType === 'CHOICE' && <ChoiceItemContainer problemIndex={index} />}
      <div className='flex justify-between items-center w-full'>
        {problemType === 'CHOICE' && <ChoiceAnswer problemIndex={index} />}
        {problemType === 'ESSAY' && <EssayAnswerInput problemIndex={index} />}
        <RemoveProblemButton problemIndex={index} />
      </div>
    </div>
  );
}
