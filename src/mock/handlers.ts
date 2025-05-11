import { http, HttpResponse } from 'msw';
import { MOCK_NOTIFICATION_LIST } from './notification';

export const handlers = [
  http.get('/api/teacher/notification/', () => {
    return HttpResponse.json(MOCK_NOTIFICATION_LIST, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
