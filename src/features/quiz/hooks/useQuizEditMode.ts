import { useSearchParams } from 'next/navigation';
import { useGetQuizDetail } from '@/features/quiz/hooks/useGetQuizDetail';
import { QuizFormValues } from '@/features/quiz/types/quiz.types';
import { QUIZ_LIMIT_TIME_MAP_TO_RENDER } from '../quiz.constants';
import { useMemo } from 'react';

type UseQuizEditModeReturn = {
  isEditMode: boolean;
  quizId: string | null;
  quizDetail: QuizFormValues & { id: string };
};

export const useQuizEditMode = (): UseQuizEditModeReturn => {
  const searchParams = useSearchParams();
  const createType = searchParams.get('type');
  const quizId = searchParams.get('quizId');

  const isEditMode = createType === 'edit' && quizId !== null;

  const { data } = useGetQuizDetail({ quizId: quizId ?? '', enabled: isEditMode });

  const quizDetail = useMemo((): QuizFormValues & { id: string } => {
    return {
      id: quizId ?? '',
      title: data?.title ?? '',
      description: data?.description ?? '',
      startTime: data?.openTime ?? '',
      dueTime: data?.dueTime ?? '',
      limitTime:
        QUIZ_LIMIT_TIME_MAP_TO_RENDER[data?.timeLimit as keyof typeof QUIZ_LIMIT_TIME_MAP_TO_RENDER] || '제한없음',
      problems:
        data?.problems?.map((problem, problemIndex) => ({
          type: problem.type,
          content: problem.content,
          item: problem.items.map((item, itemIndex) => ({ id: `problem-${problemIndex}-${itemIndex}`, text: item })),
          answer: problem.answer,
          answerItemId:
            problem.items.findIndex((item) => item === problem.answer) >= 0
              ? `problem-${problemIndex}-${problem.items.findIndex((item) => item === problem.answer)}`
              : '',
          files: problem.filePaths.map((filePath, fileIndex) => ({
            id: `files-${problemIndex}-${problem?.fileIds?.[fileIndex] ?? ''}`,
            previewUrl: filePath ?? '',
          })),
        })) ?? [],
    };
  }, [quizId, data, data?.problems.length]);

  return {
    isEditMode,
    quizId,
    quizDetail,
  };
};
