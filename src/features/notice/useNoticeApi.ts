import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiMutation, useApiQuery } from '@/hooks/useApi';
import { useToastStore } from '@/stores/toastStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { NoticeDetail, NoticeDraft, NoticeItems, NoticeList, PostNotice } from './notice.types';

export const usePostNotice = (lectureId: string, successMessage: string) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, PostNotice>({
    method: 'POST',
    endpoint: `/teachers/${lectureId}/notices`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      addToast({
        message: successMessage,
        type: 'success',
      });
    },
    onError: () => {
      addToast({
        message: '공지 생성에 실패했어요. 다시 시도해주세요.',
        type: 'error',
      });
    },
    invalidateKey: [QUERY_KEYS.noticeList({ lectureId }), QUERY_KEYS.noticeDraft(lectureId)],
  });
};

export const useSearchNotice = (lectureId: string, keyword: string, page: number) => {
  return useApiQuery<NoticeList>({
    queryKey: QUERY_KEYS.noticeList({ lectureId, page, keyword }),
    fetchOptions: {
      endpoint: `/teachers/${lectureId}/notices/search?keyword=${keyword}&page=${page}`,
      authorization: true,
    },
  });
};

export const useGetNotices = (lectureId: string, page?: number) => {
  return useApiQuery<NoticeList>({
    queryKey: QUERY_KEYS.noticeList({ lectureId, page }),
    fetchOptions: {
      endpoint: `/teachers/${lectureId}/notices?page=${page}`,
      authorization: true,
    },
  });
};

export const useGetPinnedNotices = (lectureId: string) => {
  return useApiQuery<NoticeItems[]>({
    queryKey: QUERY_KEYS.noticePinned(lectureId),
    fetchOptions: {
      endpoint: `/teachers/${lectureId}/notices/pinned`,
      authorization: true,
    },
  });
};

export const useGetDraftNotice = (lectureId: string) => {
  return useApiQuery<NoticeDraft[]>({
    queryKey: QUERY_KEYS.noticeDraft(lectureId),
    fetchOptions: {
      endpoint: `/teachers/${lectureId}/notices/draft`,
      authorization: true,
    },
  });
};

export const useGetLoadNotice = (lectureId: string) => {
  return useApiQuery<NoticeItems>({
    queryKey: QUERY_KEYS.noticeLoad(lectureId),
    fetchOptions: {
      endpoint: `/teachers/${lectureId}/notices/load`,
      authorization: true,
    },
  });
};

export const useGetNoticeDetails = (noitceId: string) => {
  return useApiQuery<NoticeDetail>({
    queryKey: QUERY_KEYS.noticeDetail(noitceId),
    fetchOptions: {
      endpoint: `/teachers/notices/${noitceId}`,
      authorization: true,
    },
  });
};

export const usePutNotice = (lectureId: string, noticeId: string) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, PostNotice>({
    method: 'PUT',
    endpoint: `/teachers/notices/${noticeId}`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      addToast({
        message: '공지가 수정되었어요.',
        type: 'success',
      });
    },
    onError: () => {
      addToast({
        message: '공지 수정에 실패했어요. 다시 시도해주세요.',
        type: 'error',
      });
    },
    invalidateKey: [QUERY_KEYS.noticeDetail(noticeId), QUERY_KEYS.noticeList({ lectureId })],
  });
};

export const usePinNotice = (lectureId: string, page: number, noticeId: string) => {
  const { addToast } = useToastStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  return useApiMutation<void, void>({
    method: 'PUT',
    endpoint: `/teachers/notices/${noticeId}/pin`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      params.set('ispinned', 'true');
      router.replace(`?${params.toString()}`);
      addToast({
        message: '공지가 고정되었어요.',
        type: 'success',
      });
    },
    onError: (err) => {
      addToast({
        message: err.message,
        type: 'error',
      });
    },
    invalidateKey: [
      QUERY_KEYS.noticeDetail(noticeId),
      QUERY_KEYS.noticeList({ lectureId, page }),
      QUERY_KEYS.noticePinned(lectureId),
    ],
  });
};

export const useUnpinNotice = (lectureId: string, page: number, noticeId: string) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, void>({
    method: 'PUT',
    endpoint: `/teachers/notices/${noticeId}/unpin`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      addToast({
        message: '공지가 고정 해제되었어요.',
        type: 'success',
      });
    },
    onError: () => {
      addToast({
        message: '공지 고정 해제에 실패했어요. 다시 시도해주세요.',
        type: 'error',
      });
    },
    invalidateKey: [
      QUERY_KEYS.noticeDetail(noticeId),
      QUERY_KEYS.noticeList({ lectureId, page }),
      QUERY_KEYS.noticePinned(lectureId),
    ],
  });
};

export const useDeleteNotice = (lectureId: string, successMessage: string) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, string>({
    method: 'DELETE',
    endpoint: (noticeId) => `/teachers/notices/${noticeId}`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      addToast({
        message: successMessage,
        type: 'success',
      });
    },
    onError: (err) => {
      addToast({
        message: err.message,
        type: 'error',
      });
    },
    invalidateKey: [QUERY_KEYS.noticeList({ lectureId }), QUERY_KEYS.noticeDraft(lectureId)],
  });
};
