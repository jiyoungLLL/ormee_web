import { SideNavWrapper } from './SideNavWrapper';

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex justify-between w-[1320px] mx-auto bg-gray-10 overflow-x-auto'>
      <SideNavWrapper />
      <main className='w-[1018px]'>{children}</main>
    </div>
  );
}
