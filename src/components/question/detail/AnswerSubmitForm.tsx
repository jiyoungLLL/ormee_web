'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useForm } from 'react-hook-form';

export default function AnswerSubmitForm() {
  const { control, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      answer: '',
    },
  });

  const handleAnswerSubmit = (data: { answer: string }) => {
    alert(data.answer);
  };

  return (
    <form
      onSubmit={handleSubmit(handleAnswerSubmit)}
      className='flex items-center gap-[20px]'
    >
      <Input
        control={control}
        name='answer'
        placeholder='답변을 작성해주세요'
        size='w-full h-[50px]'
        inputStyle='pl-[20px] pr-[56px] py-[15px] rounded-[10px] border-[1px] border-gray-20 focus:border-[1px] focus:border-purple-50 focus:outline-none disabled:bg-gray-10'
      >
        <button
          type='button'
          className='absolute right-[20px] top-[50%] transform -translate-y-1/2 w-[24px] h-[24px] bg-center bg-no-repeat bg-contain'
          style={{
            backgroundImage: 'url(/assets/icons/tiptapTools/image.png)',
          }}
        />
      </Input>
      <Button
        type='BUTTON_BASE_TYPE'
        title='답변하기'
        htmlType='submit'
        size='w-[102px] h-[50px]'
        isPurple
        isfilled
        font='text-headline1 font-bold'
      />
    </form>
  );
}
