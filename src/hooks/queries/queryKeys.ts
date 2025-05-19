export const QUERY_KEYS = {
  notification: () => ['notification'],
  quizList: (lectureId: string) => ['quizList', lectureId],
  quiz: (id: string) => ['quiz', id],
} as const;
