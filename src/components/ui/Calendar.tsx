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
      const isoDate = day.toISOString().split('.')[0];
      onSelectDate(isoDate);
    }
  };

  const handleSelectRange: SelectRangeEventHandler = (range) => {
    setSelectedRange(range);

    if (range?.from && range?.to && range.from.getTime() !== range.to.getTime()) {
      const fromDate = new Date(range.from.setHours(0, 0, 0, 0));
      const toDate = new Date(range.to.setHours(0, 0, 0, 0));

      const fromISO = format(fromDate, 'yy.MM.dd', { locale: ko });
      const toISO = format(toDate, 'yy.MM.dd', { locale: ko });

      onSelectDate(`${fromISO} - ${toISO}`);
    } else if (range?.from && !range?.to) {
      const fromISO = format(range.from, 'yy.MM.dd', { locale: ko });
      onSelectDate(`${fromISO}`);
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
          classNames={{
            day_selected: 'rdp-day_selected bg-purple-50 text-white',
          }}
          className={defaultStyle}
        />
      ) : (
        <DayPicker
          locale={ko}
          mode='range'
          selected={selectedRange}
          onSelect={handleSelectRange}
          classNames={{
            day_range_start: 'rdp-day_range_start bg-purple-50 text-white',
            day_range_end: 'rdp-day_range_end bg-purple-50 text-white',
            day_range_middle: 'rdp-day_range_middle bg-purple-10 text-white',
          }}
          className={defaultStyle}
        />
      )}
    </div>
  );
}
