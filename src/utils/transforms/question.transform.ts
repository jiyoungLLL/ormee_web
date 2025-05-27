import { PaginatedQuestion, PaginatedQuestionResponse, Question, QuestionResponse } from '@/types/question.types';

export const transformPaginatedQuestionResponseToCamelCase = (
  response: PaginatedQuestionResponse,
): PaginatedQuestion => {
  return {
    ...response,
    totalCount: response.total_count,
    totalPages: response.total_pages,
    currentPage: response.current_page,
    pageSize: response.page_size,
    questions: response.questions.map(transformQuestionResponseToCamelCase),
  };
};

export const transformQuestionResponseToCamelCase = (response: QuestionResponse): Question => {
  return {
    ...response,
    createdAt: response.created_at,
    isAnswered: response.is_answered,
  };
};
