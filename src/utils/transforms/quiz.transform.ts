import { QuizList, QuizListResponse } from '@/schemas/quiz.schema';

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
