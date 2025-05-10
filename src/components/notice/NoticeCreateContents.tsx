'use client';

import Input from '@/components/ui/Input';
import { useFormContext } from 'react-hook-form';
import DateTimePicker from '../ui/DateTimePicker';
import WriteBox from '../ui/WriteBox';

export default function NoticeWriteContents() {
  const { control } = useFormContext();

  return (
    <div className='absolute top-[144px] h-[906px] flex flex-col gap-[20px]'>
      <div className=' bg-white py-[20px] px-[30px] rounded-[10px] flex flex-col gap-[10px]'>
        <Input
          name='title'
          control={control}
          size='w-[958px] h-[48px]'
          inputStyle='border-none focus:outline-none'
          placeholder='공지 제목을 입력하세요'
        />
        <DateTimePicker
          type='CALENDAR'
          calendar='DATE_TYPE'
          placeholer='공지 등록일'
        />
      </div>

      <WriteBox type='공지' />
    </div>
  );
}
