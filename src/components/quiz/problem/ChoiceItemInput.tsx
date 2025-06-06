'use client';

import XIcon from '@/components/icon/XIcon';
import Radio from '@/components/ui/radio/Radio';
import { QuizFormValues } from '@/features/quiz/quiz.types';
import { useFormContext } from 'react-hook-form';
import { useRef, useEffect, useState } from 'react';

type ChoiceItemInputProps = {
  problemIndex: number;
  itemIndex: number;
};

export default function ChoiceItemInput({ problemIndex, itemIndex }: ChoiceItemInputProps) {
  const { register, setValue, getValues, watch } = useFormContext<QuizFormValues>();
  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState(140);

  const { id: itemId } = getValues(`problems.${problemIndex}.item.${itemIndex}`);
  const inputValue = watch(`problems.${problemIndex}.item.${itemIndex}.text`) || '';

  useEffect(() => {
    if (spanRef.current) {
      const textWidth = spanRef.current.getBoundingClientRect().width;
      const calculatedWidth = textWidth + 10;
      setInputWidth(calculatedWidth);
    }
  }, [inputValue]);

  const handleRemoveItem = () => {
    const currentItem = getValues(`problems.${problemIndex}.item`) || [];
    const newItem = currentItem.filter((_, idx) => idx !== itemIndex);
    setValue(`problems.${problemIndex}.item`, newItem);
  };

  const handleChangeAnswer = () => {
    setValue(`problems.${problemIndex}.answerItemId`, itemId);
  };

  return (
    <div className='flex items-center gap-[12px] w-full'>
      <Radio
        register={register}
        name={`problems.${problemIndex}.answerItemId`}
        htmlFor={itemId}
        value={itemId}
        onChange={handleChangeAnswer}
      />
      {/* 숨겨진 span, 텍스트 너비 측정용 */}
      <span
        ref={spanRef}
        className='h-[28px] text-body-reading text-gray-90 bg-transparent absolute pointer-events-none opacity-0 whitespace-pre'
      >
        {inputValue || '선지를 입력하세요.'}
      </span>
      <input
        type='text'
        placeholder='선지를 입력하세요.'
        {...register(`problems.${problemIndex}.item.${itemIndex}.text`)}
        className='h-[28px] text-body-reading text-gray-90 placeholder:text-gray-50 bg-transparent focus:outline-none disabled:text-label-assistive'
        style={{
          width: `${inputWidth}px`,
          maxWidth: '100%',
        }}
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
