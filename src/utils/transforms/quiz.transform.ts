import { ClosedQuizStats, ClosedQuizStatsResponse, QuizList, QuizListResponse } from '@/types/quiz.types';

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

export const transformClosedQuizStatsToCamelCase = (response: ClosedQuizStatsResponse): ClosedQuizStats => {
  return response.map((stat) => ({
    ...stat,
    problemId: stat.problem_id,
    problemLabel: stat.problem_label,
    incorrectRate: stat.incorrect_rate,
    incorrectStudents: stat.incorrect_students,
  }));
};
