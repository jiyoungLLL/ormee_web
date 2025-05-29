'use client';

import { QuestionListFilterType } from '@/features/question/hooks/useQuestionSearchParams';
import { QuestionSearchByType } from '@/features/question/hooks/useQuestionSearchParams';
import { validateQuestionListResponse } from './validateQuestionResponse';

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

  return validateQuestionListResponse(response);
};
