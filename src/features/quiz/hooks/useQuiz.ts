'use client';

import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useToastStore } from '@/stores/toastStore';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { QuizCreateRequest } from '@/features/quiz/quiz.types';
import { postQuiz } from '@/features/quiz/api/quiz.api';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ToastData } from '@/types/toast.types';

const handleQuizSuccess = (
  quiz: QuizCreateRequest,
  lectureId: string,
  queryClient: QueryClient,
  router: AppRouterInstance,
  addToast: (toastData: Omit<ToastData, 'id'>) => void,
) => {
  const { isDraft } = quiz;
  const queryKey = isDraft ? QUERY_KEYS.temporaryQuizList(lectureId) : QUERY_KEYS.quizList(lectureId);

  queryClient.invalidateQueries({ queryKey });
  router.push(`/lectures/${lectureId}/quiz`);

  addToast({ message: `퀴즈가 ${isDraft ? '임시저장' : '생성'}되었어요.`, type: 'success' });
};

export const usePostQuiz = ({ lectureId }: { lectureId: string }) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (quiz: QuizCreateRequest) => postQuiz(lectureId, quiz),
    onSuccess: (_, quiz) => handleQuizSuccess(quiz, lectureId, queryClient, router, addToast),
    onError: (error) => {
      addToast({ message: error.message, type: 'error' });
    },
  });
};
