'use client';

import XIcon from '@/components/icon/XIcon';
import Radio from '@/components/ui/radio/Radio';
import { QuizFormValues } from '@/features/quiz/types/quiz.types';
import { useFormContext } from 'react-hook-form';
import DynamicWidthInput from '@/components/ui/inputs/DynamicWidthInput';

type ChoiceItemInputProps = {
  problemIndex: number;
  itemIndex: number;
};

const MAX_WIDTH = 877;

export default function ChoiceItemInput({ problemIndex, itemIndex }: ChoiceItemInputProps) {
  const { register, setValue, getValues } = useFormContext<QuizFormValues>();

  const { id: itemId } = getValues(`problems.${problemIndex}.item.${itemIndex}`);

  const handleRemoveItem = () => {
    const currentItem = getValues(`problems.${problemIndex}.item`) || [];

    if (currentItem.length <= 1) return;

    const newItem = currentItem.filter((_, idx) => idx !== itemIndex);
    setValue(`problems.${problemIndex}.item`, newItem);
  };

  const handleChangeAnswer = () => {
    setValue(`problems.${problemIndex}.answer`, getValues(`problems.${problemIndex}.item.${itemIndex}.text`));
    setValue(`problems.${problemIndex}.answerItemId`, itemId);
  };

  return (
    <div className='flex items-center gap-[12px] w-full min-w-0'>
      <Radio
        register={register}
        name={`problems.${problemIndex}.answerItemId`}
        htmlFor={itemId}
        value={itemId}
        onChange={handleChangeAnswer}
      />
      <DynamicWidthInput
        name={`problems.${problemIndex}.item.${itemIndex}.text`}
        placeholder='선지를 입력하세요.'
        inputStyle='h-[28px] text-body-reading text-gray-90 placeholder:text-gray-50 bg-transparent focus:outline-none disabled:text-label-assistive min-w-0 flex-shrink'
        maxWidth={MAX_WIDTH}
      />
      <button
        type='button'
        onClick={handleRemoveItem}
        className='flex-shrink-0'
      >
        <XIcon
          size={14}
          color='#696A7D'
        />
      </button>
    </div>
  );
}
