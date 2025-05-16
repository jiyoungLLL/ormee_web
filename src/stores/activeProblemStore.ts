import { create } from 'zustand';

type ActiveProblemStore = {
  activeProblemId: string | null;
  setActiveProblemId: (problemId: string) => void;
};

export const useActiveProblemStore = create<ActiveProblemStore>((set) => {
  return {
    activeProblemId: null,
    setActiveProblemId: (problemId: string) => set({ activeProblemId: problemId }),
  };
});
