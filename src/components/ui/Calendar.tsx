import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { DateRange, DayPicker, SelectRangeEventHandler, SelectSingleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type CalendarType = 'DATE_TYPE' | 'PERIOD_TYPE';

interface CalendarProps {
  type: CalendarType;
  onSelectDate: (value: string) => void;
}

export default function Calendar({ type, onSelectDate }: CalendarProps) {
  const defaultStyle = 'bg-gray-10 px-[20px] py-[10px] rounded-[10px] ';

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

  const handleSelectSingle: SelectSingleEventHandler = (day) => {
    setSelectedDay(day);
    if (day) {
      const formatted = format(day, 'yy.MM.dd');
      onSelectDate(formatted);
    }
  };

  const handleSelectRange: SelectRangeEventHandler = (range) => {
    setSelectedRange(range);
    if (range?.from && range?.to && range.from.getTime() !== range.to.getTime()) {
      const from = format(range.from, 'yyyy.MM.dd');
      const to = format(range.to, 'yyyy.MM.dd');
      onSelectDate(`${from}-${to}`);
    } else if (range?.from && !range?.to) {
      const from = format(range.from, 'yyyy.MM.dd');
      onSelectDate(`${from}-`);
    }
  };

  return (
    <div>
      {type === 'DATE_TYPE' ? (
        <DayPicker
          locale={ko}
          mode='single'
          selected={selectedDay}
          onSelect={handleSelectSingle}
          className={defaultStyle}
        />
      ) : (
        <DayPicker
          locale={ko}
          mode='range'
          selected={selectedRange}
          onSelect={handleSelectRange}
          className={defaultStyle}
        />
      )}
    </div>
  );
}
