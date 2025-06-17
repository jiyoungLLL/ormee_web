'use client';

import { QuizFormSchema } from '@/features/quiz/schemas/quiz.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, Path, useFieldArray, useForm } from 'react-hook-form';
import QuizCreateTitleInput from '@/components/quiz/QuizCreateTitleInput';
import RemoteController from '@/components/quiz/RemoteController';
import ProblemInput from '@/components/quiz/ProblemInput';
import AddProblemButton from '@/components/quiz/AddProblemButton';
import {
  DEFAULT_CHOICE_ITEM,
  DEFAULT_PROBLEM,
  QUIZ_LIMIT_TIME_MAP,
  QUIZ_LIMIT_TIME_OPTIONS,
} from '@/features/quiz/quiz.constants';
import Toolbar from '../ui/Toolbar';
import { useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import QuizCreateHeader from '@/components/quiz/QuizCreateHeader';
import { QuizCreateRequest, QuizDraftRequest, QuizFormValues } from '@/features/quiz/types/quiz.types';
import { useQuizEditMode } from '@/features/quiz/hooks/useQuizEditMode';
import { usePostQuizCreate, usePostQuizDraft } from '@/features/quiz/hooks/usePostQuiz';
import { useLectureId } from '@/hooks/queries/useLectureId';

export default function QuizCreateForm() {
  const { isEditMode, quizDetail } = useQuizEditMode();

  const methods = useForm<QuizFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      description: '',
      startTime: '',
      dueTime: '',
      limitTime: '',
      problems: [{ ...DEFAULT_PROBLEM, item: [{ text: DEFAULT_CHOICE_ITEM.text, id: 'initial-item-id' }] }],
    },
    resolver: zodResolver(QuizFormSchema),
  });

  useEffect(() => {
    if (isEditMode && quizDetail) {
      const { id, ...rest } = quizDetail;
      methods.reset(rest);
    }
  }, [isEditMode, quizDetail]);

  const { control, setValue, getValues } = methods;

  const { fields: problems, append } = useFieldArray({ control, name: 'problems' });
  const [editor, setEditor] = useState<Editor | null>(null);
  const [currentFileName, setCurrentFileName] = useState<Path<QuizFormValues> | null>(null);

  const handleSetEditor = (editor: Editor | null, fileName: Path<QuizFormValues> | null) => {
    setEditor(editor);
    setCurrentFileName(fileName);
  };

  const lectureId = useLectureId();
  const { mutate: createQuiz } = usePostQuizCreate({ lectureId });
  const { mutate: draftQuiz } = usePostQuizDraft({ lectureId });

  const createSubmitValues = (isDraft: boolean): QuizCreateRequest | QuizDraftRequest => {
    const formValues = getValues();

    return {
      isDraft,
      title: formValues.title,
      description: formValues.description || '',
      openTime: formValues.startTime ? new Date(formValues.startTime).toISOString() : '',
      dueTime: formValues.dueTime ? new Date(formValues.dueTime).toISOString() : '',
      timeLimit: QUIZ_LIMIT_TIME_MAP[formValues.limitTime as (typeof QUIZ_LIMIT_TIME_OPTIONS)[number]] || '',
      problems: formValues.problems.map((problem) =>
        problem.type === 'CHOICE'
          ? {
              type: 'CHOICE' as const,
              content: problem.content,
              answer: problem.answer,
              items: problem.item.map((item) => item.text),
              fileIds: problem.files.map((file) => file.id),
            }
          : {
              type: 'ESSAY' as const,
              content: problem.content,
              answer: problem.answer,
              items: null,
              fileIds: problem.files.map((file) => file.id),
            },
      ),
    };
  };

  const handleRegister = () => {
    const submitValues = createSubmitValues(false) as QuizCreateRequest;
    createQuiz(submitValues);
  };

  const handleTemporarySave = () => {
    const submitValues = createSubmitValues(true) as QuizDraftRequest;
    draftQuiz(submitValues);
  };

  return (
    <>
      <QuizCreateHeader
        onTemporarySave={handleTemporarySave}
        onRegister={handleRegister}
      />
      <div className='flex justify-center items-start gap-[30px] w-full'>
        <div className='sticky top-[30px] flex flex-col gap-[20px] min-w-[212px]'>
          <Toolbar
            editor={editor}
            enableImage={true}
            imageUploadConfig={{
              strategy: 'IMMEDIATE_UPLOAD',
              onImageUpload: (_, id, previewUrl) => {
                if (!currentFileName) return;

                setValue(currentFileName, [...((getValues(currentFileName) as any[]) || []), { id, previewUrl }]);
              },
            }}
            enableList={false}
            containerStyle='flex justify-between items-center gap-[10px] w-full px-[30px] py-[10px] rounded-[20px] bg-white'
          />
          <RemoteController problemFields={problems} />
        </div>
        <div className='flex-1 flex flex-col justify-start items-center gap-[26px]'>
          <FormProvider {...methods}>
            <form className='flex flex-col justify-start items-center gap-[26px] w-full h-full'>
              <QuizCreateTitleInput setEditor={setEditor} />
              {problems.map((problem, index) => (
                <ProblemInput
                  key={problem.id}
                  problem={problem}
                  index={index}
                  setEditor={handleSetEditor}
                />
              ))}
            </form>
          </FormProvider>
          <AddProblemButton append={append} />
        </div>
      </div>
    </>
  );
}
