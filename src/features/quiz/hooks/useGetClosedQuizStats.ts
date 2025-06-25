import { QUERY_KEYS } from '../../../hooks/queries/queryKeys';
import { ClosedQuizStats } from '@/features/quiz/types/quiz.types';
import { useApiQuery } from '@/hooks/useApi';

export const useGetClosedQuizStats = (quizId: string) => {
  return useApiQuery<ClosedQuizStats>({
    queryKey: QUERY_KEYS.closedQuizStats(quizId),
    fetchOptions: {
      endpoint: `/teachers/quizzes/${quizId}/stats`,
      errorMessage: '퀴즈 통계 조회에 실패했어요.',
      authorization: true,
    },
    queryOptions: {
      staleTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      enabled: !!quizId,
    },
  });
};
