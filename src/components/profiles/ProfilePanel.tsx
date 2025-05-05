'use client';

import { UserProfileData } from '@/types/user.types';
import Image from 'next/image';

type ProfilePanelProps = {
  profileData: UserProfileData;
};
export default function ProfilePanel({ profileData }: ProfilePanelProps) {
  const { name, image, bio } = profileData;

  return (
    <div className='absolute right-0 top-[44px] w-[299px] h-[207px] px-[30px] py-[20px] rounded-[15px] bg-white shadow-[0px_0px_7px_0px_rgba(70,72,84,0.10)]'>
      <section className='mb-[20px]'>
        <div className='flex flex-row justify-between items-start self-stretch mb-[10px]'>
          <Image
            src={image}
            width={40}
            height={40}
            alt='프로필 이미지'
            className='rounded-full object-cover'
            draggable={false}
          />
          {/* TODO: 버튼 컴포넌트 수정 논의 후 변경 */}
          <button className='w-[71px] px-[10px] py-[5px] rounded-[5px] bg-white border-[1px] border-gray-20 text-[14px] text-body2 font-normal text-gray-90'>
            로그아웃
          </button>
        </div>
        <p className='flex flex-row gap-[5px] justify-start items-center mb-[5px]'>
          <span className='text-gray-90 text-heading2 font-semibold'>{name}</span>
          <span className='text-gray-60 text-heading2 font-semibold'>선생님</span>
        </p>
        <div className='flex flex-row gap-[5px] justify-start items-start self-stretch'>
          <img
            src='/assets/icons/header/bio.png'
            alt='한줄 소개'
            className='w-[24px] h-[24px]'
          />
          <p className='text-gray-90 text-label2-normal'>{bio}</p>
        </div>
      </section>
    </div>
  );
}
