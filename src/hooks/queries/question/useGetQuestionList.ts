import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { QuestionListFilterType } from '@/hooks/question/useQuestionSearchParams';
import { QuestionSearchByType } from '@/hooks/question/useQuestionSearchParams';
import { PaginatedQuestionDataSchema, PaginatedQuestionResponseSchema } from '@/schemas/question.schema';
import { PaginatedQuestionData } from '@/types/question.types';

export const getQuestionList = async ({
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

  const response = await fetch(`/api/teachers/${lectureId}/questions?${params}`, {
    method: 'GET',
  });

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);
    throw new Error('질문 목록을 불러오는데 에러가 발생했습니다.');
  }

  const json = await response.json();
  const parsedData = PaginatedQuestionResponseSchema.safeParse(json);

  if (!parsedData.success) {
    if (process.env.NODE_ENV === 'development') console.error(parsedData.error);
    throw new Error('질문 리스트 응답 데이터가 예상과 다릅니다.');
  }

  if (parsedData.data.status === 'error') {
    throw new Error(parsedData.data.message ?? '알 수 없는 오류가 발생했습니다.');
  }

  const parsedQuestionData = PaginatedQuestionDataSchema.safeParse(parsedData.data.data);

  if (!parsedQuestionData.success) {
    if (process.env.NODE_ENV === 'development') console.error(parsedQuestionData.error);
    throw new Error('질문 리스트 데이터가 예상과 다릅니다.');
  }

  return parsedQuestionData.data;
};

export const getQuestionListOnServer = async ({
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

  const response = await fetch(`http://localhost:8080/api/teachers/${lectureId}/questions?${params}`, {
    method: 'GET',
  });

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);
    throw new Error('질문 목록을 불러오는데 에러가 발생했습니다.');
  }

  const json = await response.json();
  const parsedData = PaginatedQuestionResponseSchema.safeParse(json);

  if (!parsedData.success) {
    if (process.env.NODE_ENV === 'development') console.error(parsedData.error);
    throw new Error('질문 리스트 응답 데이터가 예상과 다릅니다.');
  }

  if (parsedData.data.status === 'error') {
    throw new Error(parsedData.data.message ?? '알 수 없는 오류가 발생했습니다.');
  }

  const parsedQuestionData = PaginatedQuestionDataSchema.safeParse(parsedData.data.data);

  if (!parsedQuestionData.success) {
    if (process.env.NODE_ENV === 'development') console.error(parsedQuestionData.error);
    throw new Error('질문 리스트 데이터가 예상과 다릅니다.');
  }

  return parsedQuestionData.data;
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
