'use server';

import { fetcher } from '@/utils/api/api';
import { QuizList, QuizListResponse } from '@/features/quiz/quiz.types';
import { ActionResponse } from '@/types/response.types';
import { QuizListResponseSchema } from '../quiz.schema';
import { QUIZ_LIMIT_TIME_MAP_TO_RENDER } from '../quiz.constants';

export const getQuizListAction = async (lectureId: string): Promise<ActionResponse<QuizList>> => {
  const response = await fetcher<QuizListResponse>({
    method: 'GET',
    endpoint: `/teachers/${lectureId}/quizzes`,
    authorization: true,
    errorMessage: '퀴즈 목록을 불러오는데 실패했어요.',
  });

  if (response.status === 'error') {
    if (process.env.NODE_ENV === 'development') console.error('----- quizList api 에러 ------');
    if (process.env.NODE_ENV === 'development') console.error(response);

    return {
      status: 'error',
      code: response.code,
      message: response.message,
    };
  }

  const parsedResponse = QuizListResponseSchema.safeParse(response.data);
  if (!parsedResponse.success) {
    if (process.env.NODE_ENV === 'development') console.error('----- quizList 파싱 에러 ------');
    if (process.env.NODE_ENV === 'development') console.error(parsedResponse.error);

    return {
      status: 'error',
      code: 500,
      message: '올바르지 않은 퀴즈 목록 형식이에요.',
    };
  }

  const totalCount = 20; // TODO: API 수정 후 응답 데이터로 변경

  const quizList: QuizList = {
    openQuizzes: parsedResponse.data.openQuizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.quizName,
      dueTime: quiz.quizDate,
      isAvailable: quiz.quizAvailable,
      state: quiz.quizAvailable ? 'ongoing' : 'ready',
      limitTime: QUIZ_LIMIT_TIME_MAP_TO_RENDER[quiz.timeLimit],
      submitCount: quiz.submitCount,
      totalCount: totalCount,
    })),
    closedQuizzes: parsedResponse.data.closedQuizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.quizName,
      dueTime: quiz.quizDate,
      isAvailable: quiz.quizAvailable,
      state: 'closed',
      limitTime: QUIZ_LIMIT_TIME_MAP_TO_RENDER[quiz.timeLimit],
      submitCount: quiz.submitCount,
      totalCount: totalCount,
    })),
  };

  return {
    status: 'success',
    code: 200,
    data: quizList,
  };
};
