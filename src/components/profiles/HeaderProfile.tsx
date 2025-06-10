'use client';

import Image from 'next/image';
import { useState } from 'react';
import ProfilePanel from './ProfilePanel';
import { UserProfileData } from '@/features/profile/profile.types';

type HeaderProfileProps = {
  /** 프로필 패널에 보여질 데이터 */
  userProfileData: UserProfileData;
};

export default function HeaderProfile({ userProfileData }: HeaderProfileProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const { name, image } = userProfileData;

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
          <span className='font-semibold'>{name}</span>
          <span className='font-normal ml-[3px]'>선생님</span>
        </p>
      </div>
      {isPanelOpen && (
        <ProfilePanel
          profileData={userProfileData}
          onClose={handlePanelClose}
        />
      )}
    </div>
  );
}
