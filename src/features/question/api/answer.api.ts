import { AnswerFormValues } from '@/features/question/question.types';

export const postAnswer = async (data: AnswerFormValues, questionId: string) => {
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
