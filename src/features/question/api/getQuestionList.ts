'use client';

import { QuestionSearchByType } from '@/features/question/hooks/useQuestionSearchParams';
import { fetcher } from '@/utils/api/api';
import { PaginatedQuestionData } from '@/features/question/types/question.types';

export const QUESTION_FILTER_MAP: Record<QuestionSearchByType, string> = {
  title: '제목',
  content: '내용',
  author: '작성자',
  all: '전체',
};

export const getQuestionList = async ({
  lectureId,
  page,
  searchBy,
  keyword,
}: {
  lectureId: string;
  page?: number;
  searchBy?: QuestionSearchByType;
  keyword?: string;
}) => {
  const params = new URLSearchParams();
  let baseEndpoint = `/teachers/${lectureId}/questions`;

  if (searchBy && keyword) {
    baseEndpoint = `/teachers/${lectureId}/questions/search`;
    if (searchBy) params.append('filter', QUESTION_FILTER_MAP[searchBy]);
    if (keyword) params.append('keyword', keyword);
  }

  if (page) params.append('page', String(page));

  const endpoint = `${baseEndpoint}?${params.toString()}`;

  const response = await fetcher<PaginatedQuestionData>({
    method: 'GET',
    endpoint,
  });

  if (response.status === 'fail') {
    throw new Error(response.data);
  }

  return response.data;
};
