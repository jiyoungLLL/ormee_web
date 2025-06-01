import { z } from 'zod';
import {
  AnswerFormSchema,
  AnswerResponseSchema,
  AnswerSchema,
  AnswerSubmitRequestSchema,
} from '@/features/question/schemas/answer.schema';

export type AnswerFormValues = z.infer<typeof AnswerFormSchema>;
export type PreviewImagesState = {
  id: string;
  url: string;
};

export type AnswerSubmitRequest = z.infer<typeof AnswerSubmitRequestSchema>;
export type Answer = z.infer<typeof AnswerSchema>;
export type AnswerResponse = z.infer<typeof AnswerResponseSchema>;
