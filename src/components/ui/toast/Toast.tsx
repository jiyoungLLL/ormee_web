type ToastProps = {
  id: string;
  message: string;
  type: 'success' | 'error';
  duration?: number;
};

const TOAST_ICON: Record<ToastProps['type'], string> = {
  success: 'assets/icons/toast/toast-success.png',
  error: 'assets/icons/toast/toast-error.png',
} as const;

const TOAST_STYLE: Record<ToastProps['type'], string> = {
  success: 'bg-state-success',
  error: 'bg-state-error',
};

export default function Toast({ id, message, type, duration = 3000 }: ToastProps) {
  return (
    <div
      id={id}
      className={`flex flex-row justify-center items-center gap-[10px] w-fit px-[20px] py-[10px] rounded-[10px] text-gray-90 text-headline1 font-semibold ${TOAST_STYLE[type]}`}
    >
      <img
        src={TOAST_ICON[type]}
        className='w-[30px] h-[30px]'
      />
      <p>{message}</p>
    </div>
  );
}
