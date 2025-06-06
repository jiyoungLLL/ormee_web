'use client';

import XIcon from '@/components/icon/XIcon';
import Radio from '@/components/ui/radio/Radio';
import { QuizFormValues } from '@/features/quiz/quiz.types';
import { useFormContext } from 'react-hook-form';

type ChoiceItemInputProps = {
  problemIndex: number;
  itemIndex: number;
};

export default function ChoiceItemInput({ problemIndex, itemIndex }: ChoiceItemInputProps) {
  const { register, setValue, getValues, watch } = useFormContext<QuizFormValues>();

  const { id: itemId } = getValues(`problems.${problemIndex}.item.${itemIndex}`);

  const handleRemoveItem = () => {
    const currentItem = getValues(`problems.${problemIndex}.item`) || [];
    const newItem = currentItem.filter((_, idx) => idx !== itemIndex);
    setValue(`problems.${problemIndex}.item`, newItem);
  };

  const handleChangeAnswer = () => {
    setValue(`problems.${problemIndex}.answerItemId`, itemId);
  };

  const inputValues = watch(`problems.${problemIndex}.item.${itemIndex}.text`);
  const inputWidth = inputValues.length;

  return (
    <div className='flex items-center gap-[12px] w-full'>
      <Radio
        register={register}
        name={`problems.${problemIndex}.answerItemId`}
        htmlFor={itemId}
        value={itemId}
        onChange={handleChangeAnswer}
      />
      <input
        type='text'
        placeholder='선지를 입력하세요.'
        {...register(`problems.${problemIndex}.item.${itemIndex}.text`)}
        className={`h-[28px] text-body-reading text-gray-90 placeholder:text-gray-50 bg-transparent focus:outline-none disabled:text-label-assistive`}
        style={{
          width: `${inputWidth}ch`,
          minWidth: '140px',
          maxWidth: '100%',
        }}
      />
      <button
        type='button'
        onClick={handleRemoveItem}
      >
        <XIcon
          size={14}
          color='#696A7D'
        />
      </button>
    </div>
  );
}
