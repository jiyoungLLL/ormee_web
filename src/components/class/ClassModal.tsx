'use client';

import { ClassModalValues, classSchema } from '@/features/class/class.schema';
import { ClassItems } from '@/features/class/class.types';
import { useCreateClass, useGetClass, useUpdateClass } from '@/features/class/hooks/queries/useClassApi';
import { useToastStore } from '@/stores/toastStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, parse } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DateTimePicker from '../ui/DateTimePicker';
import Input from '../ui/Input';
import Modal from '../ui/Modal';

type ClassModalProps = {
  type: 'ongoing' | 'new';
  isOpen: boolean;
  closeModal: () => void;
};

type ModalContents = {
  inputTitle: string;
  name: 'description' | 'title' | 'coworker';
};

const dayMapEngToKor: Record<string, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};

export default function ClassModal({ type, isOpen, closeModal }: ClassModalProps) {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') as 'openLectures' | 'closedLectures';
  const lectureId = searchParams.get('id');
  const { addToast } = useToastStore();

  const { data: classList } = useGetClass();
  const [data, setData] = useState<ClassItems>();
  const preData = classList?.openLectures.find((item) => item.id === Number(lectureId));

  const title = type === 'ongoing' ? '강의 설정' : '신규 강의 개설';

  const methods = useForm<ClassModalValues>({
    resolver: zodResolver(classSchema),
    mode: 'onSubmit',
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const koreanDays = preData?.lectureDays?.map((eng) => dayMapEngToKor[eng]) || [];

    if (preData) {
      methods.reset({
        title: preData.title || '',
        description: preData.description || '',
        startTime: preData.startTime || '',
        endTime: preData.endTime || '',
        startDate: preData.startDate || '',
        dueDate: preData.dueDate || '',
        lectureDays: koreanDays || [],
        password: 'defaultPassword',
      });
    }
  }, [data, methods]);

  const updateMutation = useUpdateClass(lectureId || '');
  const createMutation = useCreateClass();

  const mutation = filter && lectureId ? updateMutation : createMutation;

  const onSubmit = (data: ClassModalValues) => {
    mutation.mutate(data);
    closeModal();
  };

  const onInvalid = (errors: any) => {
    const firstErrorKey = Object.keys(errors)[0];
    const errorMessage = errors[firstErrorKey]?.message;

    addToast({ message: `${errorMessage}`, type: 'error', duration: 2500 });
  };

  // 모달 내부 input 컴포넌트 렌더링
  const commonModalStyle = 'flex flex-col gap-[10px] text-headline2 font-semibold';
  const renderModalContents = ({ inputTitle, name }: ModalContents) => {
    if (name === 'description' || name === 'title') {
      return (
        <div className={commonModalStyle}>
          {inputTitle}
          <Input
            name={name}
            control={control}
            size='w-full h-[50px]'
            placeholder={inputTitle}
            maxLength={20}
            showCharacterCount={true}
            showPasswordToggle={name === 'description' ? false : true}
            type='text'
          />
        </div>
      );
    }
  };

  // 수업 요일
  const days: string[] = ['월', '화', '수', '목', '금', '토', '일'];
  const selectedDays = watch('lectureDays') || [];

  const handleDayClick = (day: string) => {
    const updatedDays = selectedDays.includes(day) ? selectedDays.filter((d) => d !== day) : [...selectedDays, day];
    setValue('lectureDays', updatedDays);
  };

  // 수업 시간 포맷팅
  const handleTimeFormat = (time: string) => {
    if (time) return time.split(':').slice(0, 2).join(':');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/** 모달 버튼 이벤트 수정 필요 */}
        <Modal
          isOpen={isOpen}
          onCancel={closeModal}
          onConfirm={handleSubmit(onSubmit, onInvalid)}
          title={title}
          containerStyle='flex flex-col gap-[30px] bg-white rounded-[15px] px-[30px] py-[20px] select-none'
          confirmButtonType={{ isPurple: true }}
        >
          <div className='w-full h-fit flex flex-col gap-[20px]'>
            {renderModalContents({ inputTitle: '강의명', name: 'title' })}

            <div className='flex gap-[20px]'>
              <div className={commonModalStyle}>
                수강 기간
                <DateTimePicker
                  type='CALENDAR'
                  calendar='PERIOD_TYPE'
                  placeholder='선택하기'
                  onSelectDate={(value) => {
                    const [start, due] = value.split('-').map((v) => v.trim());

                    const parsedStart = parse(start, 'yy.MM.dd', new Date());
                    const parsedDue = parse(due, 'yy.MM.dd', new Date());

                    setValue('startDate', parsedStart.toISOString());
                    setValue('dueDate', parsedDue.toISOString());
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
                {days.map((day, index) => {
                  const isSelected = selectedDays?.includes(day);
                  return (
                    <button
                      type='button'
                      key={`${day}-${index}`}
                      onClick={() => handleDayClick(day)}
                      className={`w-[50px] h-[50px] rounded-[5px] p-[10px] text-headline1 font-semibold flex justify-center items-center ${
                        isSelected ? 'bg-purple-50 text-white' : 'bg-gray-10 text-gray-60'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
            {renderModalContents({ inputTitle: '한 줄 소개', name: 'description' })}
          </div>
        </Modal>
      </form>
    </FormProvider>
  );
}
