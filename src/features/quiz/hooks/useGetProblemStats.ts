import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { ProblemStatsResponseSchema } from '@/features/quiz/schemas/quiz.schema';
import { useApiQuery } from '@/hooks/useApi';
import { ProblemStats, ProblemStatsResponse } from '../types/quiz.types';

export const useGetProblemStats = (problemId: number) => {
  return useApiQuery<ProblemStatsResponse, ProblemStats>({
    queryKey: QUERY_KEYS.problemStats(problemId),
    fetchOptions: {
      endpoint: `/teachers/quizzes/problems/${problemId}/stats`,
      errorMessage: '문항 통계 조회에 실패했어요.',
      authorization: true,
    },
    queryOptions: {
      staleTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      enabled: !!problemId,
    },
    schema: ProblemStatsResponseSchema,
    transform: (response: ProblemStatsResponse): ProblemStats => {
      if (response.type === 'CHOICE') {
        return {
          content: response.content,
          type: 'CHOICE',
          items: response.results.map((result) => ({
            isAnswer: result.option === response.answer,
            text: result.option,
            selectedStudents: result.count,
          })),
        };
      } else {
        return {
          content: response.content,
          type: 'ESSAY',
          answer: response.answer,
          incorrectSubmit: response.results.map((result, index) => ({
            rank: index + 1,
            answer: result.option,
            incorrectStudents: result.count,
          })),
        };
      }
    },
  });
};
