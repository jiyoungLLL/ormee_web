'use client';

import Modal from '@/components/ui/Modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { AccountRecoveryFormValues } from '@/features/auth/auth.types';
import { recoveryIdAction } from '@/features/auth/auth.action';
import { useModal } from '@/hooks/ui/useModal';

type AccountRecoveryModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

type TabType = 'id' | 'password';
type RecoveryResult = { id: string; name: string };

const FORM_WIDTH = 'w-[400px]';
const INPUT_HEIGHT = 'h-[50px]';
const RESULT_MODAL_STYLE = 'w-[400px] px-[30px] py-[20px] rounded-[15px] bg-white select-none';

export default function AccountRecoveryModal({ isOpen, closeModal }: AccountRecoveryModalProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>('id');
  const [recoveredInfo, setRecoveredInfo] = useState<RecoveryResult>({ id: '', name: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<AccountRecoveryFormValues>({
    defaultValues: { name: '', phoneNumber: '' },
  });

  const {
    isOpen: isSuccessModalOpen,
    openModal: openSuccessModal,
    closeModal: closeSuccessModal,
  } = useModal({ defaultOpen: false });

  const {
    isOpen: isFailModalOpen,
    openModal: openFailModal,
    closeModal: closeFailModal,
  } = useModal({ defaultOpen: false });

  const handleCloseAccountRecoveryModal = () => {
    reset();
    closeModal();
  };

  const handleRecoveryId = handleSubmit(async (formData, event) => {
    event?.preventDefault();

    setIsLoading(true);

    try {
      const { status, code, data } = await recoveryIdAction(formData);

      if (status === 'success') {
        setRecoveredInfo({ id: data, name: formData.name });
        openSuccessModal();
      } else {
        openFailModal();
      }
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onCancel={handleCloseAccountRecoveryModal}
        onConfirm={handleCloseAccountRecoveryModal}
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
                disabled={isLoading}
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
      <Modal
        isOpen={isSuccessModalOpen}
        onCancel={closeSuccessModal}
        onConfirm={closeSuccessModal}
        iconSrc='/assets/icons/checked.png'
        enableCancelButton={false}
        enableConfirmButton={false}
        containerStyle={RESULT_MODAL_STYLE}
      >
        <div className='flex flex-col justify-center items-center gap-[35px] w-full h-full'>
          <div className='flex flex-col justify-center items-center gap-[13px] text-heading1 font-semibold'>
            <p>{recoveredInfo.name}님의 아이디는</p>
            <p>
              <span className='text-purple-50'>
                {recoveredInfo.id
                  ? recoveredInfo.id.length > 4
                    ? recoveredInfo.id.slice(0, -4) + '****'
                    : '*'.repeat(recoveredInfo.id.length)
                  : ''}
              </span>
              입니다.
            </p>
          </div>
          <Button
            title='확인'
            type='BUTTON_BASE_TYPE'
            size={`w-full ${INPUT_HEIGHT}`}
            font='text-headline1 font-bold'
            isPurple
            isfilled
            htmlType='button'
            onClick={closeSuccessModal}
          />
        </div>
      </Modal>
      <Modal
        isOpen={isFailModalOpen}
        onCancel={closeFailModal}
        onConfirm={closeFailModal}
        iconSrc='/assets/icons/warning.png'
        enableCancelButton={false}
        enableConfirmButton={false}
        containerStyle={RESULT_MODAL_STYLE}
      >
        <div className='flex flex-col justify-center items-center gap-[35px] w-full'>
          <div className='flex flex-col justify-center items-center gap-[13px] text-heading1 font-semibold'>
            <p>입력하신 정보와</p>
            <p>일치하는 아이디가 없어요.</p>
          </div>
          <Button
            title='확인'
            type='BUTTON_BASE_TYPE'
            size={`w-full ${INPUT_HEIGHT}`}
            font='text-headline1 font-bold'
            isPurple
            isfilled
            htmlType='button'
            onClick={closeFailModal}
          />
        </div>
      </Modal>
    </>
  );
}
