import { http, HttpResponse } from 'msw';
import { MOCK_NOTIFICATION_LIST_BULK } from './notification';

export const handlers = [
  http.get('/api/teacher/notification/', () => {
    return HttpResponse.json(MOCK_NOTIFICATION_LIST_BULK, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
