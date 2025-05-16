'use client';

import { QuizFormSchema, QuizFormValues } from '@/schemas/quiz.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import QuizCreateTitleInput from './QuizCreateTitleInput';

export default function QuizCreateForm() {
  const { control } = useForm<QuizFormValues>({
    defaultValues: {
      title: '',
      dueTime: '',
      limitTime: '',
      problems: [
        {
          context: '',
          description: '',
          type: 'choice',
          item: ['선지 1'],
          answer: '',
        },
      ],
    },
    resolver: zodResolver(QuizFormSchema),
  });

  return (
    <div className='flex justify-center items-start gap-[30px] w-full'>
      <div className='w-[390px] bg-blue-300'>툴박스, 리모컨 영역</div>
      <div className='flex flex-col justify-start items-center gap-[26px] w-full bg-purple-35'>
        <QuizCreateTitleInput
          control={control}
          name='title'
        />
      </div>
    </div>
  );
}
