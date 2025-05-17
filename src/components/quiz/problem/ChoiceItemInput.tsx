'use client';

import XIcon from '@/components/icon/XIcon';
import Input from '@/components/ui/Input';
import Radio from '@/components/ui/radio/Radio';
import { QuizFormValues } from '@/schemas/quiz.schema';
import { useFieldArray, useFormContext } from 'react-hook-form';

type ChoiceItemInputProps = {
  problemIndex: number;
  itemIndex: number;
};

export default function ChoiceItemInput({ problemIndex, itemIndex }: ChoiceItemInputProps) {
  const { control, register, setValue, getValues } = useFormContext<QuizFormValues>();

  const { fields: itemFields } = useFieldArray({
    control,
    name: `problems.${problemIndex}.item`,
  });

  const item = itemFields[itemIndex]?.text ?? '';

  const handleRemoveItem = () => {
    const currentItem = getValues(`problems.${problemIndex}.item`) || [];
    const newItem = currentItem.filter((_, idx) => idx !== itemIndex);
    setValue(`problems.${problemIndex}.item`, newItem);
  };

  return (
    <div className='flex items-center gap-[12px] w-full'>
      <Radio
        register={register}
        name={`problems.${problemIndex}.answer`}
        htmlFor={`itemFields.${itemIndex}.id`}
        value={item}
      />
      <Input
        control={control}
        name={`problems.${problemIndex}.item.${itemIndex}.text`}
        size='flex-1 w-full h-[28px]'
        placeholder='선지를 입력하세요.'
        inputStyle='flex items-center bg-transparent focus:outline-none disabled:text-label-assistive'
      />
      <button
        type='button'
        onClick={handleRemoveItem}
      >
        <XIcon
          size={14}
          color='#696A7D'
        />
      </button>
    </div>
  );
}
