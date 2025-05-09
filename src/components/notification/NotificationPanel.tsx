import { createPortal } from 'react-dom';

type NotificationPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  if (!isOpen) return;

  const notificationRoot = document.getElementById('notification-root');
  if (!notificationRoot) return;

  return createPortal(
    <div
      className='fixed top-0 left-0 w-full h-dvh bg-gray-90/50'
      onClick={onClose}
    ></div>,
    notificationRoot,
  );
}
