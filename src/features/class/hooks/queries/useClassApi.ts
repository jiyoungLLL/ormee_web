// features/class/api/useClassApi.ts

import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiMutation, useApiQuery } from '@/hooks/useApi';
import { useToastStore } from '@/stores/toastStore';
import { ClassModalValues } from '../../class.schema';
import { GetClassResponse } from '../../class.types';

export const useGetClass = () => {
  return useApiQuery<GetClassResponse>({
    queryKey: QUERY_KEYS.classList(),
    fetchOptions: {
      endpoint: '/teachers/lectures',
      authorization: true,
    },
  });
};

export const useCreateClass = () => {
  const { addToast } = useToastStore();

  return useApiMutation<void, ClassModalValues>({
    method: 'POST',
    endpoint: '/teachers/lectures',
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      addToast({
        message: '강의가 생성되었어요.',
        type: 'success',
        duration: 2500,
      });
    },
    onError: (err) => {
      addToast({
        message: '강의 생성에 실패했어요. 다시 시도해주세요.',
        type: 'error',
        duration: 2500,
      });
    },
    invalidateKey: [QUERY_KEYS.classList()],
  });
};

export const useUpdateClass = (lectureId: string) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, ClassModalValues>({
    method: 'PUT',
    endpoint: `/teachers/lectures/${lectureId}`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      addToast({
        message: '강의가 수정되었어요.',
        type: 'success',
        duration: 2500,
      });
    },
    onError: (err) => {
      addToast({
        message: '강의 수정에 실패했어요. 다시 시도해주세요.',
        type: 'error',
        duration: 2500,
      });
    },
    invalidateKey: [QUERY_KEYS.classList()],
  });
};

export const useDeleteClass = () => {
  const { addToast } = useToastStore();

  return useApiMutation<void, string>({
    method: 'DELETE',
    endpoint: (lectureId) => `/teachers/lectures/${lectureId}`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      addToast({
        message: '강의가 삭제되었어요.',
        type: 'success',
        duration: 2500,
      });
    },
    invalidateKey: [QUERY_KEYS.classList()],
    onError: (err) => {
      addToast({
        message: err.message,
        type: 'error',
        duration: 2500,
      });
    },
  });
};
