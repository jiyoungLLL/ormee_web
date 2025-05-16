'use client';

import { DEFAULT_PROBLEM } from '@/constants/quiz.constants';
import { QuizFormValues } from '@/schemas/quiz.schema';
import { UseFieldArrayAppend } from 'react-hook-form';

type AddProblemButtonProps = {
  append: UseFieldArrayAppend<QuizFormValues, 'problems'>;
};

export default function AddProblemButton({ append }: AddProblemButtonProps) {
  const handleClick = () => append(DEFAULT_PROBLEM);

  return (
    <button
      type='button'
      className='w-[68px] h-[68px] rounded-full bg-white bg-contain bg-no-repeat bg-center'
      style={{
        backgroundImage: 'url(/assets/icons/plus.png)',
      }}
      onClick={handleClick}
    />
  );
}
