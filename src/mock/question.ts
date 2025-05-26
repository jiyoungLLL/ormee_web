import { QuestionResponse } from '@/types/question.types';

export const MOCK_PAGINATED_QUESTION_RESPONSE: QuestionResponse[] = Array.from({ length: 42 }, (_, i) => ({
  id: (i + 1).toString(),
  order: i + 1,
  title: `질문 제목 ${i + 1}`,
  author: i % 2 === 0 ? '오르미' : '김민영',
  created_at: new Date(Date.now() - i * 1000 * 60 * 60 * 12).toISOString(),
  is_answered: i % 3 === 0,
}));
