'use client';

import { useToastStore } from '@/stores/toastStore';
import Toast from './Toast';

export default function ToastContainer() {
  const { toasts } = useToastStore();

  return (
    <div className='fixed top-[70px] w-screen flex flex-col-reverse justify-center items-center gap-[10px] pointer-events-none'>
      {toasts.map(({ id, message, type, duration }) => (
        <Toast
          key={`toast-${id}`}
          id={id}
          message={message}
          type={type}
          duration={duration}
        />
      ))}
    </div>
  );
}
