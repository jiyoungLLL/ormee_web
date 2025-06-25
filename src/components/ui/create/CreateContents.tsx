'use client';

import Input from '@/components/ui/Input';
import { useFormContext } from 'react-hook-form';
import DateTimePicker from '../DateTimePicker';
import WriteBox from '../WriteBox';

type CreateTitleProps = {
  type: '공지' | '숙제';
  files?: string[];
};

export default function CreateContents({ type, files }: CreateTitleProps) {
  const { setValue, control, watch } = useFormContext();

  const dueTime = watch('dueTime');

  return (
    <div className='absolute top-[144px] w-[1018px] h-[906px] flex flex-col gap-[20px]'>
      <div className='bg-white py-[20px] px-[30px] rounded-[10px] flex flex-col gap-[10px]'>
        <Input
          name='title'
          control={control}
          size='w-[958px] h-[48px]'
          inputStyle='border-none focus:outline-none'
          placeholder={`${type} 제목을 입력해 주세요.`}
        />
        <DateTimePicker
          type='CALENDAR'
          calendar='DATE_TYPE'
          placeholder={type === '공지' ? '공지 등록일' : '제출기한'}
          onSelectDate={(value) => setValue('dueTime', value)}
          defaultValue={dueTime}
        />
      </div>

      <WriteBox
        type={type}
        files={files}
      />
    </div>
  );
}
