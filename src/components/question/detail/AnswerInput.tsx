'use client';

import Input from '@/components/ui/Input';
import { AnswerFormValues } from '@/features/question/types/answer.types';
import { Control } from 'react-hook-form';

type AnswerInputProps = {
  control: Control<AnswerFormValues>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AnswerInput({ control, handleImageUpload }: AnswerInputProps) {
  return (
    <Input
      control={control}
      name='content'
      placeholder='답변을 작성해주세요'
      size='w-full h-[50px]'
      inputStyle='pl-[20px] pr-[56px] py-[15px] rounded-[10px] border-[1px] border-gray-20 focus:border-[1px] focus:border-purple-50 focus:outline-none disabled:bg-gray-10'
    >
      <label
        htmlFor='file-upload'
        className='absolute right-[20px] top-[50%] transform -translate-y-1/2 w-[24px] h-[24px] bg-center bg-no-repeat bg-contain cursor-pointer'
        style={{
          backgroundImage: 'url(/assets/icons/tiptapTools/image.png)',
        }}
      >
        <input
          id='file-upload'
          type='file'
          className='hidden'
          accept='image/*'
          onChange={handleImageUpload}
        />
      </label>
    </Input>
  );
}
