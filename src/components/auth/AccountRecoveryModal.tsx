'use client';

import Modal from '@/components/ui/Modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { AccountRecoveryFormValues } from '@/features/auth/auth.types';
import { recoveryIdAction } from '@/features/auth/auth.action';

type AccountRecoveryModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

type TabType = 'id' | 'password';

const FORM_WIDTH = 'w-[400px]';
const INPUT_HEIGHT = 'h-[50px]';

export default function AccountRecoveryModal({ isOpen, closeModal }: AccountRecoveryModalProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>('id');
  const { control, handleSubmit } = useForm<AccountRecoveryFormValues>({
    defaultValues: { name: '', phoneNumber: '' },
  });

  const handleRecoveryId = handleSubmit(async (formData, event) => {
    event?.preventDefault();

    try {
      const { status, code, data } = await recoveryIdAction(formData);

      if (status === 'success') {
        // 아이디 표시 모달 띄우기, 아이디 표시 모달에 onClose 전달하기
        console.log('아이디 찾기 성공: ', data);
      } else if (code === 404) {
        // 존재하지 않는 회원입니다 모달 띄우기
        console.log('존재하지 않는 회원입니다: ', data);
      } else {
        // 에러 모달 띄우기
        console.log('에러: ', data);
      }
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') console.error(error);
      // 에러 모달 띄우기
      console.log('에러: ', error);
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onCancel={closeModal}
      onConfirm={closeModal}
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
          <form
            className={`flex flex-col justify-center items-center ${FORM_WIDTH} h-full gap-[10px]`}
            onSubmit={handleRecoveryId}
          >
            <h5 className='text-body2-normal text-gray-60'>가입하신 정보를 입력해주세요.</h5>
            <div className='flex flex-col gap-[12px] w-full'>
              <Input
                control={control}
                name='name'
                placeholder='이름'
                size={`w-full ${INPUT_HEIGHT}`}
              />
              <Input
                control={control}
                name='phoneNumber'
                placeholder='연락처'
                size={`w-full ${INPUT_HEIGHT}`}
              />
            </div>
            <Button
              title='아이디 찾기'
              type='BUTTON_BASE_TYPE'
              size={`w-full ${INPUT_HEIGHT}`}
              font='text-headline1 font-bold'
              isPurple
              isfilled
              htmlType='submit'
            />
          </form>
        )}
        {selectedTab === 'password' && (
          <div className={`flex flex-col gap-[10px] justify-center items-center ${FORM_WIDTH} h-full`}>
            <h5 className='text-body2-normal text-gray-60'>비밀번호를 찾으려면 본인인증이 필요해요.</h5>
            <Button
              title='본인인증 하기'
              type='BUTTON_BASE_TYPE'
              size={`w-full ${INPUT_HEIGHT}`}
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
