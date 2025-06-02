'use client';

import { useParams } from 'next/navigation';

export const useLectureId = () => {
  const params = useParams();
  const lectureId = params?.lectureId as string;

  if (process.env.NODE_ENV === 'test') return 'mock-lecture-id';

  if (!lectureId) throw new Error('useLectureId 훅이 잘못된 위치에서 호출되었습니다.');

  return lectureId;
};
