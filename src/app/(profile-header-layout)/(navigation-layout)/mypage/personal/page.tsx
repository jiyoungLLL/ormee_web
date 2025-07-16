'use client';

import PersonalInfoForm from '@/components/personalInfo/PersonalInfoForm';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function PersonalPage() {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    if (!isEdit) setIsEdit(true);
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-[25px]'>
        <h1 className='text-title3 font-bold px-[5px]'>개인정보 설정</h1>
        <Button
          htmlType='button'
          type='BUTTON_BASE_TYPE'
          size='w-fit h-fit'
          title='수정하기'
          font='text-headline1 font-[18px] font-semibold'
          isPurple
          isfilled={false}
          onClick={handleEdit}
        />
      </div>
      <div className='w-[1018px] h-[706px] px-[30px] py-[20px] rounded-[20px] bg-white'>
        <PersonalInfoForm isEdit={isEdit} />
      </div>
    </div>
  );
}
