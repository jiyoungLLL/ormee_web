import { createPortal } from 'react-dom';

type NotificationPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  if (!isOpen) return;

  const notificationRoot = document.getElementById('notification-root');
  if (!notificationRoot) return;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    onClose();
  };

  return createPortal(
    <div
      className='fixed top-0 left-0 w-full h-dvh bg-gray-90/50'
      onClick={handleClose}
    >
      <div className='absolute top-0 right-0 flex flex-col gap-[20px] w-[600px] h-full px-[40px] py-[30px] rounded-l-[20px] shadow-[0px_0px_7px_0px_rgba(70,72,84,0.10)] bg-white'></div>
    </div>,
    notificationRoot,
  );
}
