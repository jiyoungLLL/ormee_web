import { NOTIFICATION_TYPE_TEXT } from '@/constants/notification.constants';
import { NotificationFilterType } from '@/types/notification.types';

type NotificationFilterButtonProps = {
  type: NotificationFilterType;
  currentType: NotificationFilterType;
  onClick: (type: NotificationFilterType) => void;
};

export default function NotificationFilterButton({ type, currentType, onClick }: NotificationFilterButtonProps) {
  const isSelected = type === currentType;

  return (
    <button
      className={`relative flex-1 flex justify-center items-start w-full px-[5px] py-[14px] text-[16px] ${
        isSelected ? 'text-headline2 font-semibold text-purple-50' : 'text-headline2 font-normal text-gray-90'
      }`}
      onClick={() => onClick(type)}
    >
      {NOTIFICATION_TYPE_TEXT[type]}
      <div
        className={`absolute bottom-0 left-0 w-full ${isSelected ? 'h-[2px] bg-purple-50' : 'h-[1px] bg-gray-30'}`}
      />
    </button>
  );
}
