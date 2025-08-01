import { http, HttpResponse } from 'msw';
import { QUIZ_ATTACHMENT_MAP, QUIZ_DB, QUIZ_DETAIL_MAP } from './quiz';
import { MOCK_ANSWER, MOCK_PAGINATED_QUESTION_RESPONSE } from './question';
import { QuizCreateRequestSchema, QuizDraftRequestSchema } from '@/features/quiz/schemas/quiz.schema';

export const handlers = [
  http.get('/api/teachers/:lectureId/quizzes/', () => {
    const quizList = Object.entries(QUIZ_DB)
      .filter(([_, quiz]) => !quiz.isDraft)
      .map(([id, quiz]) => ({
        id,
        quizName: quiz.title,
        quizDate: quiz.openTime,
        timeLimit: quiz.timeLimit,
        quizAvailable: false,
        submitCount: 3,
      }));

    return HttpResponse.json(
      {
        status: 'success',
        code: 200,
        data: {
          openQuizzes: quizList,
          closedQuizzes: [],
        },
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.put('/api/teachers/quizzes/:quizId/:state', ({ params }) => {
    // const { quizId, state } = params;
    // const quizIndex = QUIZ_LIST_RESPONSE_MIXED.findIndex((quiz) => quiz.id === quizId);
    // if (quizIndex === -1) {
    //   return new HttpResponse(null, { status: 404 });
    // }
    // QUIZ_LIST_RESPONSE_MIXED[quizIndex] = {
    //   ...QUIZ_LIST_RESPONSE_MIXED[quizIndex],
    //   state: state as QuizState,
    //   due_time: new Date().toISOString(),
    // };
    // return HttpResponse.json(
    //   { message: '퀴즈 상태 변경에 성공했습니다.' },
    //   {
    //     status: 200,
    //   },
    // );
  }),
  http.get('/api/teachers/:lectureId/quizzes/temporary', () => {
    // return HttpResponse.json(TEMPORARY_QUIZ_LIST, {
    //   status: 200,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
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
  http.get('/api/teachers/:lectureId/questions', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const pageSize = Number(url.searchParams.get('pageSize') ?? '10');
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
  http.post('/api/teachers/questions/:questionId', async ({ params, request }) => {
    const { questionId } = params;
    const question = MOCK_PAGINATED_QUESTION_RESPONSE.find((q) => q.id === questionId);

    if (!question) {
      return new HttpResponse(null, { status: 404 });
    }

    const formData = await request.formData();
    const content = formData.get('content') as string;
    const files = formData.getAll('files') as File[];

    // Blob URL 생성
    const imageUrls = files.map((file) => {
      const blob = new Blob([file], { type: file.type });
      return URL.createObjectURL(blob);
    });

    const newAnswer = {
      id: crypto.randomUUID(),
      author: '강수이',
      content,
      files: imageUrls.map((url) => ({ id: crypto.randomUUID(), url })),
      createdAt: new Date().toISOString(),
    };

    MOCK_ANSWER.push(newAnswer);
    question.isAnswered = true;

    return HttpResponse.json(
      {
        status: 'success',
        code: 200,
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.get('/api/teachers/questions/:questionId/answer', ({ params }) => {
    const { questionId } = params;
    const question = MOCK_PAGINATED_QUESTION_RESPONSE.find((q) => q.id === questionId);

    if (!question) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(
      {
        status: 'success',
        code: 200,
        data: MOCK_ANSWER,
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.delete('/api/teachers/questions/answers/:answerId', ({ params }) => {
    const { answerId } = params;
    const answerIndex = MOCK_ANSWER.findIndex((a) => a.id === answerId);

    if (answerIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    MOCK_ANSWER.splice(answerIndex, 1);

    return HttpResponse.json(
      {
        status: 'success',
        code: 200,
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.post('/api/attachment', async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return HttpResponse.json(
        {
          status: 'error',
          code: 400,
          message: '파일이 없습니다.',
        },
        { status: 400 },
      );
    }

    const id = crypto.randomUUID();
    const previewUrl = URL.createObjectURL(file);

    QUIZ_ATTACHMENT_MAP[id] = previewUrl;

    return HttpResponse.json(
      {
        status: 'success',
        code: 200,
        data: id,
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.post('/api/teachers/:lectureId/quizzes', async ({ request, params }) => {
    const body = (await request.json()) as { isDraft: boolean };
    const { isDraft } = body;

    const schema = isDraft ? QuizDraftRequestSchema : QuizCreateRequestSchema;
    const validatedBody = schema.parse(body);

    const id = crypto.randomUUID();
    QUIZ_DB[id] = validatedBody;

    return HttpResponse.json(
      {
        status: 'success',
        code: 200,
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
];
