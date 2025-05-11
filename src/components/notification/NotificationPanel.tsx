'use client';

import { MOCK_NOTIFICATION_LIST } from '@/mock/notification';
import { NotificationType } from '@/types/notification.types';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import NotificationItem from './NotificationItem';
type NotificationPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [currentType, setCurrentType] = useState<NotificationType | 'total'>('total');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isOpen || !isMounted) return;

  const notificationRoot = document.getElementById('notification-root');
  if (!notificationRoot) return;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    onClose();
  };

  const filteredNotificationList = MOCK_NOTIFICATION_LIST.filter((notification) => {
    if (currentType === 'total') return true;
    return notification.type === currentType;
  });

  return createPortal(
    <div
      className='fixed top-0 left-0 w-full h-dvh bg-gray-90/50'
      onClick={handleClose}
    >
      <div className='absolute top-0 right-0 flex flex-col items-start gap-[20px] w-[600px] h-full px-[40px] py-[30px] rounded-l-[20px] shadow-[0px_0px_7px_0px_rgba(70,72,84,0.10)] bg-white'>
        <h2 className='flex items-start gap-[10px] text-heading2 font-semibold'>
          <span className='text-black'>알림</span>
          <span className='text-purple-50'>{MOCK_NOTIFICATION_LIST.length}</span>
        </h2>
        <div className='flex-1 flex flex-col items-center gap-[10px] self-stretch'>
          <div className='flex justify-between items-center self-stretch border-b border-gray-30'>
            {/* 알림 타입 버튼 영역 */}
          </div>
          <div className='flex justify-end gap-[10px]'>{/* 모두 읽음, 모두 지움 */}</div>
          <div className='flex flex-col px-[4px] items-start gap-[12px] self-stretch'>
            {filteredNotificationList.map((notification) => (
              <NotificationItem
                key={`notification-${notification.id}`}
                notification={notification}
              />
            ))}
          </div>
        </div>
      </div>
    </div>,
    notificationRoot,
  );
}
