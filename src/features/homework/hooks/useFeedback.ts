import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiMutation, useApiQuery } from '@/hooks/useApi';
import { useToastStore } from '@/stores/toastStore';
import { Feedback } from '../feedback.schema';
import { FeedbackList, SubmitDetail } from '../types/feedback.types';
import { StudentHomework } from '../types/homework.types';

export const useGetHomeworkSubmissions = (homeworkId: number) => {
  return useApiQuery<StudentHomework[]>({
    queryKey: QUERY_KEYS.homeworkSubmissions(homeworkId),
    fetchOptions: {
      endpoint: `/teachers/homeworks/${homeworkId}/students/submit`,
      authorization: true,
    },
  });
};

export const useGetHomeworkSubmissionDetail = (homeworkSubmitId: number) => {
  return useApiQuery<SubmitDetail>({
    queryKey: QUERY_KEYS.homeworkSubmissionDetail(homeworkSubmitId),
    fetchOptions: {
      endpoint: `/students/homeworks/submit/${homeworkSubmitId}`,
      authorization: true,
    },
  });
};

export const usePostFeedback = (homeworkSubmitId: number, homeworkId: number, success: () => void) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, Feedback>({
    method: 'POST',
    endpoint: `/teachers/homeworks/submissions/${homeworkSubmitId}`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: success,
    onError: (err) => {
      addToast({ message: err.message, type: 'error' });
    },
    invalidateKey: [QUERY_KEYS.feedback(homeworkSubmitId), QUERY_KEYS.homeworkSubmissions(homeworkId)],
  });
};

export const useGetFeedback = (homeworkSubmitId: number) => {
  return useApiQuery<FeedbackList[]>({
    queryKey: QUERY_KEYS.feedback(homeworkSubmitId),
    fetchOptions: {
      endpoint: `/teachers/homeworks/submissions/${homeworkSubmitId}`,
      authorization: true,
    },
  });
};

export const usePutFeedback = (homeworkSubmitId: number, feedbackId: number, success: () => void) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, Feedback>({
    method: 'PUT',
    endpoint: `/teachers/homeworks/feedback/${feedbackId}`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: success,
    onError: (err) => {
      addToast({ message: err.message, type: 'error' });
    },
    invalidateKey: [QUERY_KEYS.feedback(homeworkSubmitId)],
  });
};

export const useDeleteFeedback = (homeworkId: number) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, number>({
    method: 'DELETE',
    endpoint: (feedbackId) => `/teachers/homeworks/feedback/${feedbackId}`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      addToast({
        message: '피드백이 삭제되었어요.',
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
    invalidateKey: QUERY_KEYS.feedback(homeworkId),
  });
};
