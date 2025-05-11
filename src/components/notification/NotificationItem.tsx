'use client';

import { Notification } from '@/types/notification.types';
import NotificationBadge from './NotificationBadge';

type NotificationItemProps = {
  /** 표시할 알림 데이터 */
  notification: Notification;
};

export default function NotificationItem({ notification }: NotificationItemProps) {
  const { type, title, description, createdAt, read } = notification;

  const handleDelete = () => {
    alert('알림 삭제');
  };

  return (
    <div className='flex justify-between items-start w-full py-[12px] self-stretch'>
      <div className='flex items-start'>
        <div className={`flex flex-col items-start gap-[5px] w-[385px] ${read ? 'text-gray-50' : 'text-gray-90'}`}>
          <div className='flex items-start gap-[5px]'>
            <NotificationBadge
              type={type}
              read={read}
            />
            <p className='text-headline1 font-semibold'>{title}</p>
          </div>
          <p className='text-body1 font-normal'>{description}</p>
        </div>
        <p className='text-body2 font-normal text-gray-60'>{createdAt}</p>
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
