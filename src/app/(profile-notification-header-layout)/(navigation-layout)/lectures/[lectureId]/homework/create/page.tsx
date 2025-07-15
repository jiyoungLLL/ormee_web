'use client';

import Create from '@/components/ui/create/Create';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function HomeworkCreate() {
  const lectureNum = useLectureId();

  const pathname = usePathname();
  // 뒤로가기 이벤트 감지?
  useEffect(() => {}, [pathname]);

  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const id = searchParams.get('id');

  return (
    <div>
      <Create
        type='homework'
        params={lectureNum}
        {...(filter ? { filter } : {})}
        {...(id ? { id } : {})}
      />
    </div>
  );
}
