'use client';

import MainSideNav from '@/components/ui/sideNav/MainSideNav';
import MyPageSideNav from '@/components/ui/sideNav/MyPageSideNav';
import { usePathname } from 'next/navigation';

export function SideNavWrapper() {
  const pathname = usePathname();
  const pathSegments = pathname ? pathname.split('/').filter(Boolean) : [];
  const [mainCategory] = pathSegments.slice(0, 1);

  return <div>{mainCategory === 'mypage' ? <MyPageSideNav /> : <MainSideNav />}</div>;
}
