'use client';

import NotificationBadge from '@/components/notification/NotificationBadge';
import { useMarkNotificationAsRead } from '@/features/notification/hooks/useMutationNotification';
import { Notification, NotificationFilterType } from '@/features/notification/notification.types';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

type NotificationItemProps = {
  /** 표시할 알림 데이터 */
  notification: Notification;
  onClose: () => void;
  currentFilter: NotificationFilterType;
};

export default function NotificationItem({ notification, onClose, currentFilter }: NotificationItemProps) {
  const { notificationId, type, title, description, createdAt, isRead, parentId } = notification;

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

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert('알림 삭제');
  };

  const { mutate: markAsRead } = useMarkNotificationAsRead();

  const router = useRouter();
  const lectureId = useLectureId();

  const getDetailPath = () => `/lectures/${lectureId}/${type}/${parentId}`;
  // TODO: 해당 영역으로 스크롤은 추후 고려
  const getManagePath = () => `/lectures/${lectureId}/${type}?id=${parentId}`;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!isRead) {
      markAsRead({ notificationId, lectureId, currentFilter });
    }

    const routingPath = type === 'note' ? getManagePath() : getDetailPath();
    if (!routingPath) return;

    router.push(routingPath);
    onClose();
  };

  return (
    <div
      className='flex justify-between items-start w-full py-[12px] self-stretch cursor-pointer'
      onClick={handleClick}
    >
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
