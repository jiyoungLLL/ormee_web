'use client';

import Input from '@/components/ui/Input';
import { useFormContext } from 'react-hook-form';
import DateTimePicker from '../DateTimePicker';
import WriteBox from '../WriteBox';

type CreateTitleProps = {
  type: '공지' | '과제';
};

export default function CreateContents({ type }: CreateTitleProps) {
  const { control } = useFormContext();

  return (
    <div className='absolute top-[144px] w-[1018px] h-[906px] flex flex-col gap-[20px]'>
      <div className=' bg-white py-[20px] px-[30px] rounded-[10px] flex flex-col gap-[10px]'>
        <Input
          name='title'
          control={control}
          size='w-[958px] h-[48px]'
          inputStyle='border-none focus:outline-none'
          placeholder={`${type} 제목을 입력하세요`}
        />
        <DateTimePicker
          type='CALENDAR'
          calendar='DATE_TYPE'
          placeholder={type === '공지' ? '공지 등록일' : '제출기한'}
        />
      </div>

      <WriteBox type={type} />
    </div>
  );
}
