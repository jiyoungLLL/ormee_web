import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiMutation, useApiQuery } from '@/hooks/useApi';
import { useToastStore } from '@/stores/toastStore';
import { GetNoteItem, NoteStatsResponse, PostNote } from './note.types';

export const useGetNotes = (lectureId: string) => {
  return useApiQuery<GetNoteItem>({
    queryKey: QUERY_KEYS.noteList(lectureId),
    fetchOptions: {
      endpoint: `/teachers/${lectureId}/memos`,
      authorization: true,
    },
  });
};

export const useGetNoteStats = (noteId: string) => {
  return useApiQuery<NoteStatsResponse>({
    queryKey: QUERY_KEYS.noteStats(noteId),
    fetchOptions: {
      endpoint: `/teachers/memos/${noteId}/stats`,
      authorization: true,
    },
  });
};

export const usePostNotes = (lectureId: string) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, PostNote>({
    method: 'POST',
    endpoint: `/teachers/${lectureId}/memos`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      addToast({
        message: '쪽지가 생성되었어요.',
        type: 'success',
        duration: 2500,
      });
    },
    onError: () => {
      addToast({
        message: '쪽지 생성에 실패했어요. 다시 시도해주세요.',
        type: 'error',
        duration: 2500,
      });
    },
    invalidateKey: [QUERY_KEYS.noteList(lectureId)],
  });
};

export const usePutNotes = (lectureId: string) => {
  const { addToast } = useToastStore();

  return useApiMutation<void, string>({
    method: 'PUT',
    endpoint: (memoId) => `/teachers/memos/${memoId}/close`,
    fetchOptions: {
      authorization: true,
    },
    onSuccess: () => {
      addToast({
        message: '쪽지가 마감되었어요.',
        type: 'success',
        duration: 2500,
      });
    },
    onError: () => {
      addToast({
        message: '쪽지 마감에 실패했어요. 다시 시도해주세요.',
        type: 'error',
        duration: 2500,
      });
    },
    invalidateKey: [QUERY_KEYS.noteList(lectureId)],
  });
};
