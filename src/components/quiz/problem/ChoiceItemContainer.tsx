'use client';

import { QuizFormValues } from '@/schemas/quiz.schema';
import { useFieldArray, useFormContext } from 'react-hook-form';
import ChoiceItemInput from './ChoiceItemInput';
import AddChoiceButton from './AddChoiceButton';
import { Editor } from '@tiptap/react';

type ChoiceItemContainerProps = {
  problemIndex: number;
  setEditor: (editor: Editor | null) => void;
};

export default function ChoiceItemContainer({ problemIndex, setEditor }: ChoiceItemContainerProps) {
  const { control } = useFormContext<QuizFormValues>();
  const { fields: itemFields } = useFieldArray<QuizFormValues>({
    control,
    name: `problems.${problemIndex}.item`,
  });

  return (
    <div className='flex flex-col justify-start items-start gap-[12px] w-full p-[20px] bg-gray-10 rounded-[10px]'>
      {itemFields.map((item, index) => (
        <ChoiceItemInput
          key={`${item.id}`}
          problemIndex={problemIndex}
          itemIndex={index}
          setEditor={setEditor}
        />
      ))}
      <AddChoiceButton problemIndex={problemIndex} />
    </div>
  );
}
