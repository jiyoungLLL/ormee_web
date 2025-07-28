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
import { formatToUTCString } from '@/utils/date/formatDate';
import { useSearchParams } from 'next/navigation';
import { useGetQuizDetail } from '@/features/quiz/hooks/useGetQuizDetail';
import { QuizDetailResponse } from '@/features/quiz/types/quizDetail.types';

const convertQuizDataToFormValues = (quizData: QuizDetailResponse): QuizFormValues => {
  return {
    title: quizData.title || '',
    description: quizData.description || '',
    startTime: '',
    dueTime: '',
    limitTime: '',
    problems: quizData.problems.map((problem) => ({
      type: problem.type,
      content: problem.content,
      item:
        problem.items?.map((text, index) => ({
          id: `item-${index}`,
          text,
        })) || [],
      answer: problem.answer,
      answerItemId: '',
      files:
        problem.filePaths?.map((url, index) => ({
          id: `file-${index}`,
          previewUrl: url || '',
        })) || [],
    })),
  };
};

export default function QuizCreateForm() {
  const { isEditMode, quizDetail } = useQuizEditMode();
  const { addToast } = useToastStore();
  const searchParams = useSearchParams();
  const loadQuizId = searchParams.get('loadQuizId');
  const draftId = searchParams.get('id');
  const isDraft = searchParams.get('isdraft') === 'true';

  // 기존 퀴즈 불러오기
  const { data: loadedQuizData } = useGetQuizDetail({
    quizId: loadQuizId || '',
    enabled: !!loadQuizId,
  });

  // 임시저장 퀴즈 불러오기
  const { data: draftQuizData } = useGetQuizDetail({
    quizId: draftId || '',
    enabled: !!draftId && isDraft,
  });

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
    // 수정 모드일 때
    if (isEditMode && quizDetail) {
      const { id, ...rest } = quizDetail;
      methods.reset(rest);
      replace(quizDetail.problems);
    }
    // 불러오기로 접근했을 때
    else if (loadQuizId && loadedQuizData) {
      const formValues = convertQuizDataToFormValues(loadedQuizData);
      methods.reset(formValues);
      replace(formValues.problems);
    }
    // 임시저장 불러오기로 접근했을 때
    else if (draftId && isDraft && draftQuizData) {
      const formValues = convertQuizDataToFormValues(draftQuizData);
      methods.reset(formValues);
      replace(formValues.problems);
    }
  }, [isEditMode, quizDetail, loadQuizId, loadedQuizData, draftId, isDraft, draftQuizData, methods.reset, replace]);

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

    const submitValues = {
      isDraft,
      title: formValues.title,
      description: formValues.description || '',
      openTime: formValues.startTime ? formatToUTCString(formValues.startTime) : '',
      dueTime: formValues.dueTime ? formatToUTCString(formValues.dueTime) : '',
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

    return submitValues;
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
              uploadType: 'QUIZ',
              renameFile: true,
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
