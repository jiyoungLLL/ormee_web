import { http, HttpResponse } from 'msw';
import { MOCK_NOTIFICATION_LIST_BULK } from './notification';
import {
  CLOSED_QUIZ_STATS_MAP,
  PROBLEM_STATS_MAP,
  QUIZ_DETAIL_MAP,
  QUIZ_LIST_RESPONSE_MIXED,
  TEMPORARY_QUIZ_LIST,
} from './quiz';
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
  http.get('/api/teachers/:lectureId/quizzes/temporary', () => {
    return HttpResponse.json(TEMPORARY_QUIZ_LIST, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('/api/teachers/quizzes/:quizId', ({ params }) => {
    const { quizId } = params;
    const quiz = QUIZ_DETAIL_MAP[quizId as string];

    if (!quiz) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(quiz, {
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
    const pageSize = Number(url.searchParams.get('pageSize') ?? '15');
    const filter = url.searchParams.get('filter'); // 'answered' | 'unanswered' | undefined

    let filtered = [...MOCK_PAGINATED_QUESTION_RESPONSE];

    if (filter === '답변 등록') filtered = filtered.filter((q) => q.isAnswered);
    if (filter === '답변 미등록') filtered = filtered.filter((q) => !q.isAnswered);

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const offset = (page - 1) * pageSize;
    const paginated = filtered.slice(offset, offset + pageSize);

    return HttpResponse.json({
      status: 'success',
      code: 200,
      data: {
        totalCount,
        totalPages,
        currentPage: page,
        pageSize,
        questions: paginated,
      },
    });
  }),
  http.get('/api/teachers/questions/:questionId', ({ params }) => {
    const { questionId } = params;
    const question = MOCK_PAGINATED_QUESTION_RESPONSE.find((q) => q.id === questionId);

    if (!question) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(
      { status: 'success', code: 200, data: question },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
];
