import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDatetimeWithTime = (isoDate: string) => {
  const date = parseISO(isoDate);
  return format(date, 'yyyy.MM.dd HH:mm', { locale: ko });
};

export const formatDatetimeWithoutTime = (isoDate: string) => {
  const date = parseISO(isoDate);
  return format(date, 'yyyy.MM.dd', { locale: ko });
};

export const formatDatetimeWithAMPM = (isoDate: string) => {
  const date = parseISO(isoDate);
  const formattedDate = format(date, 'yyyy.MM.dd a hh:mm', { locale: ko });
  return formattedDate.replace('오전', 'AM').replace('오후', 'PM');
};
