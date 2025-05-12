'use client';

import SideNav from '@/components/ui/SideNav';
import { usePathname } from 'next/navigation';

export function SideNavWrapper() {
  const pathname = usePathname();
  const pathSegments = pathname ? pathname.split('/').filter(Boolean) : [];
  const [mainCategory] = pathSegments.slice(0, 1);

  // 임시 데이터
  const ex = {
    title: ['오르미 토익 RC', '오르미 토익 LC'],
    student: 24,
    date: {
      days: ['월', '수'],
      times: ['15:30 - 16:00'],
    },
  };
  return (
    <div>
      {mainCategory === 'mypage' ? (
        <SideNav type={mainCategory} />
      ) : (
        <SideNav
          type='main'
          title={ex.title}
          student={ex.student}
          date={ex.date}
        />
      )}
    </div>
  );
}
