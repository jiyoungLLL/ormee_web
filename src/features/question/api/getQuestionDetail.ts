import { QuestionDetailResponseSchema, QuestionSchema } from '@/features/question/schemas/question.schema';

export const getQuestionDetail = async (questionId: string) => {
  const response = await fetch(`/api/teachers/questions/${questionId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);
    throw new Error('질문 상세 정보를 불러오는데 에러가 발생했습니다.');
  }

  const json = await response.json();
  const parsedData = QuestionDetailResponseSchema.safeParse(json);

  if (!parsedData.success) {
    if (process.env.NODE_ENV === 'development') console.error(parsedData.error);
    throw new Error('질문 상세 정보 응답 데이터가 예상과 다릅니다.');
  }

  if (parsedData.data.status === 'error') {
    throw new Error(parsedData.data.message ?? '알 수 없는 오류가 발생했습니다.');
  }

  const parsedQuestionData = QuestionSchema.safeParse(parsedData.data.data);

  if (!parsedQuestionData.success) {
    if (process.env.NODE_ENV === 'development') console.error(parsedQuestionData.error);
    throw new Error('질문 상세 정보 데이터가 예상과 다릅니다.');
  }

  return parsedQuestionData.data;
};
