'use client';

import { useEffect, useState } from 'react';
import { ToastType } from '@/types/toast.types';
type ToastProps = {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
};

const TOAST_ICON: Record<ToastType, string> = {
  success: 'assets/icons/toast/toast-success.png',
  error: 'assets/icons/toast/toast-error.png',
} as const;

const TOAST_STYLE: Record<ToastType, string> = {
  success: 'bg-state-success',
  error: 'bg-state-error',
};

export default function Toast({ id, message, type, duration = 2500 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const toastTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(toastTimer);
    };
  }, []);

  return (
    <div
      id={id}
      className={`flex flex-row justify-center items-center gap-[10px] w-fit px-[20px] py-[10px] rounded-[10px] text-gray-90 text-headline1 font-semibold ${TOAST_STYLE[type]} transform transition-all duration-${duration} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[20px]'}`}
    >
      <img
        src={TOAST_ICON[type]}
        className='w-[30px] h-[30px]'
      />
      <p>{message}</p>
    </div>
  );
}
