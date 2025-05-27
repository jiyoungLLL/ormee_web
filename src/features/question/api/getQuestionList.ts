'use client';

import { PaginatedQuestionDataSchema, PaginatedQuestionResponseSchema } from '@/schemas/question.schema';
import { QuestionListFilterType } from '@/features/question/hooks/useQuestionSearchParams';
import { QuestionSearchByType } from '@/features/question/hooks/useQuestionSearchParams';

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
