'use client';

import Input from '@/components/ui/Input';
import Radio from '@/components/ui/radio/Radio';
import { QuizFormValues } from '@/schemas/quiz.schema';
import { useFieldArray, useFormContext } from 'react-hook-form';

type ChoiceItemInputProps = {
  problemIndex: number;
  itemIndex: number;
};

export default function ChoiceItemInput({ problemIndex, itemIndex }: ChoiceItemInputProps) {
  const { control, register } = useFormContext<QuizFormValues>();
  const { fields: problemFields } = useFieldArray({
    control,
    name: `problems`,
  });

  const item = problemFields[problemIndex].item[itemIndex].text;

  return (
    <div className='flex items-center gap-[12px] w-full'>
      <Radio
        register={register}
        name={`problems.${problemIndex}.answer`}
        htmlFor={`radio-${problemIndex}-${itemIndex}`}
        value={item}
      />
      <Input
        control={control}
        name={`problems.${problemIndex}.item.${itemIndex}.text`}
        size='flex-1 w-full h-[28px]'
        placeholder='선지를 입력하세요.'
        inputStyle='flex items-center bg-transparent focus:outline-none disabled:text-label-assistive'
      />
    </div>
  );
}
