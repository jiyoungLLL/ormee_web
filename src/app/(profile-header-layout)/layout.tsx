import Header from '@/components/layouts/Header';
import HeaderProfile from '@/components/profiles/HeaderProfile';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex-1 w-full min-h-screen bg-gray-10'>
      <div className='flex flex-col justify-start items-start w-full max-w-[1320px] h-full mx-auto'>
        <Header>
          <HeaderProfile />
        </Header>
        <main className='flex-1 flex flex-col justify-center items-center w-full h-full'>{children}</main>
      </div>
    </div>
  );
}
