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

  // TODO: 실제 api 연동 후 QuizFormValues로 변경해서 return 하기
  const { data } = useGetQuizDetail({ quizId: quizId ?? '', enabled: isEditMode });

  const quizDetail = useMemo((): QuizFormValues & { id: string } => {
    const openTime = '2025-06-11T15:00:00'; // TODO: api 수정 후 교체

    return {
      id: quizId ?? '',
      title: data?.title ?? '',
      description: data?.description ?? '',
      startTime: openTime,
      dueTime: data?.dueTime ?? '',
      limitTime:
        QUIZ_LIMIT_TIME_MAP_TO_RENDER[data?.timeLimit as keyof typeof QUIZ_LIMIT_TIME_MAP_TO_RENDER] || '제한없음',
      problems:
        data?.problems?.map((problem, problemIndex) => ({
          type: problem.type,
          content: problem.content,
          item: problem.items.map((item, itemIndex) => ({ id: `problem-${problemIndex}-${itemIndex}`, text: item })),
          answerItemId: crypto.randomUUID(),
          answer: problem.answer,
          files: problem.filePaths.map((filePath, fileIndex) => ({
            id: `problem-${problemIndex}-${fileIndex}`,
            previewUrl: filePath ?? '',
          })),
        })) ?? [],
    };
  }, [quizId, data]);

  return {
    isEditMode,
    quizId,
    quizDetail,
  };
};
