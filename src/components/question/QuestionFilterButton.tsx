'use client';

import { QuestionListFilterType, useQuestionSearchParams } from '@/features/question/hooks/useQuestionSearchParams';

type QuestionFilterButtonProps = {
  type: QuestionListFilterType;
};

export default function QuestionFilterButton({ type }: QuestionFilterButtonProps) {
  const { filter, setFilter } = useQuestionSearchParams();
  const isSelected = filter === type;

  const handleClick = () => {
    setFilter(type);
  };

  return (
    <button
      type='button'
      className={`${isSelected ? 'border-gray-70 bg-gray-70 font-semibold text-white' : 'border-gray-30 bg-transparent font-normal text-gray-60'} flex items-center px-[20px] py-[12px] border rounded-[25px] text-headline2`}
      onClick={handleClick}
    >
      {type}
    </button>
  );
}
