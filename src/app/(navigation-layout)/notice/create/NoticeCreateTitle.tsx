'use client';

import Input from '@/components/ui/Input';
import { useForm } from 'react-hook-form';

export default function NoticeWriteTitle() {
  const { control } = useForm();

  return (
    <div className='absolute top-[144px] bg-white py-[20px] px-[30px] rounded-[10px] flex gap-[10px]'>
      <Input
        name='notice-title'
        control={control}
        size='w-[958px] h-[48px]'
        placeholder='공지 제목을 입력하세요'
      />
    </div>
  );
}
