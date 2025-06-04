import { useSearchParams } from 'next/navigation';
import { useGetQuizDetail } from './useGetQuizDetail';
import { QuizFormValues } from '@/features/quiz/quiz.types';

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

  const { data } = useGetQuizDetail(quizId ?? '');

  return {
    isEditMode,
    quizId,
    quizDetail: data,
  };
};
