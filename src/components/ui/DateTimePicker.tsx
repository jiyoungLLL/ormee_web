import Image from 'next/image';
import { useState } from 'react';
import Calendar from './Calendar';

type ComponentType = 'CALENDAR' | 'TIME';
type CalendarType = 'DATE_TYPE' | 'PERIOD_TYPE';

type DateTimePickerProps = {
  /** 캘린더 or 시간 */
  type: ComponentType;
  /** 캘린더 타입 - 날짜 선택 or 기간 선택 */
  calendar?: CalendarType;
  /** 선택 전 나타낼 문자열 */
  placeholer: string;
};

export default function DateTimePicker({ type, calendar, placeholer }: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  // 달력에서 받아오는 값
  const [value, setValue] = useState('');

  const fontStyle = value != '' ? '' : 'text-gray-60';

  const commonStyle = 'rounded-[5px] bg-gray-10';
  const basicTextStyle = calendar === 'DATE_TYPE' ? 'text-headline2 font-semibold' : 'text-headline1 font-semibold';

  const imageSrc = type === 'CALENDAR' ? 'calendar.png' : 'timer.png';
  const imageSize = calendar === 'DATE_TYPE' ? 'w-[20px] h-[20px]' : 'w-[24px] h-[24px]';

  const ComponentSize = calendar === 'DATE_TYPE' ? 'h-[32px] gap-[10px]' : 'h-[51px] gap-[10px]';
  const widthSize =
    calendar === 'PERIOD_TYPE'
      ? 'w-[268px] px-[20px] py-[13px]'
      : type === 'TIME'
        ? 'w-[184px] px-[20px] py-[13px]'
        : 'w-fit px-[10px] py-[5px]';

  const handlePick = () => {
    setIsOpen((prev) => !prev);
  };
  const handleSelectDate = (formattedValue: string) => {
    setValue(formattedValue);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`${commonStyle} ${basicTextStyle} ${ComponentSize} ${widthSize} flex items-center cursor-pointer`}
        onClick={handlePick}
      >
        <Image
          src={`/assets/icons/${imageSrc}`}
          width={20}
          height={20}
          alt={`${type} 아이콘`}
          className={`${imageSize}`}
        />
        <div className={`${fontStyle} whitespace-nowrap`}>{value || placeholer}</div>
      </div>
      {isOpen && calendar && (
        <div className='absolute top-[120px] z-10'>
          <Calendar
            type={calendar}
            onSelectDate={handleSelectDate}
          />
        </div>
      )}
    </>
  );
}
