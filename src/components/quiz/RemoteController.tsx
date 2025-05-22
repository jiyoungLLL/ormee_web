'use client';

import { FieldArrayWithId } from 'react-hook-form';
import RemoteButton from './RemoteButton';
import { QuizFormValues } from '@/types/quiz.types';

type RemoteControllerProps = {
  problemFields: FieldArrayWithId<QuizFormValues, 'problems', 'id'>[];
};

export default function RemoteController({ problemFields }: RemoteControllerProps) {
  return (
    <div className='w-full p-[20px] rounded-[15px] bg-white select-none'>
      <div
        className='flex justify-start items-center flex-wrap gap-[3px] max-h-[calc(142px-40px)] overflow-y-auto
      '
      >
        {problemFields.map((problem, index) => (
          <RemoteButton
            key={problem.id}
            problem={problem}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
