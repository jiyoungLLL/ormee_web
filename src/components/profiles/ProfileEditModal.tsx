'use client';

import Modal from '@/components/ui/Modal';
import { useGetProfileData, usePutProfileData } from '@/features/profile/useProfileQuery';
import Image from 'next/image';
import Textarea from '../ui/Textarea';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ProfileEditForm, ProfileEditRequest } from '@/features/profile/profile.types';
import { postAttachment } from '@/utils/api/postAttachment';
import { useToastStore } from '@/stores/toastStore';

type ProfileEditModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileEditModal({ isOpen, setIsOpen }: ProfileEditModalProps) {
  const { data: currentProfile } = useGetProfileData();
  const { nickname, image, bio } = currentProfile || {};
  const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: editProfile } = usePutProfileData();
  const { addToast } = useToastStore();

  const methods = useForm<ProfileEditForm>({
    mode: 'onSubmit',
    defaultValues: {
      introduction: bio,
      fileId: null,
    },
  });

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const fileId = await postAttachment({ file, type: 'TEACHER_IMAGE', renameFile: true });
        setThumbnailURL(URL.createObjectURL(file));
        methods.setValue('fileId', fileId);
      } catch (error) {
        if (error instanceof Error) addToast({ message: error.message, type: 'error' });
      }
    }
  };

  const handleCancel = () => {
    setThumbnailURL(null);
    methods.reset();
    setIsOpen(false);
  };

  const handleConfirm = () => {
    const { introduction, fileId } = methods.getValues();

    const requestData: ProfileEditRequest = {};

    if (introduction !== null) {
      requestData.introduction = introduction;
    }

    if (fileId !== null) {
      requestData.fileId = fileId;
    }

    editProfile(requestData);

    setThumbnailURL(null);
    methods.reset();
    setIsOpen(false);
  };

  useEffect(() => {
    methods.reset({
      introduction: bio,
      fileId: null,
    });
  }, [isOpen]);

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
            src={thumbnailURL || image || '/assets/images/profile/default_profile.png'}
            alt='profile'
            width={100}
            height={100}
            className='w-[100px] h-[100px] object-cover rounded-full'
          />
          <div className='flex flex-col gap-[15px] w-fit h-fit'>
            <p className='flex flex-row items-center gap-[5px]'>
              <span className='text-title2 font-semibold'>{nickname}</span>
              <span className='text-heading2 font-semibold text-gray-60'>선생님</span>
            </p>
            <button
              onClick={handleFileButtonClick}
              className='flex justify-center items-center w-fit h-[40px] px-[20px] py-[12px] rounded-[10px] border border-gray-30 text-headline2 font-semibold bg-white'
            >
              사진 변경
            </button>
            <input
              type='file'
              accept='image/*'
              className='hidden'
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <Textarea
          name='introduction'
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
