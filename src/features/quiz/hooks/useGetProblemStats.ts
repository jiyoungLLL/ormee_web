import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { ProblemStatsResponseSchema } from '@/features/quiz/quiz.schema';
import { transformProblemStatsToCamelCase } from '@/utils/transforms/quiz.transform';

const getProblemStats = async (problemId: string) => {
  const response = await fetch(`/api/teachers/quizzes/problems/${problemId}/stats`);

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);
    throw new Error('문항 통계 조회에 실패했습니다.');
  }

  const json = await response.json();

  const parsed = ProblemStatsResponseSchema.safeParse(json);

  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') console.error(parsed.error);
    throw new Error('문항 통계 데이터 형식이 올바르지 않습니다.');
  }

  return transformProblemStatsToCamelCase(parsed.data);
};

export const useGetProblemStats = (problemId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.problemStats(problemId),
    queryFn: () => getProblemStats(problemId),
    staleTime: 24 * 60 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!problemId,
  });
};
