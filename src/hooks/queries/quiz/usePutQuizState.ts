import { QuizState } from '@/types/quiz.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';

const putQuizState = async (quizId: string, state: Exclude<QuizState, 'ready'>) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_MOCK_BASE_URL}/api/teachers/quizzes/${quizId}/${state}`, {
    method: 'PUT',
  });

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);

    if (state === 'ongoing') throw new Error('퀴즈 게시에 실패했습니다.');
    if (state === 'closed') throw new Error('퀴즈 마감에 실패했습니다.');
  }

  return response.json();
};

export const usePutQuizState = ({ quizId, lectureId }: { quizId: string; lectureId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (state: Exclude<QuizState, 'ready'>) => putQuizState(quizId, state),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.quizList(lectureId) });
    },
  });
};
