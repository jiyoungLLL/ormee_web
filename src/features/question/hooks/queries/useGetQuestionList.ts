import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { QuestionListFilterType } from '@/features/question/hooks/useQuestionSearchParams';
import { QuestionSearchByType } from '@/features/question/hooks/useQuestionSearchParams';
import { PaginatedQuestionData } from '@/features/question/question.types';
import { getQuestionList } from '@/features/question/api/getQuestionList';

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
    staleTime: 1 * 60 * 1000, // 1분
    gcTime: 5 * 60 * 1000, // 5분,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
