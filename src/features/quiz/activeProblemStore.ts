import { create } from 'zustand';

type ActiveProblemStore = {
  activeProblemId: string | null;
  setActiveProblemId: (problemId: string) => void;
  resetActiveProblemId: () => void;
  handleClickProblem: (problemId: string) => void;
};

export const useActiveProblemStore = create<ActiveProblemStore>((set, get) => {
  return {
    activeProblemId: null,

    setActiveProblemId: (problemId: string) => set({ activeProblemId: problemId }),
    resetActiveProblemId: () => set({ activeProblemId: null }),

    handleClickProblem: (problemId: string) => {
      const { activeProblemId } = get();
      if (activeProblemId === problemId) return;
      set({ activeProblemId: problemId });
    },
  };
});
