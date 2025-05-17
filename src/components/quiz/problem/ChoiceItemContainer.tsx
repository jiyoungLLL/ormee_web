'use client';

import { QuizFormValues } from '@/schemas/quiz.schema';
import { useFieldArray, useFormContext } from 'react-hook-form';
import ChoiceItemInput from './ChoiceItemInput';

type ChoiceItemContainerProps = {
  problemIndex: number;
};

export default function ChoiceItemContainer({ problemIndex }: ChoiceItemContainerProps) {
  const { control } = useFormContext<QuizFormValues>();
  const { fields: itemFields } = useFieldArray<QuizFormValues>({
    control,
    name: `problems.${problemIndex}.item`,
  });

  return (
    <div className='flex flex-col justify-start items-start gap-[12px] w-full p-[20px] bg-gray-10 rounded-[10px]'>
      {itemFields.map((_, index) => (
        <ChoiceItemInput
          key={`choice-item-${index}`}
          problemIndex={problemIndex}
          itemIndex={index}
        />
      ))}
    </div>
  );
}
