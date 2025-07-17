'use client';

import { QuestionListFilterType } from '@/features/question/hooks/useQuestionSearchParams';
import { QuestionSearchByType } from '@/features/question/hooks/useQuestionSearchParams';
import { fetcher } from '@/utils/api/api';
import { PaginatedQuestionData } from '@/features/question/types/question.types';

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

  const response = await fetcher<PaginatedQuestionData>({
    method: 'GET',
    endpoint: `/teachers/${lectureId}/questions?${params.toString()}`,
  });

  if (response.status === 'fail') {
    throw new Error(response.data);
  }

  return response.data;
};
