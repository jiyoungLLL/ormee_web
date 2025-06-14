import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { DateRange, DayPicker, SelectRangeEventHandler, SelectSingleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type CalendarType = 'DATE_TYPE' | 'PERIOD_TYPE';

interface CalendarProps {
  type: CalendarType;
  onSelectDate: (value: string) => void;
  defaultValue?: string;
}

export default function Calendar({ type, onSelectDate, defaultValue }: CalendarProps) {
  const defaultStyle = 'bg-gray-10 px-[20px] py-[10px] rounded-[10px] ';

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    if (!defaultValue) return;

    const parts = defaultValue.split(' - ');

    if (parts.length === 2) {
      const [startDate, endDate] = parts.map((date) => parse(date, 'yy.MM.dd', new Date()));
      setSelectedRange({ from: startDate, to: endDate });
    } else if (parts.length === 1) {
      const singleDate = parse(parts[0], 'yy.MM.dd', new Date());
      setSelectedDay(singleDate);
    }
  }, [defaultValue]);

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
            selected: 'rdp-day_selected bg-purple-50 text-white',
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
            today: 'text-purple-70',
            selected: 'bg-purple-10 text-gray-50',
            range_start: 'bg-purple-50 text-white rounded-[50px]',
            range_end: 'bg-purple-50 text-white rounded-[50px]',
            chevron: 'fill-purple-50',
          }}
          className={defaultStyle}
        />
      )}
    </div>
  );
}
