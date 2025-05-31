'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnswerFormValues } from '@/features/question/question.types';
import { deleteAnswer, getAnswer, postAnswer } from '@/features/question/api/answer.api';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useToastStore } from '@/stores/toastStore';

export const useGetAnswer = (questionId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.answer(questionId),
    queryFn: () => getAnswer(questionId),
    enabled: !!questionId,
    staleTime: 1 * 60 * 60 * 1000,
    gcTime: 5 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export const usePostAnswer = (questionId: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: (data: AnswerFormValues) => postAnswer(data, questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.answer(questionId),
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

export const useDeleteAnswer = ({ questionId, answerId }: { questionId: string; answerId: string }) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: () => deleteAnswer(answerId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.answer(questionId),
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
