import Header from '@/components/layouts/Header';
import HeaderProfile from '@/components/profiles/HeaderProfile';
import Notification from '@/components/notification/Notification';
import { MOCK_USER_PROFILE } from '@/mock/profile';

export default function Layout({ children }: { children: React.ReactNode }) {
  // TODO: api 연동 후 실제 유저 데이터 받아와 세팅하기

  return (
    <div className='flex-1 w-full min-w-fit min-h-screen bg-gray-10 max-[1310px]:px-[10px]'>
      <div className='flex flex-col justify-start items-start w-full max-w-[1320px] h-full mx-auto'>
        <Header>
          <div className='flex flex-row justify-between items-center gap-[30px]'>
            <Notification />
            <HeaderProfile userProfileData={MOCK_USER_PROFILE} />
          </div>
        </Header>
        <main className='flex-1 flex flex-col justify-center items-center w-full h-full'>{children}</main>
      </div>
      <div id='profile-root' />
      <div id='notification-root' />
    </div>
  );
}
