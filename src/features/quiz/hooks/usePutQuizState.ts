'use client';

import { QuizCreateRequest, QuizState } from '@/features/quiz/types/quiz.types';
import { QUERY_KEYS } from '../../../hooks/queries/queryKeys';
import { useToastStore } from '@/stores/toastStore';
import { useApiMutation } from '@/hooks/useApi';
import { ApiResponse } from '@/types/response.types';
import { useRouter } from 'next/navigation';

const SUCCESS_MESSAGE: Record<Exclude<QuizState, 'closed' | 'temporary'>, string> = {
  ongoing: '퀴즈가 마감됐어요.',
  ready: '퀴즈가 게시됐어요.',
};

const ERROR_MESSAGE: Record<Exclude<QuizState, 'closed' | 'temporary'>, string> = {
  ongoing: '퀴즈 마감에 실패했어요.',
  ready: '퀴즈 게시에 실패했어요.',
};

const getEndpoint = (quizId: string, state: Exclude<QuizState, 'closed' | 'temporary'>): string => {
  if (state === 'ongoing') return `/teachers/quizzes/${quizId}/close`;
  if (state === 'ready') return `/teachers/quizzes/${quizId}/open`;

  throw new Error('현재 퀴즈의 상태가 올바르지 않아요. 다시 시도해주세요.');
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
  const { addToast } = useToastStore();

  return useApiMutation<ApiResponse>({
    method: 'PUT',
    endpoint: getEndpoint(quizId, prevState),
    fetchOptions: {
      errorMessage: ERROR_MESSAGE[prevState],
      authorization: true,
    },
    invalidateKey: [QUERY_KEYS.quizList(lectureId), QUERY_KEYS.quizDetail(quizId)],
    onSuccess: () => {
      addToast({ message: SUCCESS_MESSAGE[prevState], type: 'success' });
    },
    onError: (error) => {
      addToast({ message: error.message, type: 'error' });
    },
  });
};

export const usePutQuizDetail = ({ quizId, lectureId }: { quizId: string; lectureId: string }) => {
  const { addToast } = useToastStore();
  const router = useRouter();

  return useApiMutation<ApiResponse, QuizCreateRequest>({
    method: 'PUT',
    endpoint: `/teachers/quizzes/${quizId}`,
    fetchOptions: {
      errorMessage: '퀴즈 수정이 완료되지 않았어요. 다시 시도해주세요.',
      authorization: true,
    },
    invalidateKey: [QUERY_KEYS.quizDetail(quizId), QUERY_KEYS.quizList(lectureId)],
    onSuccess: () => {
      addToast({ message: '수정이 완료되었어요.', type: 'success' });
      router.push(`/lectures/${lectureId}/quiz`);
    },
    onError: (error) => {
      addToast({ message: error.message, type: 'error' });
    },
  });
};

export const useDeleteQuiz = ({ lectureId, quizId }: { lectureId: string; quizId: string }) => {
  const { addToast } = useToastStore();
  const router = useRouter();

  return useApiMutation<ApiResponse>({
    method: 'DELETE',
    endpoint: `/teachers/quizzes/${quizId}`,
    fetchOptions: {
      errorMessage: '퀴즈 삭제에 실패했어요.',
      authorization: true,
    },
    invalidateKey: [QUERY_KEYS.quizList(lectureId), QUERY_KEYS.quizDetail(quizId)],
    onSuccess: () => {
      router.push(`/lectures/${lectureId}/quiz`);
      addToast({ message: '삭제가 완료되었어요.', type: 'success' });
    },
    onError: (error) => {
      addToast({ message: error.message, type: 'error' });
    },
  });
};
