'use client';

import { useState } from 'react';
import NotificationPanel from '@/components/notification/NotificationPanel';

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const openNotification = () => setIsOpen(true);
  const closeNotification = () => setIsOpen(false);

  return (
    <>
      <button
        className='relative w-[28px] h-[28px] bg-no-repeat bg-center bg-contain'
        style={{
          backgroundImage: 'url(/assets/icons/header/bell-inactive.png)',
          backgroundSize: '19px 23px',
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
