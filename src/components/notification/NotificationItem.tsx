import { Notification } from '@/types/notification.types';
import NotificationBadge from './NotificationBadge';

type NotificationItemProps = {
  notification: Notification;
};

export default function NotificationItem({ notification }: NotificationItemProps) {
  const { type, title, description, createdAt, read } = notification;
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
      <img
        src='/assets/icons/x.png'
        className='w-[18px] h-[18px]'
      />
    </div>
  );
}
