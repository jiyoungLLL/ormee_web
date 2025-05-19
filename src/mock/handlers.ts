import { http, HttpResponse } from 'msw';
import { MOCK_NOTIFICATION_LIST_BULK } from './notification';
import { QUIZ_LIST_RESPONSE_MIXED } from './quiz';
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
];
