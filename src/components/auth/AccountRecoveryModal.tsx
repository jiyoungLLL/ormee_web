'use client';

import Modal from '@/components/ui/Modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

type AccountRecoveryModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function AccountRecoveryModal({ isOpen, onConfirm, onCancel }: AccountRecoveryModalProps) {
  const [selectedTab, setSelectedTab] = useState<'id' | 'password'>('id');
  const { control } = useForm({ defaultValues: { name: '', phoneNumber: '' } });

  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onConfirm={onConfirm}
      title='아이디/비밀번호 찾기'
      enableCancelButton={false}
      enableConfirmButton={false}
      containerStyle='bg-white rounded-[15px] p-[30px] select-none w-[532px] h-[403px]'
      titleContainerStyle='flex flex-col w-full gap-[13px] mb-[30px]'
    >
      <div className='flex flex-col justify-start items-center gap-4 w-full h-full pb-[60px]'>
        <div className='grid grid-cols-2 w-full h-[50px]'>
          <button
            type='button'
            onClick={() => setSelectedTab('id')}
            className={`text-headline2 border-[2px] border-t-white border-x-white ${selectedTab === 'id' ? 'text-purple-50 font-semibold border-b-purple-50' : 'text-[#000] font-normal border-b-white'}`}
          >
            아이디 찾기
          </button>
          <button
            type='button'
            onClick={() => setSelectedTab('password')}
            className={`text-headline2 border-[2px] border-t-white border-x-white ${selectedTab === 'password' ? 'text-purple-50 font-semibold border-b-purple-50' : 'text-[#000] font-normal border-b-white'}`}
          >
            비밀번호 찾기
          </button>
        </div>
        {selectedTab === 'id' && (
          <form className='flex flex-col justify-center items-center w-[400px] h-full gap-[10px]'>
            <h5 className='text-body2-normal text-gray-60'>가입하신 정보를 입력해주세요.</h5>
            <div className='flex flex-col gap-[12px] w-full'>
              <Input
                control={control}
                name='name'
                placeholder='이름'
                size='w-full h-[50px]'
              />
              <Input
                control={control}
                name='phoneNumber'
                placeholder='연락처'
                size='w-full h-[50px]'
              />
            </div>
            <Button
              title='아이디 찾기'
              type='BUTTON_BASE_TYPE'
              size='w-full h-[50px]'
              font='text-headline1 font-bold'
              isPurple
              isfilled
              htmlType='submit'
            />
          </form>
        )}
        {selectedTab === 'password' && (
          <div className='flex flex-col gap-[10px] justify-center items-center w-[400px] h-full'>
            <h5 className='text-body2-normal text-gray-60'>비밀번호를 찾으려면 본인인증이 필요해요.</h5>
            <Button
              title='본인인증 하기'
              type='BUTTON_BASE_TYPE'
              size='w-full h-[50px]'
              font='text-headline1 font-bold'
              isPurple
              isfilled
              htmlType='button'
            />
          </div>
        )}
      </div>
    </Modal>
  );
}
