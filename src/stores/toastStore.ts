import { ToastData } from '@/types/toast.types';
import { create } from 'zustand';

type ToastStore = {
  toasts: ToastData[];
  addToast: (toastData: Omit<ToastData, 'id'>) => void;
  removeToast: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => {
  const generateToastId = () => `toast-${crypto.randomUUID()}`;

  return {
    toasts: [],

    addToast: (toastData: Omit<ToastData, 'id'>) => {
      const id = generateToastId();

      set((state: ToastStore) => ({
        toasts: [...state.toasts, { ...toastData, id }],
      }));
    },

    removeToast: (id: string) =>
      set((state: ToastStore) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      })),
  };
});
