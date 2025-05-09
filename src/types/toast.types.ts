export type ToastType = 'success' | 'error';

export type ToastData = {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
};
