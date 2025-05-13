'use client';

import { ClassModalValues, classSchema } from '@/schemas/class.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DateTimePicker from '../ui/DateTimePicker';
import Input from '../ui/Input';
import Modal from '../ui/Modal';

interface ClassModalProps {
  type: 'ing' | 'new';
  isOpen: boolean;
  closeModal: () => void;
}

type ModalContents = {
  inputTitle: string;
  name: 'message' | 'title' | 'password';
};

export default function ClassModal({ type, isOpen, closeModal }: ClassModalProps) {
  const title = type === 'ing' ? '강의 설정' : '신규 강의 개설';
  const { control, handleSubmit } = useForm<ClassModalValues>({
    defaultValues: {
      title: '',
      password: '',
    },
    resolver: zodResolver(classSchema),
    mode: 'onSubmit',
  });

  // 모달 내부 input 컴포넌트 렌더링
  const commonModalStyle = 'flex flex-col gap-[10px] text-headline2 font-semibold';
  const renderModalContents = ({ inputTitle, name }: ModalContents) => {
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
          showPasswordToggle={true}
          type='text'
        />
      </div>
    );
  };

  const days: string[] = ['월', '화', '수', '목', '금', '토', '일'];
  const [dayClickedList, setDayClickedList] = useState<string[]>([]);

  const handleDayClick = (day: string) => {
    setDayClickedList((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  return (
    <form className='absolute z-100'>
      <Modal
        isOpen={isOpen}
        onCancel={closeModal}
        onConfirm={() => {}}
        title={title}
        containerStyle='flex flex-col gap-[30px]'
      >
        <div className='w-full h-fit flex flex-col gap-[20px]'>
          {renderModalContents({ inputTitle: '강의명', name: 'title' })}
          {renderModalContents({ inputTitle: '비밀번호', name: 'password' })}

          <div className='flex gap-[20px]'>
            <div className={commonModalStyle}>
              수강기간
              <DateTimePicker
                type='CALENDAR'
                calendar='PERIOD_TYPE'
                placeholer='선택하기'
              />
            </div>
            <div className={commonModalStyle}>
              수업시간
              <DateTimePicker
                type='TIME'
                placeholer='선택하기'
              />
            </div>
          </div>

          <div className={commonModalStyle}>
            수업 요일
            <div className='flex gap-[5px]'>
              {days.map((day, index) => {
                const isSelected = dayClickedList.includes(day);
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
          {renderModalContents({ inputTitle: '한줄소개', name: 'message' })}
        </div>
      </Modal>
    </form>
  );
}
