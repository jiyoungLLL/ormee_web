import Image from 'next/image';
import { useState } from 'react';

type ClosedNoteType = {
  /** 쪽지 구분 키 */
  noteKey: string;
  /** 쪽지 이름 */
  title: string;
  /** 쪽지 날짜 */
  date: string;
  /** 제출 인원 / 전체 인원 */
  students?: number;
  /** 내부 들어갈 쪽지 데이터 */
  data?: (string | number)[][];
};

export default function ClosedNote({ noteKey, title, date, students, data }: ClosedNoteType) {
  const openStyle = 'flex flex-col pb-[20px]';
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const classStudents = 32;

  const dropdownList: string[] = ['순위', '문항', '오답 비율', '오답 인원'];

  return (
    <div className={`${isOpen ? openStyle : ''}`}>
      <div className='w-[958px] rounded-[15px] px-[10px] py-[20px] flex justify-between'>
        <div className='flex flex-col gap-[5px] justify-start'>
          <div className='text-headline1 font-semibold text-gray-60'>{title}</div>
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
              <p className='text-headline1 font-semibold text-gray-60'>{students}</p>
              <p className='text-headline1  text-gray-50'>/</p>
              <p className='text-headline1  text-gray-50'>{classStudents}</p>
            </div>
          </div>
          <button
            className='w-[18px] h-[18px]'
            onClick={handleDropdown}
          >
            <Image
              src={'/assets/icons/sidenav/dropdown.png'}
              width={18}
              height={18}
              alt='드롭다운 아이콘'
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
                  className={`text-center ${list === '순위' ? 'w-[40px]' : 'w-[89px]'}`}
                >
                  {list}
                </p>
              ))}
            </div>
            {data?.map((dataList, index) => (
              <div
                key={`row-${index}`}
                className='flex gap-[40px] text-headline2 text-center'
              >
                <p className='w-[40px] text-gray-70'>{index + 1}</p>
                {dataList.map((content, contentIndex) => (
                  <p
                    key={`content-${index}-${contentIndex}`}
                    className={`text-center w-[89px] ${contentIndex === 0 ? 'font-semibold' : 'font-normal'}`}
                  >
                    {content}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
