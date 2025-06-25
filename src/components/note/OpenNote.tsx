import Image from 'next/image';
import Button from '../ui/Button';

type OpenNoteProps = {
  /** 쪽지 이름 */
  title: string;
  /** 쪽지 날짜 */
  date: string;
  /** 전체 인원 */
  totalCount: number;
  /** 제출 인원 */
  submitCount: number;
  /** 마감하기 버튼 이벤트 */
  onClick?: () => void;
};

export default function OpenNote({ title, date, totalCount, submitCount, onClick }: OpenNoteProps) {
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
        <div className='flex gap-[5px] items-center'>
          <Image
            src={'/assets/icons/homeSlide_student.png'}
            width={18}
            height={18}
            alt='학생 아이콘'
            className='w-[18px] h-[18px]'
          />
          <div className='flex gap-[5px]'>
            <p className='text-headline1 font-semibold text-gray-60'>{submitCount}</p>
            <p className='text-headline1  text-gray-50'>/</p>
            <p className='text-headline1  text-gray-50'>{totalCount}</p>
          </div>
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
