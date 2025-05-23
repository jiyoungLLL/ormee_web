'use client';

import QuestionSearch from '@/components/question/QuestionSearch';

export default function QuestionContainer() {
  return (
    <div className='flex flex-col gap-[10px] w-[1018px] h-[660px] px-[30px] py-[20px] rounded-[10px] bg-white'>
      <QuestionSearch />
    </div>
  );
}
