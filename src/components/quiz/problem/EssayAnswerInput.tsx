'use client';

import Badge from '@/components/ui/Badge';
import DynamicWidthInput from '@/components/ui/inputs/DynamicWidthInput';

type EssayAnswerInputProps = {
  problemIndex: number;
};

export default function EssayAnswerInput({ problemIndex }: EssayAnswerInputProps) {
  return (
    <div className='flex items-center gap-[15px]'>
      <Badge
        label='정답'
        size='medium'
        color='purple'
      />
      <DynamicWidthInput
        name={`problems.${problemIndex}.answer`}
        placeholder='정답 입력'
        inputStyle={`text-headline1 underline decoration-solid decoration-auto underline-offset-[2px] bg-transparent text-purple-40 decoration-purple-40 font-semibold placeholder:text-gray-60 placeholder:decoration-gray-60 placeholder:font-normal placeholder:underline focus:outline-none`}
        minWidth={150}
        maxWidth={877}
      />
    </div>
  );
}
