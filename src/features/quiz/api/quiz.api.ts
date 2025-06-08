import { QuizCreateRequest, QuizDraftRequest } from '@/features/quiz/quiz.types';
import { QuizCreateRequestSchema, QuizDraftRequestSchema } from '@/features/quiz/quiz.schema';

export const postQuiz = async (lectureId: string, quiz: QuizCreateRequest | QuizDraftRequest) => {
  const { isDraft } = quiz;
  const schema = isDraft ? QuizDraftRequestSchema : QuizCreateRequestSchema;
  const validatedQuiz = schema.safeParse(quiz);

  if (!validatedQuiz.success) {
    if (process.env.NODE_ENV === 'development') console.error(validatedQuiz.error);
    throw new Error(`퀴즈 ${isDraft ? '임시저장' : '생성'}에 실패했어요. 입력값을 확인해주세요. `);
  }

  const response = await fetch(`/api/teachers/${lectureId}/quizzes`, {
    method: 'POST',
    body: JSON.stringify(quiz),
  });

  if (!response.ok) {
    throw new Error(`퀴즈 ${isDraft ? '임시저장' : '생성'}에 실패했어요. 다시 시도해주세요.`);
  }

  return response.json();
};
