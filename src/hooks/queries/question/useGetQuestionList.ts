import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { QuestionListFilterType } from '@/hooks/question/useQuestionSearchParams';
import { QuestionSearchByType } from '@/hooks/question/useQuestionSearchParams';
import { PaginatedQuestion } from '@/types/question.types';
import { PaginatedQuestionResponseSchema } from '@/schemas/question.schema';
import { transformPaginatedQuestionResponseToCamelCase } from '@/utils/transforms/question.transform';

const getQuestionList = async ({
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
  const params = new URLSearchParams();

  if (filter) params.append('filter', filter);
  if (page) params.append('page', String(page));
  if (searchBy) params.append('searchBy', searchBy);
  if (keyword) params.append('keyword', keyword);

  const response = await fetch(`/api/teachers/${lectureId}/questions?${params}`);

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);
    throw new Error('질문 목록을 불러오는데 에러가 발생했습니다.');
  }

  const json = await response.json();
  const parsedData = PaginatedQuestionResponseSchema.safeParse(json);

  if (!parsedData.success) {
    if (process.env.NODE_ENV === 'development') console.error(parsedData.error);
    throw new Error('잘못된 질문 목록입니다.');
  }

  return transformPaginatedQuestionResponseToCamelCase(parsedData.data);
};

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
  return useQuery<PaginatedQuestion>({
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
