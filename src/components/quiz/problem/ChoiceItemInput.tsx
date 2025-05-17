'use client';

import { QuizFormValues } from '@/schemas/quiz.schema';
import { useFieldArray, useFormContext } from 'react-hook-form';

type ChoiceItemInputProps = {
  problemIndex: number;
  itemIndex: number;
};

export default function ChoiceItemInput({ problemIndex, itemIndex }: ChoiceItemInputProps) {
  const { control } = useFormContext<QuizFormValues>();
  const { fields: itemFields, update } = useFieldArray({
    control,
    name: `problems.${problemIndex}.item`,
  });

  const { text } = itemFields[itemIndex];

  return <div>{text}</div>;
}
