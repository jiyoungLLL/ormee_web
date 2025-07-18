import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiMutation, useApiQuery } from '@/hooks/useApi';
import { useToastStore } from '@/stores/toastStore';
import { useRouter } from 'next/navigation';
import { HomeworkData, HomeworkItems, PostHomeWork } from '../../homework.types';

export const useGetHomeworks = (lectureId: string) => {
  return useApiQuery<HomeworkData>({
    queryKey: QUERY_KEYS.homeworkList(lectureId),
    fetchOptions: {
      endpoint: `/teachers/${lectureId}/homeworks`,
      authorization: true,
    },
  });
};

export const useGetHomeworksDetail = (homeworkId: string) => {
  const endHomeworkId = Number(homeworkId);

  return useApiQuery<HomeworkItems>({
    queryKey: QUERY_KEYS.homeworkDetail(homeworkId),
    fetchOptions: {
      endpoint: `/teachers/homeworks/${endHomeworkId}`,
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

export const useCreateHomework = (lectureId: string, successMessage: string) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, PostHomeWork>({
    method: 'POST',
    endpoint: `/teachers/${lectureId}/homeworks`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      addToast({
        message: successMessage,
        type: 'success',
        duration: 2500,
      });
    },
    onError: () => {
      addToast({
        message: '숙제 생성에 실패했어요. 다시 시도해주세요.',
        type: 'error',
        duration: 2500,
      });
    },
    invalidateKey: [QUERY_KEYS.homeworkList(lectureId), QUERY_KEYS.homeworkDraft(lectureId)],
  });
};

type updateProps = {
  homeworkId: string | undefined;
  lectureId: string | undefined;
};

export const useUpdateHomework = ({ homeworkId, lectureId }: updateProps) => {
  const endHomeworkId = Number(homeworkId);

  const router = useRouter();
  const { addToast } = useToastStore();

  return useApiMutation<void, PostHomeWork>({
    method: 'PUT',
    endpoint: homeworkId ? `/teachers/homeworks/${endHomeworkId}` : '',
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      addToast({
        message: '숙제가 수정되었어요.',
        type: 'success',
        duration: 2500,
      });
      router.push(`/lectures/${lectureId}/homework/detail?id=${homeworkId}`);
    },
    onError: () => {
      addToast({
        message: '숙제 수정에 실패했어요. 다시 시도해주세요.',
        type: 'error',
        duration: 2500,
      });
    },
    invalidateKey:
      homeworkId && lectureId ? [QUERY_KEYS.homeworkList(lectureId), QUERY_KEYS.homeworkDetail(homeworkId)] : [],
  });
};

export const useDeleteHomework = (lectureId: string, successMessage: string) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, string>({
    method: 'DELETE',
    endpoint: (homeworkId) => `/teachers/homeworks/${homeworkId}`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      addToast({
        message: successMessage,
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
    invalidateKey: [QUERY_KEYS.homeworkList(lectureId), QUERY_KEYS.homeworkDraft(lectureId)],
  });
};
