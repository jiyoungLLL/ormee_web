'use client';

import Create from '@/components/ui/create/Create';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function NoticeWrite() {
  const lectureNum = useLectureId();

  const pathname = usePathname();
  // 뒤로가기 이벤트 감지?
  useEffect(() => {}, [pathname]);

  return (
    <div>
      <Create
        type='NOTICE'
        params={lectureNum}
      />
    </div>
  );
}
