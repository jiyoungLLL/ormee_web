'use client';

import { NotificationFilterType } from '@/types/notification.types';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import NotificationItem from './NotificationItem';
import useMounted from '@/hooks/useMounted';
import Button from '../ui/Button';
import { NOTIFICATION_TYPE_LABEL } from '@/constants/notification.constants';
import NotificationFilterButton from './NotificationFilterButton';
import { useGetNotifications } from '@/hooks/queries/notification/useGetNotifications';

type NotificationPanelProps = {
  /** 알림 패널 열림 여부 */
  isOpen: boolean;
  /** 알림 패널 닫을 때 실행될 함수 */
  onClose: () => void;
};

const NOTIFICATION_FILTER_TYPE_LIST: NotificationFilterType[] = [
  ...Object.keys(NOTIFICATION_TYPE_LABEL),
] as NotificationFilterType[];

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const isMounted = useMounted();
  const [currentType, setCurrentType] = useState<NotificationFilterType>('total');
  const { data: notifications = [] } = useGetNotifications();

  if (!isOpen || !isMounted) return null;

  const notificationRoot = document.getElementById('notification-root');
  if (!notificationRoot) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    onClose();
  };

  const handleAllRead = () => {
    alert('모두 읽음');
  };

  const handleAllDelete = () => {
    alert('모두 삭제');
  };

  const handleFilterClick = (type: NotificationFilterType) => {
    setCurrentType(type);
  };

  const filteredNotificationList = notifications.filter((notification) => {
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
          <span className='text-purple-50'>{notifications.length}</span>
        </h2>
        <div className='flex-1 flex flex-col items-center gap-[10px] self-stretch'>
          <div className='flex justify-between items-center self-stretch'>
            {NOTIFICATION_FILTER_TYPE_LIST.map((type) => (
              <NotificationFilterButton
                key={`notification-filter-${type}`}
                type={type}
                currentType={currentType}
                onClick={handleFilterClick}
              />
            ))}
          </div>
          <div className='flex justify-end items-center gap-[10px] self-stretch'>
            <Button
              type='BUTTON_BASE_TYPE'
              size='flex justify-center items-center w-fit h-[40px]'
              font='text-headline2 font-semibold text-gray-90'
              isPurple={false}
              isfilled={false}
              title='모두 읽음'
              onClick={handleAllRead}
            />
            <Button
              type='BUTTON_BASE_TYPE'
              size='flex justify-center items-center w-fit h-[40px]'
              font='text-headline2 font-semibold text-gray-90'
              isPurple={false}
              isfilled={false}
              title='모두 삭제'
              onClick={handleAllDelete}
            />
          </div>
          <div className='flex-1 flex flex-col px-[4px] items-start gap-[12px] self-stretch max-h-[calc(100dvh-200px)] overflow-y-auto'>
            {filteredNotificationList.length === 0 && (
              <div className='flex justify-center items-center gap-[10px] w-full h-full'>
                <p className='text-heading2 font-semibold text-[#B5B6BC] text-center'>알림이 없어요.</p>
              </div>
            )}
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
