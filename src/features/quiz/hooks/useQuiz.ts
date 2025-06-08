'use client';

import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useToastStore } from '@/stores/toastStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QuizCreateRequest } from '@/features/quiz/quiz.types';
import { postQuiz } from '@/features/quiz/api/quiz.api';
import { useRouter } from 'next/navigation';

export const usePostQuiz = ({ lectureId }: { lectureId: string }) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (quiz: QuizCreateRequest) => postQuiz(lectureId, quiz),
    onSuccess: (_, quiz) => {
      const { isDraft } = quiz;
      const queryKey = isDraft ? QUERY_KEYS.temporaryQuizList(lectureId) : QUERY_KEYS.quizList(lectureId);
      queryClient.invalidateQueries({ queryKey });
      router.push(`/lectures/${lectureId}/quiz`);
      addToast({ message: `퀴즈가 ${isDraft ? '임시저장' : '생성'}되었어요.`, type: 'success' });
    },
    onError: (error) => {
      addToast({ message: error.message, type: 'error' });
    },
  });
};
