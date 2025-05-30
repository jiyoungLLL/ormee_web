import { AnswerResponse, Question } from '@/features/question/question.types';

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

export const MOCK_ANSWER: AnswerResponse = [
  {
    id: 'mock-answer-1',
    content: '답변 내용',
    files: [
      {
        id: 'mock-answer-file-1',
        url: 'https://img.freepik.com/free-photo/miniature-chihuahua-dog-concept_53876-41435.jpg',
      },
      {
        id: 'mock-answer-file-2',
        url: 'https://img.freepik.com/free-photo/miniature-chihuahua-dog-concept_53876-31121.jpg',
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];
