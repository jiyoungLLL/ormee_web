import { Problem } from '@/types/quiz.types';
import { create } from 'zustand';

type ProblemStore = {
  problems: Problem[];
  addProblem: () => void;
  removeProblem: (id: string) => void;
};

const generateProblemId = () => `problem-${crypto.randomUUID()}`;

const defaultProblemData: Omit<Problem, 'id'> = {
  description: '',
  type: 'choice',
  item: ['선지 1'],
  answer: '',
};

export const useProblemStore = create<ProblemStore>((set) => {
  return {
    problems: [{ ...defaultProblemData, id: generateProblemId() }],

    addProblem: () => {
      set((state: ProblemStore) => ({
        problems: [...state.problems, { ...defaultProblemData, id: generateProblemId() }],
      }));
    },

    removeProblem: (id: string) => {
      set((state: ProblemStore) => ({ problems: state.problems.filter((problem) => problem.id !== id) }));
    },
  };
});
