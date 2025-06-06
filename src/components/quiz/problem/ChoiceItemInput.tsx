'use client';

import XIcon from '@/components/icon/XIcon';
import Radio from '@/components/ui/radio/Radio';
import { QuizFormValues } from '@/features/quiz/quiz.types';
import { useFormContext } from 'react-hook-form';
import { useRef, useEffect, useState } from 'react';
import { useActiveProblemStore } from '@/features/quiz/activeProblemStore';

type ChoiceItemInputProps = {
  problemIndex: number;
  problemId: string;
  itemIndex: number;
};

export default function ChoiceItemInput({ problemIndex, problemId, itemIndex }: ChoiceItemInputProps) {
  const { register, setValue, getValues, watch } = useFormContext<QuizFormValues>();
  const spanRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputWidth, setInputWidth] = useState(140);

  const { id: itemId } = getValues(`problems.${problemIndex}.item.${itemIndex}`);
  const inputValue = watch(`problems.${problemIndex}.item.${itemIndex}.text`) || '';

  useEffect(() => {
    if (spanRef.current && containerRef.current) {
      const textWidth = spanRef.current.getBoundingClientRect().width;
      const containerWidth = containerRef.current.getBoundingClientRect().width;

      // Radio(20px) + gap(12px) + XIcon(14px) + gap(12px) + 여유공간(20px) = 78px
      const availableWidth = containerWidth - 78;
      const calculatedWidth = Math.min(textWidth + 10, availableWidth);
      const finalWidth = Math.max(calculatedWidth, 140);

      setInputWidth(finalWidth);
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

  const { handleClickProblem } = useActiveProblemStore();

  return (
    <div
      ref={containerRef}
      className='flex items-center gap-[12px] w-full min-w-0'
      onClick={() => handleClickProblem(problemId)}
    >
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
        className='h-[28px] text-body-reading text-gray-90 placeholder:text-gray-50 bg-transparent focus:outline-none disabled:text-label-assistive min-w-0 flex-shrink'
        style={{
          width: `${inputWidth}px`,
        }}
      />
      <button
        type='button'
        onClick={handleRemoveItem}
        className='flex-shrink-0'
      >
        <XIcon
          size={14}
          color='#696A7D'
        />
      </button>
    </div>
  );
}
