'use client';

import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useToastStore } from '@/stores/toastStore';
import { QuizCreateRequest, QuizDraftRequest } from '@/features/quiz/types/quiz.types';
import { useRouter } from 'next/navigation';
import { useApiMutation } from '@/hooks/useApi';
import { ApiResponse } from '@/types/response.types';
import { QuizCreateRequestSchema, QuizDraftRequestSchema } from '@/features/quiz/schemas/quiz.schema';

export const usePostQuizCreate = ({ lectureId }: { lectureId: string }) => {
  const { addToast } = useToastStore();
  const router = useRouter();

  return useApiMutation<ApiResponse, QuizCreateRequest>({
    method: 'POST',
    endpoint: `/teachers/${lectureId}/quizzes`,
    requestSchema: QuizCreateRequestSchema,
    fetchOptions: {
      contentType: 'application/json',
      authorization: true,
    },
    invalidateKey: QUERY_KEYS.quizList(lectureId),
    onSuccess: () => {
      router.push(`/lectures/${lectureId}/quiz`);

      addToast({
        message: '퀴즈가 생성되었어요.',
        type: 'success',
      });
    },
    onError: (error) => {
      addToast({
        message: error.message,
        type: 'error',
      });
    },
  });
};

export const usePostQuizDraft = ({ lectureId }: { lectureId: string }) => {
  const { addToast } = useToastStore();
  const router = useRouter();

  return useApiMutation<ApiResponse, QuizDraftRequest>({
    method: 'POST',
    endpoint: `/teachers/${lectureId}/quizzes`,
    requestSchema: QuizDraftRequestSchema,
    fetchOptions: {
      contentType: 'application/json',
      authorization: true,
      errorMessage: '임시저장에 실패했어요. 입력값을 확인해주세요.',
    },
    invalidateKey: QUERY_KEYS.temporaryQuizList(lectureId),
    onSuccess: () => {
      router.push(`/lectures/${lectureId}/quiz?category=임시저장`);

      addToast({
        message: '퀴즈가 임시저장되었어요.',
        type: 'success',
      });
    },
    onError: (error) => {
      addToast({
        message: error.message,
        type: 'error',
      });
    },
  });
};
