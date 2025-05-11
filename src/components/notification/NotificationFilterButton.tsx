'use client';

import { NOTIFICATION_TYPE_LABEL } from '@/constants/notification.constants';
import { NotificationFilterType, Notification } from '@/types/notification.types';
import { useGetNotifications } from '@/hooks/queries/notification/useGetNotifications';

type NotificationFilterButtonProps = {
  /** 현재 버튼의 필터 타입 */
  type: NotificationFilterType;
  /** 현재 필터링하도록 선택된 알림 타입 */
  currentType: NotificationFilterType;
  /** 버튼 클릭 시 실행되는 함수 */
  onClick: (type: NotificationFilterType) => void;
};

export default function NotificationFilterButton({ type, currentType, onClick }: NotificationFilterButtonProps) {
  const { data: notifications = [] } = useGetNotifications();

  const isSelected = type === currentType;

  const hasNewNotification = notifications.some((notification) => {
    if (type === 'total') {
      return !notification.read;
    }
    return notification.type === type && !notification.read;
  });

  return (
    <button
      className={`relative flex-1 flex justify-center items-start w-full px-[5px] py-[14px] text-[16px] ${
        isSelected ? 'text-headline2 font-semibold text-purple-50' : 'text-headline2 font-normal text-gray-90'
      }`}
      onClick={() => onClick(type)}
    >
      <span className='relative'>
        {NOTIFICATION_TYPE_LABEL[type]}
        {hasNewNotification && (
          <div className='absolute top-[-2px] right-[-4px] w-[4px] h-[4px] rounded-full bg-purple-50' />
        )}
      </span>
      <div
        className={`absolute bottom-0 left-0 w-full ${isSelected ? 'h-[2px] bg-purple-50' : 'h-[1px] bg-gray-30'}`}
      />
    </button>
  );
}
