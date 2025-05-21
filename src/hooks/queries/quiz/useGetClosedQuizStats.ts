import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { ClosedQuizStatsResponseSchema } from '@/schemas/quiz.schema';
import { transformClosedQuizStatsToCamelCase } from '@/utils/transforms/quiz.transform';
import { ClosedQuizStats } from '@/types/quiz.types';

const getClosedQuizStats = async (quizId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_MOCK_BASE_URL}/api/teachers/quizzes/${quizId}/stats`);

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);
    throw new Error('퀴즈 통계 조회에 실패했습니다.');
  }

  const json = await response.json();

  const parsedJson = ClosedQuizStatsResponseSchema.safeParse(json);
  if (!parsedJson.success) {
    if (process.env.NODE_ENV === 'development') console.error(parsedJson.error);
    throw new Error('잘못된 퀴즈 통계 형식입니다.');
  }

  return transformClosedQuizStatsToCamelCase(parsedJson.data);
};

export const useGetClosedQuizStats = (quizId: string) => {
  return useQuery<ClosedQuizStats>({
    queryKey: QUERY_KEYS.closedQuizStats(quizId),
    queryFn: () => getClosedQuizStats(quizId),
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!quizId,
  });
};
