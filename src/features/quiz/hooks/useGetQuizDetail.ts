import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../hooks/queries/queryKeys';
import { useApiQuery } from '@/hooks/useApi';
import { QuizDetailResponseSchema } from '../schemas/quizDetail.schema';
import { QuizDetailResponse } from '../types/quizDetail.types';
import { QuizFormValues } from '../types/quiz.types';

const getQuizDetail = async (quizId: string) => {
  const response = await fetch(`/api/teachers/quizzes/${quizId}`);

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);
    throw new Error('퀴즈 상세 정보를 불러오는데 실패했습니다.');
  }

  const json = await response.json();

  return json;
};

// TODO: 임시저장 목록 불러오는 api 연동 후 교체
export const useGetQuizDetailTemp = (quizId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.quizDetail(quizId),
    queryFn: () => getQuizDetail(quizId),
    enabled: !!quizId,
    staleTime: 6 * 60 * 60 * 1000, // 6시간
    gcTime: 12 * 60 * 60 * 1000, // 12시간
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export const useGetQuizDetail = (quizId: string) => {
  return useApiQuery<QuizDetailResponse>({
    queryKey: QUERY_KEYS.quizDetail(quizId),
    fetchOptions: {
      endpoint: `/teachers/quizzes/${quizId}`,
      authorization: true,
      errorMessage: '퀴즈 상세 정보를 불러오는데 실패했어요.',
    },
    queryOptions: {
      staleTime: 1000 * 60 * 60 * 24,
      gcTime: 1000 * 60 * 60 * 24,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
    schema: QuizDetailResponseSchema,
    validateErrorMessage: '잘못된 형식의 퀴즈 정보입니다.',
  });
};
