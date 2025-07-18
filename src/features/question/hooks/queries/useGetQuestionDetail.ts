import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiQuery } from '@/hooks/useApi';
import { Question } from '@/features/question/types/question.types';

export const useGetQuestionDetail = (questionId: string) => {
  return useApiQuery<Question>({
    queryKey: QUERY_KEYS.questionDetail(questionId),
    fetchOptions: {
      endpoint: `/teachers/questions/${questionId}`,
    },
    queryOptions: {
      enabled: !!questionId,
      staleTime: 1 * 60 * 60 * 1000,
      gcTime: 5 * 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  });
};
