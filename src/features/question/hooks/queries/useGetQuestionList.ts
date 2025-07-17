import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { QuestionListFilterType } from '@/features/question/hooks/useQuestionSearchParams';
import { QuestionSearchByType } from '@/features/question/hooks/useQuestionSearchParams';
import { PaginatedQuestionData } from '@/features/question/types/question.types';
import { getQuestionList } from '@/features/question/api/getQuestionList';
import { useApiQuery } from '@/hooks/useApi';

export const useGetQuestionList = ({
  lectureId,
  filter,
  page,
  searchBy,
  keyword,
}: {
  lectureId: string;
  filter?: QuestionListFilterType;
  page?: number;
  searchBy?: QuestionSearchByType;
  keyword?: string;
}) => {
  return useQuery<PaginatedQuestionData>({
    queryKey: QUERY_KEYS.questionList({ lectureId, filter, page, searchBy, keyword }),
    queryFn: () => getQuestionList({ lectureId, filter, page, searchBy, keyword }),
    enabled: !!lectureId,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });
};
