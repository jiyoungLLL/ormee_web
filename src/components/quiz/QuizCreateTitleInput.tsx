'use client';

import { QuizFormValues } from '@/features/quiz/quiz.types';
import { useController, useFormContext } from 'react-hook-form';
import DateTimePicker from '@/components/ui/DateTimePicker';
import { useEffect, useState } from 'react';
import { useActiveProblemStore } from '@/features/quiz/activeProblemStore';
import TipTapField from '@/components/ui/TipTapField';
import { Editor } from '@tiptap/react';
import { format, parse } from 'date-fns';
import { useQuizEditMode } from '@/features/quiz/hooks/useQuizEditMode';
import { ko } from 'date-fns/locale';

type QuizCreateTitleInputProps = {
  setEditor: (editor: Editor | null) => void;
};

export default function QuizCreateTitleInput({ setEditor }: QuizCreateTitleInputProps) {
  const [isActive, setIsActive] = useState(false);
  const { activeProblemId, resetActiveProblemId } = useActiveProblemStore();
  const { control, watch } = useFormContext<QuizFormValues>();
  const { field: startTimeField } = useController({ control, name: 'startTime' });
  const { field: dueTimeField } = useController({ control, name: 'dueTime' });
  const { field: limitTimeField } = useController({ control, name: 'limitTime' });
  const [defaultPeriod, setDefaultPeriod] = useState('');

  const handleSelectPeriod = (value: string) => {
    const [startDate, endDate] = value.split('-');

    const startDateTime = parse(startDate.trim(), 'yy.MM.dd', new Date(), { locale: ko });
    const endDateTime = parse(endDate.trim(), 'yy.MM.dd', new Date(), { locale: ko });

    startTimeField.onChange(startDateTime);
    dueTimeField.onChange(endDateTime);
  };

  const handleSelectLimitTime = (value: string) => {
    limitTimeField.onChange(value);
  };

  const handleFocus = () => {
    if (activeProblemId) resetActiveProblemId();
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const { isEditMode } = useQuizEditMode();
  const startTime = watch('startTime');
  const dueTime = watch('dueTime');

  useEffect(() => {
    if (startTime && dueTime) {
      setDefaultPeriod(
        `${format(new Date(startTimeField.value), 'yy.MM.dd')} - ${format(new Date(dueTimeField.value), 'yy.MM.dd')}`,
      );
    }
  }, [startTime, dueTime]);

  return (
    <div
      className={`flex flex-col justify-start items-start gap-[10px] w-full p-[20px] bg-white rounded-[10px] box-border border ${isActive ? 'border-purple-50' : 'border-white'}`}
    >
      <TipTapField
        control={control}
        name='title'
        setEditor={setEditor}
        placeholder='퀴즈 제목을 입력하세요'
        size='w-full min-h-[48px]'
        fieldStyle='border-none bg-white p-[10px] focus:outline-none'
        textStyle='text-heading2 text-gray-90 placeholder:text-gray-50'
        placeholderStyle='placeholder-pl-10'
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className='flex items-center gap-[17px]'>
        <DateTimePicker
          type='CALENDAR'
          calendar='PERIOD_TYPE'
          placeholder='응시기한'
          defaultValue={isEditMode ? defaultPeriod : undefined}
          onSelectDate={handleSelectPeriod}
          customImageSize='w-[20px] h-[20px]'
          customTextStyle='text-headline2 font-semibold'
          customWidthSize='w-fit px-[10px] py-[5px]'
          customComponentSize='gap-[10px]'
        />
        <DateTimePicker
          type='TIME'
          time='LIMIT_TIME'
          placeholder='응시시간'
          defaultValue={isEditMode ? limitTimeField.value : undefined}
          onSelectDate={handleSelectLimitTime}
          customImageSize='w-[20px] h-[20px]'
          customTextStyle='text-headline2 font-semibold'
          customWidthSize='w-fit px-[10px] py-[5px]'
          customComponentSize='gap-[10px]'
          customDropdownSize='w-[105px] h-[32px]'
        />
      </div>
      <TipTapField
        control={control}
        name='description'
        placeholder='설명'
        size='w-full min-h-[50px]'
        fieldStyle='pl-[20px] py-[15px] bg-white rounded-[10px] border border-gray-20 focus:outline-none disabled:bg-gray-10'
        setEditor={setEditor}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderStyle='placeholder-pl-20'
      />
    </div>
  );
}
