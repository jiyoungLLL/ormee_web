import { http, HttpResponse } from 'msw';
import { MOCK_NOTIFICATION_LIST_BULK } from './notification';
import { CLOSED_QUIZ_STATS_MAP, PROBLEM_STATS_MAP, QUIZ_LIST_RESPONSE_MIXED } from './quiz';
import { QuizState } from '@/types/quiz.types';
import { MOCK_PAGINATED_QUESTION_RESPONSE } from './question';

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
      due_time: new Date().toISOString(),
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

    if (stats.length === 0) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(stats, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('/api/teachers/quizzes/problems/:problemId/stats', ({ params }) => {
    const { problemId } = params;
    const stats = PROBLEM_STATS_MAP[problemId as string] ?? {};

    if (Object.keys(stats).length === 0) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(stats, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('/api/teachers/:lectureId/questions', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const pageSize = Number(url.searchParams.get('page_size') || '10');
    const filter = url.searchParams.get('filter'); // 'answered' | 'unanswered' | undefined

    let filtered = [...MOCK_PAGINATED_QUESTION_RESPONSE];

    if (filter === 'answered') filtered = filtered.filter((q) => q.is_answered);
    if (filter === 'unanswered') filtered = filtered.filter((q) => !q.is_answered);

    const total_count = filtered.length;
    const total_pages = Math.ceil(total_count / pageSize);
    const offset = (page - 1) * pageSize;
    const paginated = filtered.slice(offset, offset + pageSize);

    return HttpResponse.json({
      total_count,
      total_pages,
      current_page: page,
      page_size: pageSize,
      questions: paginated,
    });
  }),
];
