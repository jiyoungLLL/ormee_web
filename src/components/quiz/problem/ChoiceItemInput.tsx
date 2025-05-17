'use client';

import Input from '@/components/ui/Input';
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

  return (
    <Input
      control={control}
      name={`problems.${problemIndex}.item.${itemIndex}.text`}
      size='w-full h-[28px]'
      placeholder='선지를 입력하세요.'
      inputStyle='flex items-center bg-transparent focus:outline-none disabled:text-label-assistive'
    />
  );
}
