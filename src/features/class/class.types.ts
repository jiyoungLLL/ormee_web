import { z } from 'zod';
import { classListResponseSchema } from '@/features/class/class.schema';

export type ClassTypes = {
  id: string;
  code: number;
  profileImage: string;
  name: string;
  title: string;
  description: string | null;
  lectureDays: string[];
  startTime: string;
  endTime: string;
  startDate: string;
  dueDate: string;
  students: number;
  quizList: string[];
  activeQuizCount: number;
  messageAvailable: boolean;
};

export type ClassListResponse = z.infer<typeof classListResponseSchema>;
