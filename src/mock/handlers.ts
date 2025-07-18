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
