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

export const formatDatetimeToYYMMDD = (isoDate: string) => {
  const date = parseISO(isoDate);
  return format(date, 'yy.MM.dd', { locale: ko });
};

export const formatToUTCString = (date: string | Date) => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');
  const milliseconds = String(dateObj.getMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};
