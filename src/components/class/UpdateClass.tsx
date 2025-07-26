'use client';

import { ClassModalValues, classSchema } from '@/features/class/class.schema';
import { useGetClass, useUpdateClass } from '@/features/class/hooks/queries/useClassApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DateTimePicker from '../ui/DateTimePicker';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import Coworker from './Coworker';

const engToKorDay: Record<string, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};

const korToEngDay: Record<string, string> = Object.fromEntries(Object.entries(engToKorDay).map(([k, v]) => [v, k]));

const COMMONSTYLE = 'flex flex-col gap-[10px] text-headline2 font-semibold';
const DISABLED = 'text-label-assistive';

const days = ['월', '화', '수', '목', '금', '토', '일'];

export default function UpdateClass({ closeModal, lectureId }: { closeModal: () => void; lectureId: string }) {
  const [disabled, setDisabled] = useState<boolean>(false);

  const methods = useForm<ClassModalValues>({
    resolver: zodResolver(classSchema),
    mode: 'onSubmit',
  });
  const { control, watch, setValue, handleSubmit, reset } = methods;

  const updateMutation = useUpdateClass(lectureId);

  const { data } = useGetClass();
  const prevClassData = data?.openLectures.find((item) => item.id === Number(lectureId));

  useEffect(() => {
    if (!prevClassData) return;

    reset({
      title: prevClassData.title,
      description: prevClassData.description ?? '',
      lectureDays: prevClassData.lectureDays.map((d) => engToKorDay[d]),
      startDate: prevClassData.startDate,
      dueDate: prevClassData.dueDate,
      startTime: prevClassData.startTime,
      endTime: prevClassData.endTime,
    });

    if (new Date(prevClassData.startDate) < new Date()) setDisabled(true);
  }, [prevClassData, reset]);

  const onSubmit = (data: ClassModalValues) => {
    const payload = {
      ...data,
      lectureDays: data.lectureDays.map((day) => korToEngDay[day]),
    };
    updateMutation.mutate(payload);
  };

  const selectedDays = watch('lectureDays') || [];

  const handleDayClick = (day: string) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((d: string) => d !== day)
      : [...selectedDays, day];
    setValue('lectureDays', updatedDays);
  };

  const handleTimeFormat = (time: string) => time?.split(':').slice(0, 2).join(':');

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal
          isOpen={true}
          onCancel={closeModal}
          onConfirm={handleSubmit(onSubmit)}
          title='강의 설정'
          containerStyle='flex flex-col gap-[30px] bg-white rounded-[15px] px-[30px] pb-[20px] select-none'
          confirmButtonType={{ isPurple: true }}
          titleContainerStyle='h-[31px]'
        >
          <div className={`${COMMONSTYLE} ${disabled && DISABLED} `}>
            강의명
            <Input
              name='title'
              control={control}
              size='w-full h-[50px]'
              placeholder='강의명'
              maxLength={20}
              showCharacterCount
              type='text'
              disabled={disabled}
            />
          </div>

          <div className='flex gap-[20px]'>
            <div className={`${COMMONSTYLE} ${disabled && DISABLED} `}>
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
                disabled={disabled}
              />
            </div>

            <div className={`${COMMONSTYLE} ${disabled && DISABLED} `}>
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
                disabled={disabled}
              />
            </div>
          </div>

          <div className={`${COMMONSTYLE} ${disabled && DISABLED} `}>
            수업 요일
            <div className='flex gap-[5px]'>
              {days.map((day) => {
                const isSelected = selectedDays?.includes(day);
                return (
                  <button
                    disabled={disabled}
                    key={day}
                    type='button'
                    onClick={() => handleDayClick(day)}
                    className={`w-[50px] h-[50px] rounded-[5px] text-headline1 font-semibold ${
                      isSelected && disabled
                        ? 'bg-gray-30 text-white'
                        : isSelected
                          ? 'bg-purple-50 text-white'
                          : 'bg-gray-10 text-gray-60'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`${COMMONSTYLE} ${disabled && DISABLED} `}>
            한 줄 소개
            <Input
              name='description'
              control={control}
              size='w-full h-[50px]'
              placeholder='한 줄 소개'
              maxLength={20}
              showCharacterCount
              type='text'
              disabled={disabled}
            />
          </div>
          <Coworker
            lectureId={lectureId}
            post={true}
          />
        </Modal>
      </form>
    </FormProvider>
  );
}
