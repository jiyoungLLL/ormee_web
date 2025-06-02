import { QuestionListFilterType, QuestionSearchByType } from '../../features/question/hooks/useQuestionSearchParams';

export const QUERY_KEYS = {
  notification: () => ['notification'],
  quizDetail: (quizId: string) => ['quizDetail', quizId],
  quizList: (lectureId: string) => ['quizList', lectureId],
  closedQuizStats: (quizId: string) => ['closedQuizStats', quizId],
  temporaryQuizList: (lectureId: string) => ['temporaryQuizList', lectureId],
  problemStats: (problemId: string) => ['problemStats', problemId],
  questionList: ({
    lectureId,
    filter,
    page,
    searchBy,
    keyword,
  }: {
    lectureId: string;
    filter?: QuestionListFilterType;
    page?: number;
    searchBy?: QuestionSearchByType;
    keyword?: string;
  }) => ['questionList', lectureId, filter, page, searchBy, keyword],
  questionDetail: (questionId: string) => ['questionDetail', questionId],
  homeworkList: (lectureId: string) => ['homeworkList', lectureId],
  homeworkDetail: (homeworkId: string) => ['homeworkDetail', homeworkId],
} as const;
