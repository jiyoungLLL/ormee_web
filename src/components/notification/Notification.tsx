'use client';

import { useState } from 'react';
import NotificationPanel from '@/components/notification/NotificationPanel';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { useGetNotifications } from '@/features/notification/hooks/useGetNotifications';

export default function Notification() {
  const lectureId = useLectureId();
  const { data: notifications = [] } = useGetNotifications({ lectureId, filter: 'total' });
  const isActive = notifications.length !== 0 && notifications.some((notification) => !notification.isRead);

  const [isOpen, setIsOpen] = useState(false);
  const openNotification = () => setIsOpen(true);
  const closeNotification = () => setIsOpen(false);

  return (
    <>
      <button
        className='relative w-[28px] h-[28px] bg-no-repeat bg-center bg-contain'
        style={{
          backgroundImage: isActive
            ? 'url(/assets/icons/header/bell-active.png)'
            : 'url(/assets/icons/header/bell-inactive.png)',
          backgroundSize: isActive ? '28px 28px' : '19px 23px',
        }}
        aria-label='알림'
        onClick={openNotification}
      />
      <NotificationPanel
        isOpen={isOpen}
        onClose={closeNotification}
      />
    </>
  );
}
