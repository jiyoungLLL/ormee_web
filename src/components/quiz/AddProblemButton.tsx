'use client';

import { DEFAULT_CHOICE_ITEM, DEFAULT_PROBLEM } from '@/constants/quiz.constants';
import { QuizFormValues } from '@/schemas/quiz.schema';
import { UseFieldArrayAppend } from 'react-hook-form';

type AddProblemButtonProps = {
  append: UseFieldArrayAppend<QuizFormValues, 'problems'>;
};

export default function AddProblemButton({ append }: AddProblemButtonProps) {
  const handleClick = () =>
    append({
      ...DEFAULT_PROBLEM,
      item: [{ text: DEFAULT_CHOICE_ITEM.text, id: `${crypto.randomUUID()}` }],
    });

  return (
    <button
      type='button'
      className='flex justify-center items-center w-[68px] h-[68px] rounded-full bg-white'
      onClick={handleClick}
    >
      <img
        src='/assets/icons/plus.png'
        alt='문제 추가하기'
        width={40}
        height={40}
        className='w-[40px] h-[40px]'
      />
    </button>
  );
}
