import Image from 'next/image';
import Button from '../ui/Button';

type OpenNoteProps = {
  /** 쪽지 구분 키 */
  noteId: number;
  /** 쪽지 이름 */
  title: string;
  /** 쪽지 날짜 */
  date: string;
  /** 마감하기 버튼 이벤트 */
  onClick?: () => void;
};

export default function OpenNote({ noteId, title, date, onClick }: OpenNoteProps) {
  return (
    <div className='w-full rounded-[15px] flex justify-between px-[10px] py-[20px]'>
      <div className='w-[509px] flex gap-[20px]'>
        <div className='bg-accent-yellowGreen-5 w-[49px] h-[49px] rounded-[10px] flex justify-center items-center'>
          <Image
            src={'/assets/icons/category-icon/note.png'}
            width={24}
            height={24}
            alt='쪽지 아이콘'
          />
        </div>
        <div className='flex flex-col gap-[5px] justify-start'>
          <div className='text-headline1 font-semibold'>{title}</div>
          <div className='text-label text-gray-50'>{date}</div>
        </div>
      </div>
      <Button
        type='BUTTON_BASE_TYPE'
        size='h-[46px]'
        font='text-headline2 font-semibold'
        title='마감하기'
        isPurple={true}
        isfilled={false}
        htmlType='button'
        onClick={onClick}
      />
    </div>
  );
}
