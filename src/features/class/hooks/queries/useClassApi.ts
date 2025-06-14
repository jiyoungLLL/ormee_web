import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { useApiMutation } from '@/hooks/useApi';
import { useToastStore } from '@/stores/toastStore';

export const useDeleteClass = () => {
  const lectureId = useLectureId();
  const { addToast } = useToastStore();

  return useApiMutation<string, void>({
    method: 'DELETE',
    endpoint: `/teachers/lectures/${lectureId}`,
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
        message: '강의가 삭제되지 않았어요. 다시 시도해주세요.',
        type: 'error',
        duration: 2500,
      });
      if (process.env.NODE_ENV === 'development') console.error(err);
    },
  });
};
