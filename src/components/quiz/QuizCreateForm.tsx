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
import { useCallback, useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import QuizCreateHeader from '@/components/quiz/QuizCreateHeader';
import { QuizCreateRequest, QuizDraftRequest, QuizFormValues } from '@/features/quiz/types/quiz.types';
import { useQuizEditMode } from '@/features/quiz/hooks/useQuizEditMode';
import { usePostQuizCreate, usePostQuizDraft } from '@/features/quiz/hooks/usePostQuiz';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { useToastStore } from '@/stores/toastStore';
import { usePutQuizDetail } from '@/features/quiz/hooks/usePutQuizState';
import Modal from '@/components/ui/Modal';
import { useConfirmModal } from '@/hooks/ui/useConfirmModal';

export default function QuizCreateForm() {
  const { isEditMode, quizDetail } = useQuizEditMode();
  const { addToast } = useToastStore();

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

  const { control, setValue, getValues } = methods;
  const { fields: problems, append, replace } = useFieldArray({ control, name: 'problems' });

  useEffect(() => {
    if (isEditMode && quizDetail) {
      const { id, ...rest } = quizDetail;
      methods.reset(rest);
      replace(quizDetail.problems);
    }
  }, [isEditMode, quizDetail, quizDetail.problems.length, methods.reset, replace]);

  const [editor, setEditor] = useState<Editor | null>(null);
  const [currentFileName, setCurrentFileName] = useState<Path<QuizFormValues> | null>(null);

  const handleSetEditor = useCallback((editor: Editor | null, fileName: Path<QuizFormValues> | null) => {
    setEditor(editor);
    setCurrentFileName(fileName);
  }, []);

  const lectureId = useLectureId();
  const { mutate: createQuiz } = usePostQuizCreate({ lectureId });
  const { mutate: draftQuiz } = usePostQuizDraft({ lectureId });
  const { mutate: editQuiz } = usePutQuizDetail({ lectureId, quizId: quizDetail?.id });

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
              fileIds: problem.files.map((file) => {
                const fileIdMatch = file.id.match(/^files-\d+-(\d+)$/);
                return fileIdMatch ? Number(fileIdMatch[1]) : Number(file.id);
              }),
            }
          : {
              type: 'ESSAY' as const,
              content: problem.content,
              answer: problem.answer,
              items: null,
              fileIds: problem.files.map((file) => {
                const fileIdMatch = file.id.match(/^files-\d+-(\d+)$/);
                return fileIdMatch ? Number(fileIdMatch[1]) : Number(file.id);
              }),
            },
      ),
    };
  };

  const {
    isOpen: isEditConfirmModalOpen,
    showConfirm: showEditConfirm,
    handleConfirm: handleEditConfirm,
    handleCancel: handleEditCancel,
  } = useConfirmModal();

  const handleRegister = async () => {
    const submitValues = createSubmitValues(false) as QuizCreateRequest;

    if (isEditMode) {
      const confirmed = await showEditConfirm();

      if (confirmed) {
        editQuiz(submitValues);
      }
    } else {
      createQuiz(submitValues);
    }
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
              onImageUploadError: (error) => {
                addToast({
                  type: 'error',
                  message: `${error.message}`,
                });
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
      <Modal
        isOpen={isEditConfirmModalOpen}
        onCancel={handleEditCancel}
        onConfirm={handleEditConfirm}
        title='퀴즈를 수정하시겠어요?'
        description='이전 상태로 되돌릴 수 없어요.'
        iconSrc='/assets/icons/checked.png'
      />
    </>
  );
}
