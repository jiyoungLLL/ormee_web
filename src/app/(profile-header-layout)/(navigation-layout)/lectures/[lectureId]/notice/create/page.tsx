'use client';

import Create from '@/components/ui/create/Create';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function NoticeWrite() {
  const pathname = usePathname();
  // 뒤로가기 이벤트 감지?
  useEffect(() => {}, [pathname]);

  return (
    <div>
      <Create type='notice' />
    </div>
  );
}
