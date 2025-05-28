'use client';

import { useSearchParams } from 'next/navigation';

export default function HomeworkFeedback() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return <div>{id}</div>;
}
