'use client';

import { QuizFormSchema, QuizFormValues } from '@/schemas/quiz.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import QuizCreateTitleInput from './QuizCreateTitleInput';
import RemoteController from './RemoteController';
import ProblemInput from './ProblemInput';
import AddProblemButton from './AddProblemButton';
import { DEFAULT_CHOICE_ITEM, DEFAULT_PROBLEM } from '@/constants/quiz.constants';
import Toolbar from '../ui/Toolbar';
import { useState } from 'react';
import { Editor } from '@tiptap/react';

export default function QuizCreateForm() {
  const methods = useForm<QuizFormValues>({
    defaultValues: {
      title: '',
      description: '',
      dueTime: '',
      limitTime: '',
      problems: [{ ...DEFAULT_PROBLEM, item: [{ text: DEFAULT_CHOICE_ITEM.text, id: 'initial-item-id' }] }],
    },
    resolver: zodResolver(QuizFormSchema),
  });

  const { control } = methods;

  const { fields: problems, append, remove } = useFieldArray({ control, name: 'problems' });
  const [editor, setEditor] = useState<Editor | null>(null);

  return (
    <div className='flex justify-center items-start gap-[30px] w-full'>
      <div className='flex flex-col gap-[20px] w-[390px]'>
        <Toolbar
          editor={editor}
          enableImage={true}
          containerStyle='flex justify-center items-center gap-[20px] w-full px-[30px] py-[10px] rounded-[20px] bg-white'
        />
        <RemoteController problemFields={problems} />
      </div>
      <div className='flex-1 flex flex-col justify-start items-center gap-[26px]'>
        <FormProvider {...methods}>
          <form className='flex flex-col justify-start items-center gap-[26px] w-full h-full'>
            <QuizCreateTitleInput
              control={control}
              name='title'
              setEditor={setEditor}
            />
            {problems.map((problem, index) => (
              <ProblemInput
                key={problem.id}
                problem={problem}
                index={index}
                remove={remove}
                setEditor={setEditor}
              />
            ))}
          </form>
        </FormProvider>
        <AddProblemButton append={append} />
      </div>
    </div>
  );
}
