import { ToastData } from '@/types/toast.types';
import { create } from 'zustand';

type ToastStore = {
  toasts: ToastData[];
  addToast: (toastData: ToastData) => void;
  removeToast: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => {
  return {
    toasts: [],

    addToast: (toastData: ToastData) =>
      set((state: ToastStore) => ({
        toasts: [...state.toasts, toastData],
      })),

    removeToast: (id: string) =>
      set((state: ToastStore) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      })),
  };
});
