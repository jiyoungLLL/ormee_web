'use client';

import { ClassModalValues, classSchema } from '@/features/class/class.schema';
import { useCreateClass } from '@/features/class/hooks/queries/useClassApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { parse } from 'date-fns';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DateTimePicker from '../ui/DateTimePicker';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import Coworker from './Coworker';

// // 깅의 생성 후 큐알 모달
// const { isOpen: QROpen, openModal: openQRModal, closeModal: closeQRModal } = useModal({ defaultOpen: false });
// // 강의제목, 아이디 가져오기
// const title = '오르미 토익';
// const lectureId = 1;

export default function CreateClass({ closeModal }: { closeModal: () => void }) {
  const [lectureId, setLectureId] = useState<string>('0');

  const methods = useForm<ClassModalValues>({
    resolver: zodResolver(classSchema),
    mode: 'onSubmit',
  });
  const { control, watch, setValue, handleSubmit } = methods;

  const handleSuccess = (data: { id: number; title: string }) => {
    setLectureId(data.id.toString());
    closeModal();
  };

  const createMutation = useCreateClass(handleSuccess);

  const onSubmit = (data: ClassModalValues) => {
    createMutation.mutate(data);
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal
          isOpen={true}
          onCancel={closeModal}
          onConfirm={handleSubmit(onSubmit)}
          title='신규 강의 개설'
          containerStyle='flex flex-col gap-[30px] bg-white rounded-[15px] px-[30px] pb-[20px] select-none'
          confirmButtonType={{ isPurple: true }}
          titleContainerStyle='h-[31px]'
        >
          <div className={commonModalStyle}>
            강의명
            <Input
              name='title'
              control={control}
              size='w-full h-[50px]'
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
              maxLength={20}
              showCharacterCount
              type='text'
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
