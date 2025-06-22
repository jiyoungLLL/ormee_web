import { DraftQuizListResponseSchema } from '@/features/quiz/schemas/quiz.schema';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { DraftQuizListResponse, Quiz } from '@/features/quiz/types/quiz.types';
import { useApiQuery } from '@/hooks/useApi';
import { QUIZ_LIMIT_TIME_MAP_TO_RENDER } from '@/features/quiz/quiz.constants';

export const useGetTemporaryQuizList = (lectureId: string) => {
  return useApiQuery<DraftQuizListResponse, Quiz[]>({
    queryKey: QUERY_KEYS.temporaryQuizList(lectureId),
    fetchOptions: {
      endpoint: `/teachers/${lectureId}/quizzes/draft`,
      authorization: true,
      errorMessage: '임시저장 목록을 불러오는데 실패했어요.',
    },
    queryOptions: {
      staleTime: 1000 * 60 * 60 * 24,
      gcTime: 1000 * 60 * 60 * 24,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
    },
    schema: DraftQuizListResponseSchema,
    validateErrorMessage: '임시저장 목록 형식이 올바르지 않아요. 잠시 후 다시 시도해주세요.',
    transform: (data) => {
      return data.map((quiz) => ({
        id: quiz.id.toString(),
        title: quiz.quizName || '제목 없음',
        dueTime: quiz.quizDate || '',
        isAvailable: quiz.quizAvailable,
        limitTime: QUIZ_LIMIT_TIME_MAP_TO_RENDER[(quiz.timeLimit || 0) as keyof typeof QUIZ_LIMIT_TIME_MAP_TO_RENDER],
        submitCount: quiz.submitCount,
        totalCount: 0,
        state: 'temporary',
      }));
    },
  });
};
