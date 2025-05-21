import { http, HttpResponse } from 'msw';
import { MOCK_NOTIFICATION_LIST_BULK } from './notification';
import { CLOSED_QUIZ_STATS_MAP, QUIZ_LIST_RESPONSE_MIXED } from './quiz';
import { QuizState } from '@/types/quiz.types';

export const handlers = [
  http.get('/api/teacher/notification/', () => {
    return HttpResponse.json(MOCK_NOTIFICATION_LIST_BULK, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('/api/teachers/:lectureId/quizzes/', () => {
    return HttpResponse.json(QUIZ_LIST_RESPONSE_MIXED, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.put('/api/teachers/quizzes/:quizId/:state', ({ params }) => {
    const { quizId, state } = params;
    const quizIndex = QUIZ_LIST_RESPONSE_MIXED.findIndex((quiz) => quiz.id === quizId);

    if (quizIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    QUIZ_LIST_RESPONSE_MIXED[quizIndex] = {
      ...QUIZ_LIST_RESPONSE_MIXED[quizIndex],
      state: state as QuizState,
      updated_at: new Date().toISOString(),
    };

    return HttpResponse.json(
      { message: '퀴즈 상태 변경에 성공했습니다.' },
      {
        status: 200,
      },
    );
  }),
  http.get('/api/teachers/quizzes/:quizId/stats', ({ params }) => {
    const { quizId } = params;
    const stats = CLOSED_QUIZ_STATS_MAP[quizId as string] ?? [];

    return HttpResponse.json(stats, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
