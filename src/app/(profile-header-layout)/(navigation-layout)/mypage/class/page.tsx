import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ClassContainer = dynamic(() => import('@/components/class/ClassContainer'), {
  ssr: false,
});

export default function ClassPage() {
  console.log('뭐야 ');
  return (
    <Suspense fallback={null}>
      <ClassContainer />
    </Suspense>
  );
}
