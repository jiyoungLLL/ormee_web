'use client';

import { DEFAULT_CHOICE_ITEM } from '@/constants/quiz.constants';
import { QuizFormValues } from '@/schemas/quiz.schema';
import { useFieldArray, useFormContext } from 'react-hook-form';

type AddChoiceButtonProps = {
  problemIndex: number;
};

export default function AddChoiceButton({ problemIndex }: AddChoiceButtonProps) {
  const { setValue, getValues } = useFormContext<QuizFormValues>();

  const handleAddChoiceItem = () => {
    const currentItem = getValues(`problems.${problemIndex}.item`) || [];
    setValue(`problems.${problemIndex}.item`, [...currentItem, DEFAULT_CHOICE_ITEM]);
  };

  return (
    <button
      type='button'
      onClick={handleAddChoiceItem}
      className='flex items-center gap-[10px]'
    >
      <img
        src='/assets/icons/plus.png'
        alt='선지 추가 버튼'
        className='w-[28px] h-[28px]'
      />
      <span className='text-headline1 font-normal text-gray-60 underline decoration-gray-60 decoration-solid decoration-auto underline-offset-[2px]'>
        선지추가
      </span>
    </button>
  );
}
