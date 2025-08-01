import { NotificationFilterType } from '@/features/notification/notification.types';
import { QuestionListFilterType, QuestionSearchByType } from '../../features/question/hooks/useQuestionSearchParams';

export const QUERY_KEYS = {
  profile: () => ['profile'],
  personalInfo: () => ['personalInfo'],
  notification: (lectureId: string, filter: NotificationFilterType) => ['notification', lectureId, filter],
  quizDetail: (quizId: string) => ['quizDetail', quizId],
  quizList: (lectureId: string) => ['quizList', lectureId],
  closedQuizStats: (quizId: string) => ['closedQuizStats', quizId],
  temporaryQuizList: (lectureId: string) => ['temporaryQuizList', lectureId],
  problemStats: (problemId: number) => ['problemStats', problemId],
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
  answer: (questionId: string) => ['answer', questionId],
  homeworkList: (lectureId: string) => ['homeworkList', lectureId],
  homeworkDraft: (lectureId: string) => ['homeworkDraft', lectureId],
  homeworkDetail: (homeworkId: string) => ['homeworkDetail', homeworkId],
  classList: () => ['classList'],
  classDetail: (lectureId: string) => ['classDetail', lectureId],
  classLoadList: () => ['classLoadList'],
  loadDetail: (key: string) => ['loadDetail', key],
  noteList: (lectureId: string) => ['noteList', lectureId],
  noteStats: (noteId: string) => ['noteStats', noteId],
  noticeList: ({ lectureId, page, keyword }: { lectureId: string; page?: number; keyword?: string }) => [
    'noticeList',
    lectureId,
    page ?? 1,
    keyword ?? '',
  ],
  noticeDraft: (lectureId: string) => ['noticeDraft', lectureId],
  noticeDetail: (noticeId: string) => ['noticeDetail', noticeId],
  noticePinned: (lectureId: string) => ['noticePinned', lectureId],
  noticeLoad: (lectureId: string) => ['noticeLoad', lectureId],
  home: (lectureId: string) => ['home', lectureId],
  studentHomework: (homeworkId: string) => ['studentHomework', homeworkId],
  homeworkSubmissions: (homeworkId: number) => ['homeworkSubmissions', homeworkId],
  homeworkSubmissionDetail: (homeworkSubmitId: number) => ['homeworkSubmissionDetail', homeworkSubmitId],
  feedback: (homeworkdSubmitId: number) => ['feedback', homeworkdSubmitId],
} as const;
