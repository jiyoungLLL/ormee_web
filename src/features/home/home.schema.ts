import { z } from 'zod';

export const homeLectureResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  isOwner: z.boolean(),
  openTime: z.string(),
  closeTime: z.string(),
});

export const homeAssignmentsListResponseSchema = z.array(
  z.object({
    id: z.number(),
    type: z.string(),
    title: z.string(),
    submitStudents: z.number(),
    totalStudents: z.number(),
    openTime: z.string(),
    duetTime: z.string(),
  }),
);

export const homeQuestionsListResponseSchema = z.array(
  z.object({
    id: z.number(),
    type: z.null(),
    title: z.string(),
    submitStudents: z.null(),
    totalStudents: z.null(),
    openTime: z.string(),
    dueTime: z.null(),
  }),
);

export const homeNoticesListResponseSchema = z.array(
  z.object({
    id: z.number(),
    type: z.string(),
    title: z.string(),
    submitStudents: z.null(),
    totalStudents: z.null(),
    openTime: z.null(),
    dueTime: z.null(),
  }),
);

export const homeResponseSchema = z.object({
  lecture: homeLectureResponseSchema,
  assignments: homeAssignmentsListResponseSchema,
  questions: homeQuestionsListResponseSchema,
  notices: homeNoticesListResponseSchema,
});
