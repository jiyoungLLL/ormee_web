import { QUIZ_LIMIT_TIME_OPTIONS } from '@/features/quiz/quiz.constants';
import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Calendar from './Calendar';
import Dropdown from './dropdown/Dropdown';

type ComponentType = 'CALENDAR' | 'TIME';
type CalendarType = 'DATE_TYPE' | 'PERIOD_TYPE';
type TimeType = 'TIME' | 'LIMIT_TIME';

type DateTimePickerProps = {
  type: ComponentType;
  calendar?: CalendarType;
  time?: TimeType;
  placeholder: string;
  defaultValue?: string;
  onSelectDate?: (value: string) => void;
  customImageSize?: string;
  customComponentSize?: string;
  customTextStyle?: string;
  customWidthSize?: string;
  customDropdownSize?: string;
  disabled?: boolean;
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

const TIME_MENU_LIST = TIME_OPTIONS.map((time, index) => ({ id: `t${index}`, label: time }));
const LIMIT_TIME_MENU_LIST = QUIZ_LIMIT_TIME_OPTIONS.map((time, index) => ({ id: `lt${index}`, label: time }));

export default function DateTimePicker({
  type,
  calendar,
  time,
  placeholder,
  defaultValue,
  onSelectDate,
  customImageSize,
  customComponentSize,
  customTextStyle,
  customWidthSize,
  customDropdownSize,
  disabled = false,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dateTimeValue, setDateTimeValue] = useState(defaultValue ?? '');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (defaultValue) setDateTimeValue(defaultValue);
  }, [defaultValue]);

  const pickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pickerRef.current && isOpen) {
      const rect = pickerRef.current.getBoundingClientRect();
      setDropdownStyle({ top: rect.bottom + 8, left: rect.left });
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const isPlaceholder = dateTimeValue === '';
  const fontStyle = disabled ? '' : isPlaceholder ? 'text-gray-60' : '';

  const commonStyle = 'rounded-[5px] bg-gray-10';
  const basicTextStyle =
    customTextStyle ?? (calendar === 'DATE_TYPE' ? 'text-headline2 font-semibold' : 'text-headline1 font-semibold');
  const imageSrc = type === 'CALENDAR' ? 'calendar.png' : 'timer.png';
  const imageSize = customImageSize ?? (calendar === 'DATE_TYPE' ? 'w-[20px] h-[20px]' : 'w-[24px] h-[24px]');
  const ComponentSize =
    customComponentSize ?? (calendar === 'DATE_TYPE' ? 'h-[32px] gap-[10px]' : 'h-[51px] gap-[10px]');
  const widthSize =
    customWidthSize ??
    (calendar === 'PERIOD_TYPE'
      ? 'w-[268px] px-[20px] py-[13px]'
      : type === 'TIME'
        ? 'w-[184px] px-[20px] py-[13px]'
        : 'w-fit px-[10px] py-[5px]');

  const handlePick = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelectDate = (formattedValue: string) => {
    setDateTimeValue(formattedValue);
    onSelectDate?.(formattedValue);
    setIsOpen(false);
  };

  const handleSelectTime = (start: string, end: string) => {
    const formattedValue = `${start} - ${end}`;
    setDateTimeValue(formattedValue);
    onSelectDate?.(formattedValue);
    setIsOpen(false);
  };

  const handleSelectedLimitTime = (time: string) => {
    if (disabled) return;
    setDateTimeValue(time);
    onSelectDate?.(time);
    setIsOpen(false);
  };

  function getFormattedValue(value: string, placeholder: string) {
    if (!value) return placeholder;

    try {
      if (type === 'CALENDAR' && calendar === 'DATE_TYPE') {
        const date = new Date(value);
        if (date) {
          return format(date, 'yy.MM.dd');
        }
      }

      if (type === 'CALENDAR' && calendar === 'PERIOD_TYPE') {
        const [from, to] = value.split('-').map((date) => date.trim());
        return `${from} - ${to}`;
      }

      return value;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.error(error);
    }

    return value;
  }

  return (
    <div ref={pickerRef}>
      <div
        className={`${commonStyle} ${basicTextStyle} ${ComponentSize} ${widthSize} flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={handlePick}
      >
        <Image
          src={`/assets/icons/${imageSrc}`}
          width={20}
          height={20}
          alt={`${type} 아이콘`}
          className={`${imageSize}`}
        />
        <div className={`${fontStyle}`}>{getFormattedValue(dateTimeValue, placeholder)}</div>
      </div>

      {isOpen && !disabled && calendar && (
        <div
          className={`absolute z-[100] ${calendar === 'PERIOD_TYPE' ? 'bottom-[170px]' : 'top-[120px]'}`}
          style={{ top: `${dropdownStyle.top}px`, left: `${dropdownStyle.left}px`, position: 'fixed' }}
        >
          <Calendar
            type={calendar}
            onSelectDate={handleSelectDate}
          />
        </div>
      )}

      {isOpen && !disabled && time === 'TIME' && (
        <div
          className='absolute z-[100] top-[10px] bg-white shadow-md rounded-md p-4 flex flex-col gap-2'
          style={{ top: `${dropdownStyle.top}px`, left: `${dropdownStyle.left}px`, position: 'fixed' }}
        >
          <div className='flex items-center gap-[10px]'>
            <Dropdown
              showTrigger
              menuList={TIME_MENU_LIST.map((item) => ({
                ...item,
                onClick: () => setStartTime(item.label as string),
              }))}
              selectedItem={startTime || '시작 시간'}
              size={customDropdownSize}
            />
            <Dropdown
              showTrigger
              menuList={TIME_MENU_LIST.map((item) => ({
                ...item,
                onClick: () => setEndTime(item.label as string),
              }))}
              selectedItem={endTime || '종료 시간'}
              size={customDropdownSize}
            />
            <button
              className='px-[20px] py-[6px] text-headline1 font-semibold bg-purple-50 text-white rounded disabled:bg-gray-30 disabled:text-label-assistive disabled:cursor-not-allowed'
              disabled={!startTime || !endTime}
              onClick={() => handleSelectTime(startTime, endTime)}
            >
              확인
            </button>
          </div>
        </div>
      )}

      {time === 'LIMIT_TIME' && (
        <Dropdown
          showTrigger={false}
          menuList={LIMIT_TIME_MENU_LIST.map((item) => ({
            ...item,
            onClick: () => handleSelectedLimitTime(item.label as string),
          }))}
          selectedItem={dateTimeValue || '제한 시간'}
          isOpen={isOpen && !disabled}
          triggerRef={pickerRef}
          size={customDropdownSize}
        />
      )}
    </div>
  );
}
