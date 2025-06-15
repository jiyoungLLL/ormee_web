import { useQuery } from '@tanstack/react-query';
import { QuizListResponseSchema } from '@/features/quiz/schemas/quiz.schema';
import { QUERY_KEYS } from '../../../hooks/queries/queryKeys';
import { QuizList } from '@/features/quiz/quiz.types';

const getTemporaryQuizList = async (lectureId: string) => {
  const response = await fetch(`/api/teachers/${lectureId}/quizzes/temporary`, { method: 'GET' });

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);
    throw new Error('임시저장 퀴즈를 불러오는데 실패했습니다.');
  }

  const json = await response.json();

  const parsedJson = QuizListResponseSchema.safeParse(json);
  if (!parsedJson.success) {
    if (process.env.NODE_ENV === 'development') console.error(parsedJson.error);
    throw new Error('잘못된 퀴즈 목록 형식입니다.');
  }

  return parsedJson.data;
};

export const useGetTemporaryQuizList = (lectureId: string) => {
  return useQuery<QuizList>({
    queryKey: QUERY_KEYS.temporaryQuizList(lectureId),
    // queryFn: () => getTemporaryQuizList(lectureId),
    staleTime: 1 * 60 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
