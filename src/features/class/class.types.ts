import { classListResponseSchema } from '@/features/class/class.schema';
import { z } from 'zod';

export type ClassItems = {
  id: number;
  code?: number;
  profileImage: string;
  name: string;
  title: string;
  description: string | null;
  lectureDays: string[];
  startTime: string;
  endTime: string;
  startDate: string;
  dueDate: string;
  students?: number;
  quizList?: string[];
  activeQuizCount?: number;
  messageAvailable?: boolean;
};

export type GetClassResponse = {
  openLectures: ClassItems[];
  closedLectures: ClassItems[];
};

export type ClassListResponse = z.infer<typeof classListResponseSchema>;
