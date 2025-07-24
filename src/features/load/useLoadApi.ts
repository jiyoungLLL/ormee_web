import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useApiQuery } from '@/hooks/useApi';

type UseLoadApiProps = {
  type: string;
  lectureId?: string;
};

export const useLoadApi = <T>({ type, lectureId }: UseLoadApiProps) => {
  return useApiQuery<T>({
    queryKey: QUERY_KEYS.loadDetail(`${type}-${lectureId}`),
    fetchOptions: {
      endpoint:
        type === '숙제'
          ? `/teachers/${lectureId}/homeworks/load`
          : type === '공지'
            ? `/teachers/${lectureId}/notices/load`
            : `/teachers/${lectureId}/quizzes/load`,
      authorization: true,
    },
    queryOptions: {
      enabled: !!lectureId,
      staleTime: 0,
    },
  });
};
