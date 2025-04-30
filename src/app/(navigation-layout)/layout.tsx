import { SideNavWrapper } from './SideNavWrapper';

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col bg-gray-10 items-center'>
      <header className='w-[1320] h-[74px]'>헤더 공간</header>
      <div className='flex justify-between w-[1320px] h-[100vh] mx-auto bg-gray-10'>
        <SideNavWrapper />
        <main className='w-[1018px]'>{children}</main>
      </div>
    </div>
  );
}
