'use client';

import { Control, useFieldArray } from 'react-hook-form';
import RemoteButton from './RemoteButton';
import { QuizFormValues } from '@/schemas/quiz.schema';

type RemoteControllerProps = {
  control: Control<QuizFormValues>;
};

export default function RemoteController({ control }: RemoteControllerProps) {
  const { fields: problems } = useFieldArray({ control, name: 'problems' });

  return (
    <div className='flex justify-start items-center flex-wrap gap-[3px] p-[20px] w-full max-h-[142px] rounded-[15px] bg-white select-none overflow-y-auto'>
      {problems.map((problem, index) => (
        <RemoteButton
          key={problem.id}
          index={index}
        />
      ))}
    </div>
  );
}
