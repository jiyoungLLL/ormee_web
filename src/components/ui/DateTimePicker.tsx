import Image from 'next/image';
import { useState } from 'react';
import Calendar from './Calendar';

type ComponentType = 'CALENDAR' | 'TIME';
type CalendarType = 'DATE_TYPE' | 'PERIOD_TYPE';

type DateTimePickerProps = {
  type: ComponentType;
  calendar?: CalendarType;
  placeholer: string;
};

const TIME_OPTIONS = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
];

export default function DateTimePicker({ type, calendar, placeholer }: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const fontStyle = value !== '' ? '' : 'text-gray-60';

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

  const handlePick = () => setIsOpen((prev) => !prev);

  const handleSelectDate = (formattedValue: string) => {
    setValue(formattedValue);
    setIsOpen(false);
  };

  const handleSelectTime = (start: string, end: string) => {
    setValue(`${start} - ${end}`);
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
        <div className={`absolute z-10 ${calendar === 'PERIOD_TYPE' ? 'bottom-[170px]' : 'top-[120px]'}`}>
          <Calendar
            type={calendar}
            onSelectDate={handleSelectDate}
          />
        </div>
      )}

      {isOpen && type === 'TIME' && (
        <div className='absolute z-10 top-[570px] bg-white shadow-md rounded-md p-4 flex flex-col gap-2'>
          <div className='flex gap-2 items-center'>
            <select
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setEndTime('');
              }}
              className='border rounded p-2'
            >
              <option value=''>시작 시간</option>
              {TIME_OPTIONS.map((time) => (
                <option
                  key={time}
                  value={time}
                >
                  {time}
                </option>
              ))}
            </select>

            <span className='text-gray-500'>-</span>

            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              disabled={!startTime}
              className='border rounded p-2'
            >
              <option value=''>종료 시간</option>
              {startTime &&
                TIME_OPTIONS.filter((time) => time > startTime).map((time) => (
                  <option
                    key={time}
                    value={time}
                  >
                    {time}
                  </option>
                ))}
            </select>
          </div>

          <button
            className='self-end px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
            disabled={!startTime || !endTime}
            onClick={() => handleSelectTime(startTime, endTime)}
          >
            확인
          </button>
        </div>
      )}
    </>
  );
}
