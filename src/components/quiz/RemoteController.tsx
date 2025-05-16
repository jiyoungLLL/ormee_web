'use client';

import { FieldArrayWithId } from 'react-hook-form';
import RemoteButton from './RemoteButton';
import { QuizFormValues } from '@/schemas/quiz.schema';

type RemoteControllerProps = {
  problemFields: FieldArrayWithId<QuizFormValues, 'problems', 'id'>[];
};

export default function RemoteController({ problemFields }: RemoteControllerProps) {
  return (
    <div className='flex justify-start items-center flex-wrap gap-[3px] p-[20px] w-full max-h-[142px] rounded-[15px] bg-white select-none overflow-y-auto'>
      {problemFields.map((problem, index) => (
        <RemoteButton
          key={problem.id}
          index={index}
        />
      ))}
    </div>
  );
}
