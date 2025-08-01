// features/class/api/useClassApi.ts

import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiMutation, useApiQuery } from '@/hooks/useApi';
import { useToastStore } from '@/stores/toastStore';
import { ClassModalValues } from '../../class.schema';
import { ClassDetail, ClassItems, GetClassResponse, ResponseCreateClass } from '../../class.types';

export const useGetClass = () => {
  return useApiQuery<GetClassResponse>({
    queryKey: QUERY_KEYS.classList(),
    fetchOptions: {
      endpoint: '/teachers/lectures',
      authorization: true,
    },
  });
};

export const useGetClassDetail = (lectureId: string) => {
  return useApiQuery<ClassDetail>({
    queryKey: QUERY_KEYS.classDetail(lectureId),
    fetchOptions: {
      endpoint: `/teachers/lectures/${lectureId}`,
      authorization: true,
    },
    queryOptions: {
      enabled: !!lectureId,
    },
  });
};

export const useCreateClass = (success: (data: ResponseCreateClass) => void) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, ClassModalValues>({
    method: 'POST',
    endpoint: '/teachers/lectures',
    fetchOptions: {
      authorization: true,
    },
    onSuccess: (data) => {
      if (data) success(data);
      addToast({
        message: '강의가 생성되었어요.',
        type: 'success',
        duration: 2500,
      });
    },
    onError: (err) => {
      addToast({
        message: err.message,
        type: 'error',
        duration: 2500,
      });
    },
    invalidateKey: QUERY_KEYS.classList(),
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
        message: err.message,
        type: 'error',
        duration: 2500,
      });
    },
    invalidateKey: QUERY_KEYS.classList(),
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
    onError: (err) => {
      addToast({
        message: err.message,
        type: 'error',
        duration: 2500,
      });
    },
    invalidateKey: QUERY_KEYS.classList(),
  });
};

export const useGetLoadClass = () => {
  return useApiQuery<ClassItems[]>({
    queryKey: [QUERY_KEYS.classList(), QUERY_KEYS.classLoadList()],
    fetchOptions: {
      endpoint: '/teachers/lectures/load',
      authorization: true,
    },
  });
};

export const usePostCoworker = (lectureId: string, username: string, success: () => void) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, string>({
    method: 'POST',
    endpoint: `/teachers/lectures/${lectureId}/collaborators?username=${username}`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      success();
      addToast({
        message: '공동작업자가 추가되었어요.',
        type: 'success',
        duration: 2500,
      });
    },
    onError: (err) => {
      addToast({
        message: err.message,
        type: 'error',
        duration: 2500,
      });
    },
  });
};

export const useDeleteCoworker = (lectureId: string, username: string, success: () => void) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, string>({
    method: 'DELETE',
    endpoint: `/teachers/lectures/${lectureId}/collaborators?username=${username}`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      success();
      addToast({
        message: '공동작업자가 삭제되었어요.',
        type: 'success',
        duration: 2500,
      });
    },
    onError: (err) => {
      addToast({
        message: err.message,
        type: 'error',
        duration: 2500,
      });
    },
    invalidateKey: QUERY_KEYS.classDetail(lectureId),
  });
};
