import { QuizList } from '@/features/quiz/quiz.types';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { QuizListResponseSchema } from '@/features/quiz/quiz.schema';
import { QUIZ_LIMIT_TIME_MAP_TO_RENDER } from '../quiz.constants';

const fetchQuizList = async (lectureId: string): Promise<QuizList> => {
  const response = await fetch(`/api/teachers/${lectureId}/quizzes/`);
  const totalCount = 20;

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);
    throw new Error('퀴즈 목록을 불러오는데 실패했어요.');
  }

  const json = await response.json();

  const parsedResponse = QuizListResponseSchema.safeParse(json.data);
  if (!parsedResponse.success) {
    if (process.env.NODE_ENV === 'development') console.error(parsedResponse.error);
    throw new Error('잘못된 퀴즈 목록 형식이에요.');
  }

  const quizList: QuizList = {
    openQuizzes: parsedResponse.data.openQuizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.quizName,
      dueTime: quiz.quizDate,
      isAvailable: quiz.quizAvailable,
      state: quiz.quizAvailable ? 'ongoing' : 'ready',
      limitTime: QUIZ_LIMIT_TIME_MAP_TO_RENDER[quiz.timeLimit],
      submitCount: quiz.submitCount,
      totalCount: totalCount,
    })),
    closedQuizzes: parsedResponse.data.closedQuizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.quizName,
      dueTime: quiz.quizDate,
      isAvailable: quiz.quizAvailable,
      state: 'closed',
      limitTime: QUIZ_LIMIT_TIME_MAP_TO_RENDER[quiz.timeLimit],
      submitCount: quiz.submitCount,
      totalCount: totalCount,
    })),
  };

  return quizList;
};

export const useGetQuizList = (lectureId: string) => {
  return useQuery<QuizList>({
    queryKey: QUERY_KEYS.quizList(lectureId),
    queryFn: () => fetchQuizList(lectureId),
  });
};
