'use client';

import Image from 'next/image';
import { useState } from 'react';
import ProfilePanel from './ProfilePanel';
import { UserProfileData } from '@/types/user.types';

// TODO: api 연동 후 실제 유저 데이터로 변경
const MOCK_USER_PROFILE: UserProfileData = {
  name: '강수이',
  image:
    'https://img.freepik.com/premium-vector/girl-is-writing-chalkboard-with-pencil-her-hand_990404-19401.jpg?semt=ais_hybrid&w=740',
  bio: '가는 말이 고와야 오는 말이 곱다.',
};

export default function HeaderProfile() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handlePanelToggle = () => {
    setIsPanelOpen((prev) => !prev);
  };

  return (
    <div className='relative'>
      <div
        data-testid='header-profile'
        className='flex flex-row justify-between items-center gap-[10px] py-[5px] select-none cursor-pointer'
        onClick={handlePanelToggle}
      >
        {MOCK_USER_PROFILE.image ? (
        <Image
          src={MOCK_USER_PROFILE.image}
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
          <span className='font-semibold'>{MOCK_USER_PROFILE.name}</span>
          <span className='font-normal ml-[3px]'>선생님</span>
        </p>
      </div>
      {isPanelOpen && <ProfilePanel profileData={MOCK_USER_PROFILE} />}
    </div>
  );
}
