import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDatetimeToYYYYMMDD = (isoDate: string) => {
  const date = parseISO(isoDate);
  return format(date, 'yyyy.MM.dd HH:mm', { locale: ko });
};
