'use client';

import { useEffect, useState } from 'react';
import { ToastType } from '@/types/toast.types';
import { useToastStore } from '@/stores/toastStore';

type ToastProps = {
  /** 토스트 고유 id, addToast에서 자동 할당 */
  id: string;
  /** 토스트 메세지 */
  message: string;
  /** 토스트 타입 */
  type: ToastType;
  /** 토스트 지속 시간, 미지정시 2500ms */
  duration?: number;
};

const TOAST_ICON: Record<ToastType, string> = {
  success: '/assets/icons/toast/toast-success.png',
  error: '/assets/icons/toast/toast-error.png',
} as const;

const TOAST_STYLE: Record<ToastType, string> = {
  success: 'bg-state-success',
  error: 'bg-state-error',
};

export const TOAST_ANIMATION_DURATION = 350;

export default function Toast({ id, message, type, duration = 2500 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { removeToast } = useToastStore();

  useEffect(() => {
    setIsVisible(true);

    const toastTimer = setTimeout(() => {
      setIsVisible(false);

      setTimeout(() => {
        removeToast(id);
      }, TOAST_ANIMATION_DURATION);
    }, duration);

    return () => {
      clearTimeout(toastTimer);
    };
  }, []);

  return (
    <div
      id={id}
      className={`flex flex-row justify-center items-center gap-[10px] w-fit px-[20px] py-[10px] rounded-[10px] text-gray-90 text-headline1 font-semibold ${TOAST_STYLE[type]} transform transition-all duration-${TOAST_ANIMATION_DURATION} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[20px]'} pointer-events-auto`}
    >
      <img
        src={TOAST_ICON[type]}
        className='w-[30px] h-[30px]'
      />
      <p>{message}</p>
    </div>
  );
}
