// useClassApi.ts
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiMutation, useApiQuery } from '@/hooks/useApi';
import { useToastStore } from '@/stores/toastStore';
import { ClassListType } from '../../class.types';

export const useGetClass = () => {
  return useApiQuery<ClassListType>([QUERY_KEYS.classList], '/teachers/lectures');
};

export const usePostClass = () => {
  const { addToast } = useToastStore();

  return useApiMutation<string, any>(
    'POST',
    `/teachers/lectures`,
    () => addToast({ message: '강의가 생성되었어요.', type: 'success', duration: 2500 }),
    [QUERY_KEYS.classList()],
    (err) => {
      addToast({
        message: '강의가 생성되지 않았어요. 다시 시도해주세요.',
        type: 'error',
        duration: 2500,
      });
      if (process.env.NODE_ENV === 'development') console.error(err);
    },
  );
};

export const useDeleteClass = () => {
  const { addToast } = useToastStore();

  return useApiMutation<string, any>(
    'DELETE',
    (lectureId) => `/teachers/lectures/${lectureId}`,
    () => addToast({ message: '강의가 삭제되었어요.', type: 'success', duration: 2500 }),
    [QUERY_KEYS.classList()],
    (err) => {
      addToast({
        message: '강의가 삭제되지 않았어요. 다시 시도해주세요.',
        type: 'error',
        duration: 2500,
      });
      if (process.env.NODE_ENV === 'development') console.error(err);
    },
  );
};
