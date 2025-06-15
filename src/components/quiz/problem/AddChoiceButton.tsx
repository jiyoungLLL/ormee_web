'use client';

import { DEFAULT_CHOICE_ITEM } from '@/features/quiz/quiz.constants';
import { QuizFormValues } from '@/features/quiz/types/quiz.types';
import { useFormContext } from 'react-hook-form';

type AddChoiceButtonProps = {
  problemIndex: number;
};

export default function AddChoiceButton({ problemIndex }: AddChoiceButtonProps) {
  const { setValue, getValues } = useFormContext<QuizFormValues>();

  const handleAddChoiceItem = () => {
    const currentItem = getValues(`problems.${problemIndex}.item`) || [];
    const newItem = { ...DEFAULT_CHOICE_ITEM, id: crypto.randomUUID() };
    setValue(`problems.${problemIndex}.item`, [...currentItem, newItem]);
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
