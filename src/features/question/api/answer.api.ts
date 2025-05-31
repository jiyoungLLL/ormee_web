import { AnswerFormValues } from '@/features/question/question.types';
import { AnswerResponseSchema } from '@/features/question/question.schema';

export const getAnswer = async (questionId: string) => {
  const response = await fetch(`/api/teachers/questions/${questionId}/answer`);

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);
    throw new Error('답변을 불러오는 중 오류가 발생했습니다.');
  }

  const json = await response.json();
  const parsedData = AnswerResponseSchema.safeParse(json);

  if (!parsedData.success) {
    if (process.env.NODE_ENV === 'development') console.error(parsedData.error);
    throw new Error('답변을 불러오는 중 오류가 발생했습니다.');
  }

  if (parsedData.data.status === 'error') {
    throw new Error(parsedData.data.message);
  }

  return parsedData.data.data;
};

export const postAnswer = async (data: AnswerFormValues, questionId: string) => {
  if (data.content.trim() === '' || data.files.length === 0) {
    throw new Error('답변을 작성해주세요.');
  }

  const formData = new FormData();
  formData.append('content', data.content);
  data.files.forEach((file) => {
    formData.append('files', file.file);
  });

  const response = await fetch(`/api/teachers/questions/${questionId}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);
    throw new Error('답변 등록 중 오류가 발생했습니다.');
  }

  const json = await response.json();
  if (json.status === 'error') {
    if (process.env.NODE_ENV === 'development') console.error(json.message);
    throw new Error(json.message ?? '알 수 없는 오류가 발생했습니다.');
  }
};
