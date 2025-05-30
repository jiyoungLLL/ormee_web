'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnswerFormValues } from '../../question.types';
import { postAnswer } from '../../api/answer.api';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useToastStore } from '@/stores/toastStore';

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
