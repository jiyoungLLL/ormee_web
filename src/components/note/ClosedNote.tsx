import { useGetNoteStats } from '@/features/note/useNoteApi';
import Image from 'next/image';

type ClosedNoteType = {
  /** 쪽지 구분 키 */
  noteId: number;
  /** 쪽지 이름 */
  title: string;
  /** 쪽지 날짜 */
  date: string;
  /** 제출 인원  */
  totalCount?: number;
  /** 제출 인원  */
  submitCount?: number;
  /** 드롭다운 열림 여부 */
  isOpen: boolean;
  /** 드롭다운 이벤트 함수 */
  onClick: () => void;
};

export default function ClosedNote({ noteId, title, date, totalCount, submitCount, isOpen, onClick }: ClosedNoteType) {
  const { data } = useGetNoteStats(noteId.toString());
  const stats = data?.data ?? [];

  const openStyle = 'flex flex-col pb-[20px]';

  const dropdownList: string[] = ['순번', '문항', '오답 비율', '오답 인원'];

  return (
    <div className={`${isOpen ? openStyle : ''} hover:cursor`}>
      <div className='w-[958px] rounded-[15px] px-[10px] py-[20px] flex justify-between'>
        <div className='flex flex-col gap-[5px] justify-start'>
          <div className={`text-headline1 font-semibold ${isOpen ? '' : 'text-gray-60'}`}>{title}</div>
          <div className='text-label text-gray-50'>{date}</div>
        </div>
        <div className='flex gap-[29px] items-center'>
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
          <button
            className='w-[18px] h-[18px]'
            onClick={onClick}
          >
            <Image
              src={'/assets/icons/sidenav/dropdown.png'}
              width={18}
              height={18}
              alt='드롭다운 아이콘'
              className={`cursor-pointer transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className='w-fill rounded-[15px] px-[30px] py-[20px] bg-gray-10'>
          <div className='flex flex-col gap-[16px] px-[10px]'>
            <div className='flex gap-[40px] text-label text-gray-70'>
              {dropdownList.map((list, index) => (
                <p
                  key={`${list}-${index}`}
                  className={`text-center ${list === '순번' ? 'w-[40px]' : 'w-[89px]'}`}
                >
                  {list}
                </p>
              ))}
            </div>
            <div className='flex flex-col gap-[16px] max-h-[176px] overflow-y-auto'>
              {stats?.map((dataList, index) => (
                <div
                  key={`row-${index}`}
                  className='flex gap-[40px] text-headline2 text-center'
                >
                  <p className='w-[40px] text-gray-70 font-normal'>{dataList.rank}</p>
                  <p className={'text-center w-[89px] font-semibold'}>{dataList.contentDetail}</p>
                  <p className='w-[89px] font-normal'>{dataList.submitRate}%</p>
                  <p className='w-[89px] font-normal'>{dataList.submit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
