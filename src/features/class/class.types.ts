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
