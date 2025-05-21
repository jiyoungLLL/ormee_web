import { QuizList, QuizListResponse } from '@/types/quiz.types';

export const transformQuizListToCamelCase = (response: QuizListResponse): QuizList => {
  return response.map((quiz) => ({
    ...quiz,
    dueTime: quiz.due_time,
    limitTime: quiz.limit_time,
    updatedAt: quiz.updated_at,
    submitStudents: quiz.submit_students,
    totalStudents: quiz.total_students,
  }));
};
