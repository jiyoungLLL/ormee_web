'use client';

import NotificationBadge from '@/components/notification/NotificationBadge';
import { Notification } from '@/features/notification/notification.types';
import { useMemo } from 'react';

type NotificationItemProps = {
  /** 표시할 알림 데이터 */
  notification: Notification;
};

export default function NotificationItem({ notification }: NotificationItemProps) {
  const { type, title, description, createdAt, isRead } = notification;

  const formattedCreatedAt = useMemo(() => {
    return new Date(createdAt)
      .toLocaleString('ko-KR', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
      .replace(':', '시 ')
      .replace(/(\d+)$/, '$1분');
  }, [createdAt]);

  const handleDelete = () => {
    alert('알림 삭제');
  };

  return (
    <div className='flex justify-between items-start w-full py-[12px] self-stretch'>
      <div className='flex items-start'>
        <div className={`flex flex-col items-start gap-[5px] w-[385px] ${isRead ? 'text-gray-50' : 'text-gray-90'}`}>
          <div className='flex items-start gap-[5px]'>
            <NotificationBadge
              type={type}
              read={isRead}
            />
            <p className='text-headline1 font-semibold'>{title}</p>
          </div>
          <p className='text-body1 font-normal'>{description}</p>
        </div>
        <p className='text-body2 font-normal text-gray-60'>{formattedCreatedAt}</p>
      </div>
      <button
        className='w-[18px] h-[18px] bg-no-repeat bg-center bg-contain'
        style={{
          backgroundImage: 'url(/assets/icons/x.png)',
        }}
        onClick={handleDelete}
      />
    </div>
  );
}
