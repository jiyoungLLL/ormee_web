'use client';

import NoticeCreate from '@/components/notice/NoticeCreate';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function NoticeWrite() {
  const pathname = usePathname();
  // 뒤로가기 이벤트 감지?
  useEffect(() => {}, [pathname]);

  return (
    <div>
      <NoticeCreate />
    </div>
  );
}
