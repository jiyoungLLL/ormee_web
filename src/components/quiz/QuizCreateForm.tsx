'use client';

import { QuizFormSchema, QuizFormValues } from '@/schemas/quiz.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import QuizCreateTitleInput from './QuizCreateTitleInput';
import RemoteController from './RemoteController';
import ProblemInput from './ProblemInput';
import AddProblemButton from './AddProblemButton';
export default function QuizCreateForm() {
  const methods = useForm<QuizFormValues>({
    defaultValues: {
      title: '',
      dueTime: '',
      limitTime: '',
      problems: [
        // TODO: 문제 초기값 contants 파일에서 가져오기
        {
          context: '테스트용 제목',
          description: '테스트용 설명',
          type: 'choice',
          item: ['선지 1'],
          answer: '',
        },
      ],
    },
    resolver: zodResolver(QuizFormSchema),
  });

  const { control } = methods;

  const { fields: problems, append } = useFieldArray({ control, name: 'problems' });

  return (
    <div className='flex justify-center items-start gap-[30px] w-full'>
      <div className='w-[390px] bg-blue-300'>
        <div>툴박스</div>
        <RemoteController problemFields={problems} />
      </div>
      <div className='flex flex-col justify-start items-center gap-[26px] w-full bg-purple-35'>
        <QuizCreateTitleInput
          control={control}
          name='title'
        />
        {problems.map((problem, index) => (
          <ProblemInput
            key={problem.id}
            problem={problem}
            index={index}
          />
        ))}
        <AddProblemButton append={append} />
      </div>
    </div>
  );
}
