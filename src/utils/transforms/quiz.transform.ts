import {
  ClosedQuizStats,
  ClosedQuizStatsResponse,
  ProblemStats,
  ProblemStatsResponse,
  QuizList,
  QuizListResponse,
} from '@/features/quiz/quiz.types';

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

export const transformProblemStatsToCamelCase = (response: ProblemStatsResponse): ProblemStats => {
  const base = {
    problemLabel: response.problem_label,
    description: response.description,
    type: response.type,
  };

  if (response.type === 'CHOICE') {
    return {
      ...base,
      type: 'CHOICE',
      items: response.items.map((item) => ({
        text: item.text,
        isAnswer: item.is_answer,
        selectedStudents: item.selected_students,
      })),
    };
  } else {
    return {
      ...base,
      type: 'ESSAY',
      answer: response.answer,
      incorrectSubmit: response.incorrect_submit.map((submit) => ({
        rank: submit.rank,
        answer: submit.answer,
        incorrectStudents: submit.incorrect_students,
      })),
    };
  }
};
