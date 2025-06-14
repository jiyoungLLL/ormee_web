import { QuizList } from '@/features/quiz/quiz.types';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { getQuizListAction } from '@/features/quiz/api/quizList.api';

const fetchQuizList = async (lectureId: string): Promise<QuizList> => {
  const response = await getQuizListAction(lectureId);

  if (response.status === 'error') {
    throw new Error(response.message);
  }

  return response.data;
};

export const useGetQuizList = (lectureId: string) => {
  return useQuery<QuizList>({
    queryKey: QUERY_KEYS.quizList(lectureId),
    queryFn: () => fetchQuizList(lectureId),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 3,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
