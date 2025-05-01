import Header from '@/components/layouts/Header';
import { SideNavWrapper } from './SideNavWrapper';

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col bg-gray-10 items-center'>
      <div className='flex flex-col justify-start items-start w-full max-w-[1320px] h-full mx-auto'>
        <Header />
        <div className='flex justify-between w-[1320px] h-[100vh] mx-auto bg-gray-10'>
          <SideNavWrapper />
          <main className='w-[1018px]'>{children}</main>
        </div>
      </div>
    </div>
  );
}
