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
    >
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='w-full grid grid-cols-2'>
          <button
            type='button'
            onClick={() => setSelectedTab('id')}
          >
            아이디 찾기
          </button>
          <button
            type='button'
            onClick={() => setSelectedTab('password')}
          >
            비밀번호 찾기
          </button>
        </div>
        {selectedTab === 'id' && (
          <form className='flex flex-col w-[400px] gap-[10px]'>
            <h5>가입하신 정보를 입력해주세요.</h5>
            <div className='flex flex-col gap-[12px]'>
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
        {selectedTab === 'password' && <div>비밀번호 찾기</div>}
      </div>
    </Modal>
  );
}
