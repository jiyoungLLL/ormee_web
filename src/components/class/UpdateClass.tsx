'use client';

import { ClassModalValues } from '@/features/class/class.schema';
import { useUpdateClass } from '@/features/class/hooks/queries/useClassApi';
import { format, parse } from 'date-fns';
import { useFormContext } from 'react-hook-form';
import DateTimePicker from '../ui/DateTimePicker';
import Input from '../ui/Input';

export default function UpdateClass({ closeModal, lectureId }: { closeModal: () => void; lectureId: string }) {
  const { control, watch, setValue, handleSubmit } = useFormContext<ClassModalValues>();
  const updateMutation = useUpdateClass(lectureId);

  const onSubmit = (data: ClassModalValues) => {
    updateMutation.mutate(data);
  };

  const commonModalStyle = 'flex flex-col gap-[10px] text-headline2 font-semibold';
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const selectedDays = watch('lectureDays') || [];

  const handleDayClick = (day: string) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((d: string) => d !== day)
      : [...selectedDays, day];
    setValue('lectureDays', updatedDays);
  };

  const handleTimeFormat = (time: string) => time?.split(':').slice(0, 2).join(':');

  return (
    <>
      <div className={commonModalStyle}>
        강의명
        <Input
          name='title'
          control={control}
          size='w-full h-[50px]'
          placeholder='강의명'
          maxLength={20}
          showCharacterCount
          type='text'
        />
      </div>

      <div className='flex gap-[20px]'>
        <div className={commonModalStyle}>
          수강 기간
          <DateTimePicker
            type='CALENDAR'
            calendar='PERIOD_TYPE'
            placeholder='선택하기'
            onSelectDate={(value) => {
              const [start, due] = value.split('-').map((v) => v.trim());
              setValue('startDate', parse(start, 'yy.MM.dd', new Date()).toISOString());
              setValue('dueDate', parse(due, 'yy.MM.dd', new Date()).toISOString());
            }}
            defaultValue={
              watch('startDate') && watch('dueDate')
                ? `${format(new Date(watch('startDate')), 'yy.MM.dd')} - ${format(new Date(watch('dueDate')), 'yy.MM.dd')}`
                : undefined
            }
          />
        </div>

        <div className={commonModalStyle}>
          수업 시간
          <DateTimePicker
            type='TIME'
            time='TIME'
            placeholder='선택하기'
            onSelectDate={(value) => {
              const [start, end] = value.split('-');
              setValue('startTime', start);
              setValue('endTime', end);
            }}
            defaultValue={
              watch('startTime') && watch('endTime')
                ? `${handleTimeFormat(watch('startTime'))}-${handleTimeFormat(watch('endTime'))}`
                : undefined
            }
          />
        </div>
      </div>

      <div className={commonModalStyle}>
        수업 요일
        <div className='flex gap-[5px]'>
          {days.map((day) => {
            const isSelected = selectedDays.includes(day);
            return (
              <button
                key={day}
                type='button'
                onClick={() => handleDayClick(day)}
                className={`w-[50px] h-[50px] rounded-[5px] text-headline1 font-semibold ${
                  isSelected ? 'bg-purple-50 text-white' : 'bg-gray-10 text-gray-60'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className={commonModalStyle}>
        한 줄 소개
        <Input
          name='description'
          control={control}
          size='w-full h-[50px]'
          placeholder='한 줄 소개'
          maxLength={20}
          showCharacterCount
          type='text'
        />
      </div>

      <div className={commonModalStyle}>
        공동작업자 관리
        <div className='flex gap-[10px]'>
          <Input
            name='coworker'
            control={control}
            size='w-full h-[50px]'
            placeholder='아이디 입력'
            type='text'
          />
        </div>
      </div>

      <button
        type='button'
        onClick={handleSubmit(onSubmit)}
        className='self-end mt-4 px-4 py-2 bg-purple-50 text-white rounded-md font-bold'
      >
        수정
      </button>
    </>
  );
}
