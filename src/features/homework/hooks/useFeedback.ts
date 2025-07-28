import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiMutation, useApiQuery } from '@/hooks/useApi';
import { useToastStore } from '@/stores/toastStore';
import { Feedback } from '../types/feedback.types';

export const useGetHomeworkSubmissions = (homeworkId: number) => {
  return useApiQuery({
    queryKey: QUERY_KEYS.homeworkSubmissions(homeworkId),
    fetchOptions: {
      endpoint: `/techaers/homeworks/${homeworkId}/students/submit`,
      authorization: true,
    },
  });
};

export const useGetHomeworSubmissionDetail = (homeworkSubmitId: number) => {
  return useApiQuery({
    queryKey: QUERY_KEYS.homeworkSubmissionDetail(homeworkSubmitId),
    fetchOptions: {
      endpoint: `/students/homeworks/submit/${homeworkSubmitId}`,
      authorization: true,
    },
  });
};

export const usePostFeedback = (homeworkSubmitId: number) => {
  const { addToast } = useToastStore();

  return useApiMutation<Feedback>({
    method: 'POST',
    endpoint: `/techers/homeworks/submissions/${homeworkSubmitId}`,
    fetchOptions: {
      authorization: true,
    },
    onError: (err) => {
      addToast({ message: err.message, type: 'error' });
    },
    invalidateKey: QUERY_KEYS.feedback(homeworkSubmitId),
  });
};

export const useGetFeedback = (homeworkSubmitId: number) => {
  return useApiQuery({
    queryKey: QUERY_KEYS.feedback(homeworkSubmitId),
    fetchOptions: {
      endpoint: `/teachers/homeworks/submissions/${homeworkSubmitId}`,
      authorization: true,
    },
  });
};

// export const usePutFeedback = (homeworkSubmitId: number) => {
//     const {addToast} = useToastStore()

//     return useApiMutation({
//         method: 'PUT',
//         endpoint: `/techers/homeworks/feedback/${feeebackId}`
//     })
// }
