import { QuizFormValues } from '@/schemas/quiz.schema';
import Input from '../ui/Input';
import { Control, Path, useController } from 'react-hook-form';
import DateTimePicker from '../ui/DateTimePicker';

type QuizCreateTitleInputProps = {
  control: Control<QuizFormValues>;
  name: Path<QuizFormValues>;
};

export default function QuizCreateTitleInput({ control, name }: QuizCreateTitleInputProps) {
  const { field: dueTimeField } = useController({ control, name: 'dueTime' });
  const { field: limitTimeField } = useController({ control, name: 'limitTime' });

  const handleSelectDueTime = (value: string) => {
    dueTimeField.onChange(value);
  };

  const handleSelectLimitTime = (value: string) => {
    limitTimeField.onChange(value);
  };

  return (
    <div className='w-full p-[20px] bg-white rounded-[10px]'>
      <Input
        control={control}
        name={name}
        size='w-full h-[50px]'
        placeholder='퀴즈 제목을 입력하세요'
        inputStyle='border-none bg-white p-[10px] focus:outline-none'
        textStyle='text-heading2 text-gray-90 placeholder:text-gray-50'
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
    </div>
  );
}
