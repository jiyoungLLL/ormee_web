import { useQuery } from '@tanstack/react-query';
import { Question } from '../../types/question.types';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { getQuestionDetail } from '../../api/getQuestionDetail';

export const useGetQuestionDetail = (questionId: string) => {
  return useQuery<Question>({
    queryKey: QUERY_KEYS.questionDetail(questionId),
    queryFn: () => getQuestionDetail(questionId),
    enabled: !!questionId,
    staleTime: 1 * 60 * 60 * 1000,
    gcTime: 5 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
