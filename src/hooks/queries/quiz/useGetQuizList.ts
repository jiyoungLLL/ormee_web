import { QuizList, QuizListResponseSchema } from '@/schemas/quiz.schema';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { transformQuizListToCamelCase } from '@/utils/transforms/quiz.transform';

const fetchQuizList = async (lectureId: string): Promise<QuizList> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_MOCK_BASE_URL}/api/teachers/${lectureId}/quizzes/`);
  if (!response.ok) throw new Error('퀴즈 목록을 불러오는데 실패했습니다.');

  const json = await response.json();
  const parsedJson = QuizListResponseSchema.safeParse(json);
  if (!parsedJson.success) throw new Error('잘못된 퀴즈 목록 형식입니다.');

  return transformQuizListToCamelCase(parsedJson.data);
};

export const useGetQuizList = (lectureId: string) => {
  return useQuery<QuizList>({
    queryKey: QUERY_KEYS.quizList(lectureId),
    queryFn: () => fetchQuizList(lectureId),
  });
};
