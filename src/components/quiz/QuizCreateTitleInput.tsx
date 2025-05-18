import { QuizFormValues } from '@/schemas/quiz.schema';
import { Control, Path, useController } from 'react-hook-form';
import DateTimePicker from '../ui/DateTimePicker';
import { useState } from 'react';
import { useActiveProblemStore } from '@/stores/activeProblemStore';
import TipTapField from '../ui/TipTapField';
import { Editor } from '@tiptap/react';

type QuizCreateTitleInputProps = {
  control: Control<QuizFormValues>;
  name: Path<QuizFormValues>;
  setEditor: (editor: Editor | null) => void;
};

export default function QuizCreateTitleInput({ control, name, setEditor }: QuizCreateTitleInputProps) {
  const [isActive, setIsActive] = useState(false);
  const { activeProblemId, resetActiveProblemId } = useActiveProblemStore();
  const { field: dueTimeField } = useController({ control, name: 'dueTime' });
  const { field: limitTimeField } = useController({ control, name: 'limitTime' });

  const handleSelectDueTime = (value: string) => {
    dueTimeField.onChange(value);
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

  return (
    <div
      className={`flex flex-col justify-start items-start gap-[10px] w-full p-[20px] bg-white rounded-[10px] box-border border ${isActive ? 'border-purple-50' : 'border-white'}`}
    >
      <TipTapField
        control={control}
        name={name}
        setEditor={setEditor}
        placeholder='퀴즈 제목을 입력하세요'
        fieldStyle='w-full min-h-[50px] border-none bg-white p-[10px] focus:outline-none'
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
          onSelectDate={handleSelectDueTime}
          customImageSize='w-[20px] h-[20px]'
          customTextStyle='text-headline2 font-semibold'
          customWidthSize='w-fit px-[10px] py-[5px]'
          customComponentSize='gap-[10px]'
        />
        <DateTimePicker
          type='TIME'
          time='LIMIT_TIME'
          placeholder='응시시간'
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
        fieldStyle='w-full min-h-[50px] pl-[20px] py-[15px] bg-white rounded-[10px] border border-gray-20 focus:outline-none disabled:bg-gray-10'
        setEditor={setEditor}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderStyle='placeholder-pl-20'
      />
    </div>
  );
}
