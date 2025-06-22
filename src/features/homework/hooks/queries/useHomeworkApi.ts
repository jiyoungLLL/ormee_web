import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiMutation, useApiQuery } from '@/hooks/useApi';
import { useToastStore } from '@/stores/toastStore';
import { useRouter } from 'next/navigation';
import { HomeworkData, HomeworkItems } from '../../homework.types';

export const useGetHomeworks = (lectureId: string) => {
  return useApiQuery<HomeworkData>({
    queryKey: QUERY_KEYS.homeworkList(lectureId),
    fetchOptions: {
      endpoint: `/teachers/${lectureId}/homeworks`,
      authorization: true,
    },
  });
};

export const useGetDraftHomeworks = (lectureId: string) => {
  return useApiQuery<HomeworkItems[]>({
    queryKey: QUERY_KEYS.homeworkDraft(lectureId),
    fetchOptions: {
      endpoint: `/teachers/${lectureId}/homeworks/drafts`,
      authorization: true,
    },
  });
};

export const useCreateHomework = (lectureId: string) => {
  const router = useRouter();
  const { addToast } = useToastStore();

  return useApiMutation<void, FormData>({
    method: 'POST',
    endpoint: `/teachers/${lectureId}/homeworks`,
    fetchOptions: {
      authorization: true,
      contentType: 'multipart/form-data',
    },
    onSuccess: () => {
      addToast({
        message: '숙제가 생성되었어요.',
        type: 'success',
        duration: 2500,
      });
      router.push(`/lectures/${lectureId}/homework`);
    },
    onError: (err) => {
      addToast({
        message: '숙제 생성에 실패했어요. 다시 시도해주세요.',
        type: 'error',
        duration: 2500,
      });
      if (process.env.NODE_ENV === 'development') console.error(err);
    },
    invalidateKey: [QUERY_KEYS.homeworkList(lectureId)],
  });
};

export const useUpdateHomework = (homeworkId: string) => {
  const { addToast } = useToastStore();
  return useApiMutation<void, FormData>({
    method: 'PUT',
    endpoint: `teachers/homeworks/${homeworkId}`,
    fetchOptions: {
      authorization: true,
      contentType: 'multipart/form-data',
    },
    onSuccess: () => {
      addToast({
        message: '숙제가 수정되었어요.',
        type: 'success',
        duration: 2500,
      });
    },
    onError: (err) => {
      addToast({
        message: '숙제 수정에 실패했어요. 다시 시도해주세요.',
        type: 'error',
        duration: 2500,
      });
      if (process.env.NODE_ENV === 'development') console.error(err);
    },
    invalidateKey: [QUERY_KEYS.homeworkList(homeworkId)],
  });
};

export const useDeleteHomework = (homeworkId: string, lectureId: string) => {
  const { addToast } = useToastStore();
  return useApiMutation<void, string>({
    method: 'DELETE',
    endpoint: (homeworkId) => `/teachers/lectures/${homeworkId}`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      addToast({
        message: '숙제가 삭제되었어요.',
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
      if (process.env.NODE_ENV === 'development') console.error(err);
    },
    invalidateKey: [QUERY_KEYS.homeworkList(lectureId)],
  });
};
