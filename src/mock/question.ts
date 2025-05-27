import { Question } from '@/types/question.types';

export const MOCK_PAGINATED_QUESTION_RESPONSE: Question[] = Array.from({ length: 42 }, (_, i) => ({
  id: (i + 1).toString(),
  order: i + 1,
  title: `질문 제목 ${i + 1}`,
  content: `질문 내용 ${i + 1}이 궁금해요`,
  isAnswered: i % 3 === 0,
  author: i % 2 === 0 ? '오르미' : '김민영',
  filePaths: [
    'https://img.freepik.com/free-vector/gradient-international-day-education-illustration_23-2150011975.jpg',
  ],
  createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 12).toISOString(),
}));
