import { QuizList, QuizListResponse } from '@/features/quiz/types/quiz.types';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiQuery } from '@/hooks/useApi';
import { QuizListResponseSchema } from '@/features/quiz/schemas/quiz.schema';
import { QUIZ_LIMIT_TIME_MAP_TO_RENDER } from '@/features/quiz/quiz.constants';

export const useGetQuizList = (lectureId: string) => {
  return useApiQuery<QuizListResponse, QuizList>({
    queryKey: QUERY_KEYS.quizList(lectureId),
    fetchOptions: {
      endpoint: `/teachers/${lectureId}/quizzes`,
      authorization: true,
      errorMessage: '퀴즈 목록을 불러오는데 실패했어요.',
    },
    queryOptions: {
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    schema: QuizListResponseSchema,
    validateErrorMessage: '퀴즈 목록 형식이 올바르지 않아요.',
    transform: (data) => {
      const totalCount = 20; // TODO: API 수정 후 응답 데이터로 변경

      return {
        openQuizzes: data.openQuizzes.map((quiz) => ({
          id: quiz.id,
          title: quiz.quizName,
          dueTime: quiz.quizDate,
          isAvailable: quiz.quizAvailable,
          state: quiz.quizAvailable ? 'ongoing' : 'ready',
          limitTime:
            quiz.timeLimit in QUIZ_LIMIT_TIME_MAP_TO_RENDER
              ? QUIZ_LIMIT_TIME_MAP_TO_RENDER[quiz.timeLimit as keyof typeof QUIZ_LIMIT_TIME_MAP_TO_RENDER]
              : '제한없음',
          submitCount: quiz.submitCount,
          totalCount: totalCount,
        })),
        closedQuizzes: data.closedQuizzes.map((quiz) => ({
          id: quiz.id,
          title: quiz.quizName,
          dueTime: quiz.quizDate,
          isAvailable: quiz.quizAvailable,
          state: 'closed',
          limitTime:
            quiz.timeLimit in QUIZ_LIMIT_TIME_MAP_TO_RENDER
              ? QUIZ_LIMIT_TIME_MAP_TO_RENDER[quiz.timeLimit as keyof typeof QUIZ_LIMIT_TIME_MAP_TO_RENDER]
              : '제한없음',
          submitCount: quiz.submitCount,
          totalCount: totalCount,
        })),
      };
    },
  });
};
