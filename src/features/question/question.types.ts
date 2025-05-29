import { z } from 'zod';
import {
  AnswerFormSchema,
  PaginatedQuestionDataSchema,
  PaginatedQuestionResponseSchema,
  QuestionDetailResponseSchema,
  QuestionSchema,
} from '@/features/question/question.schema';

export type Question = z.infer<typeof QuestionSchema>;
export type PaginatedQuestionData = z.infer<typeof PaginatedQuestionDataSchema>;
export type PaginatedQuestionResponse = z.infer<typeof PaginatedQuestionResponseSchema>;
export type QuestionDetailResponse = z.infer<typeof QuestionDetailResponseSchema>;

export type AnswerFormValues = z.infer<typeof AnswerFormSchema>;
export type PreviewImagesState = {
  id: string;
  url: string;
};
