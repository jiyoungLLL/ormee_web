import { QuizList } from '@/types/quiz.types';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { transformQuizListToCamelCase } from '@/utils/transforms/quiz.transform';
import { QuizListResponseSchema } from '@/schemas/quiz.schema';

const fetchQuizList = async (lectureId: string): Promise<QuizList> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_MOCK_BASE_URL}/api/teachers/${lectureId}/quizzes/`);

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);
    throw new Error('퀴즈 목록을 불러오는데 실패했습니다.');
  }

  const json = await response.json();

  const parsedJson = QuizListResponseSchema.safeParse(json);
  if (!parsedJson.success) {
    if (process.env.NODE_ENV === 'development') console.error(parsedJson.error);
    throw new Error('잘못된 퀴즈 목록 형식입니다.');
  }

  return transformQuizListToCamelCase(parsedJson.data);
};

export const useGetQuizList = (lectureId: string) => {
  return useQuery<QuizList>({
    queryKey: QUERY_KEYS.quizList(lectureId),
    queryFn: () => fetchQuizList(lectureId),
  });
};
