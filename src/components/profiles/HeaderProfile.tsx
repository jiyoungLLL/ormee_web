'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import ProfilePanel from '@/components/profiles/ProfilePanel';
import { useGetProfileData } from '@/features/profile/useProfileQuery';
import { ERROR_TYPES, getErrorType } from '@/constants/error.constant';
import { useRouter } from 'next/navigation';
import { useToastStore } from '@/stores/toastStore';

export default function HeaderProfile() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { addToast } = useToastStore();
  const router = useRouter();

  const { data: profileData, isLoading, error } = useGetProfileData();

  useEffect(() => {
    if (error) {
      addToast({ message: error.message, type: 'error' });

      const isAuthError = getErrorType(error.message) === ERROR_TYPES.UNAUTHORIZED;
      if (isAuthError) {
        router.push('/signin');
      }
    }
  }, [error, addToast, router]);

  if (error) {
    return <div className='w-[24px] h-[24px] rounded-full bg-gray-50' />;
  }

  if (isLoading) {
    return <div className='w-[24px] h-[24px] rounded-full bg-gray-50 animate-pulse' />;
  }

  const { nickname, image } = profileData || {};

  const handlePanelToggle = () => {
    setIsPanelOpen((prev) => !prev);
  };

  const handlePanelClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    setIsPanelOpen(false);
  };

  return (
    <div className='relative'>
      <div
        data-testid='header-profile'
        className='flex flex-row justify-between items-center gap-[10px] py-[5px] select-none cursor-pointer'
        onClick={handlePanelToggle}
      >
        {image ? (
          <Image
            src={image}
            width={24}
            height={24}
            className='rounded-full object-cover'
            alt='프로필 이미지'
            draggable={false}
          />
        ) : (
          <div className='w-[24px] h-[24px] rounded-full bg-gray-50' />
        )}
        <p className='text-headline2 text-gray-70'>
          <span className='font-semibold'>{nickname}</span>
          <span className='font-normal ml-[3px]'>선생님</span>
        </p>
      </div>
      {isPanelOpen && profileData && (
        <ProfilePanel
          profileData={profileData}
          onClose={handlePanelClose}
        />
      )}
    </div>
  );
}
