export const QUERY_KEYS = {
  notification: () => ['notification'],
  quizDetail: (quizId: string) => ['quizDetail', quizId],
  quizList: (lectureId: string) => ['quizList', lectureId],
  closedQuizStats: (quizId: string) => ['closedQuizStats', quizId],
} as const;
