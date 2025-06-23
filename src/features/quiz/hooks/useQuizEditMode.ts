import { useSearchParams } from 'next/navigation';
import { useGetQuizDetailTemp } from './useGetQuizDetail';
import { QuizFormValues } from '@/features/quiz/types/quiz.types';

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
  const { data } = useGetQuizDetailTemp(quizId ?? '');

  return {
    isEditMode,
    quizId,
    quizDetail: data,
  };
};
