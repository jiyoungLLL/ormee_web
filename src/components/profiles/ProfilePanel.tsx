'use client';

import { UserProfileData } from '@/types/user.types';

type ProfilePanelProps = {
  profileData: UserProfileData;
};
export default function ProfilePanel({ profileData }: ProfilePanelProps) {
  const { name, image, bio } = profileData;

  return (
    <div className='absolute right-0 top-[44px] w-[299px] h-[207px] px-[30px] py-[20px] rounded-[15px] bg-white shadow-[0px_0px_7px_0px_rgba(70,72,84,0.10)]'></div>
  );
}
