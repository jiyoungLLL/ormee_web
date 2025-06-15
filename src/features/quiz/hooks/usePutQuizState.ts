'use client';

import { QuizState } from '@/features/quiz/types/quiz.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../hooks/queries/queryKeys';
import { useToastStore } from '@/stores/toastStore';

const SUCCESS_MESSAGE: Record<Exclude<QuizState, 'closed' | 'temporary'>, string> = {
  ongoing: '퀴즈가 마감되었습니다.',
  ready: '퀴즈가 게시되었습니다.',
};

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

export const usePutQuizState = ({
  quizId,
  lectureId,
  prevState,
}: {
  quizId: string;
  lectureId: string;
  prevState: Exclude<QuizState, 'closed' | 'temporary'>;
}) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: (state: Exclude<QuizState, 'ready'>) => putQuizState(quizId, state),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.quizList(lectureId) });
      addToast({ message: SUCCESS_MESSAGE[prevState], type: 'success' });
    },
    onError: (error) => {
      addToast({ message: error.message, type: 'error' });
    },
  });
};
