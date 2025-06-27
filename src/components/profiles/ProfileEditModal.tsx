'use client';

import Modal from '@/components/ui/Modal';
import { useGetProfileData } from '@/features/profile/useProfileQuery';
import Image from 'next/image';
import Textarea from '../ui/Textarea';
import { useForm } from 'react-hook-form';

type ProfileEditModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
};

export default function ProfileEditModal({ isOpen, onConfirm, onClose, onCancel }: ProfileEditModalProps) {
  const { data: currentProfile } = useGetProfileData();
  const { nickname, image, bio } = currentProfile || {};

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      description: bio,
    },
  });

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      isOpen={isOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      containerStyle='w-[452px] px-[30px] py-[20px] rounded-[15px] bg-white'
      buttonContainerStyle='flex justify-end items-center w-full h-[50px] gap-[10px] mt-[35px]'
      cancelButtonType={{
        type: 'BUTTON_BASE_TYPE',
        isPurple: true,
        isfilled: false,
        size: 'w-[114.5px] h-[50px]',
      }}
      confirmButtonType={{
        type: 'BUTTON_BASE_TYPE',
        isPurple: true,
        isfilled: true,
        size: 'w-[114.5px] h-[50px]',
        title: '저장',
      }}
    >
      <div className='flex flex-col items-center w-full h-full'>
        <div className='flex flex-row justify-start items-start gap-[20px] w-full h-full mb-[20px]'>
          <Image
            src={image || '/assets/images/profile/default_profile.png'}
            alt='profile'
            width={100}
            height={100}
            className='w-[100px] h-[100px] object-cover'
          />
          <div className='flex flex-col gap-[15px] w-fit h-fit'>
            <p className='flex flex-row items-center gap-[5px]'>
              <span className='text-title2 font-semibold'>{nickname}</span>
              <span className='text-heading2 font-semibold text-gray-60'>선생님</span>
            </p>
            <button className='flex justify-center items-center w-fit h-[40px] px-[20px] py-[12px] rounded-[10px] border border-gray-30 text-headline2 font-semibold bg-white'>
              사진 변경
            </button>
          </div>
        </div>
        <Textarea
          name='description'
          control={methods.control}
          placeholder='한줄소개'
          maxLength={20}
          showCharacterCount
          autoResize
          minHeight={48}
        />
      </div>
    </Modal>
  );
}
