'use client';

import { UserProfileData } from '@/types/user.types';
import Image from 'next/image';
import Link from 'next/link';

type ProfilePanelProps = {
  profileData: UserProfileData;
};

export default function ProfilePanel({ profileData }: ProfilePanelProps) {
  const { name, image, bio } = profileData;

  return (
    <div className='absolute right-0 top-[44px] w-[299px] h-[207px] px-[30px] py-[20px] rounded-[15px] bg-white shadow-[0px_0px_7px_0px_rgba(70,72,84,0.10)] select-none'>
      <section
        className='mb-[20px]'
        aria-label='사용자 프로필 정보'
      >
        <div className='flex flex-row justify-between items-start self-stretch mb-[10px]'>
          {image ? (
            <Image
              src={image}
              width={40}
              height={40}
              alt='프로필 이미지'
              className='rounded-full object-cover'
              draggable={false}
            />
          ) : (
            <div className='w-[40px] h-[40px] rounded-full bg-gray-50' />
          )}
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
          <p className='text-gray-90 text-label2-normal'>{bio || '한줄 소개를 입력해보세요.'}</p>
        </div>
      </section>
      <section
        className='flex flex-row gap-[10px] justify-between items-center'
        aria-label='프로필 설정 및 마이페이지 이동 버튼'
      >
        <button className='flex justify-center items-center h-[40px] px-[20px] py-[12px] rounded-[10px] bg-white border-[1px] border-purple-50 text-purple-50 text-headline2 font-semibold'>
          프로필 설정
        </button>
        <Link href='/mypage/personal'>
          <button className='flex justify-center items-center h-[40px] px-[20px] py-[12px] rounded-[10px] bg-purple-50 text-white text-headline2 font-semibold'>
            마이페이지
          </button>
        </Link>
      </section>
    </div>
  );
}
