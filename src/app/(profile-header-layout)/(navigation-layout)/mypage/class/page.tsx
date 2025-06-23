import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ClassContainer = dynamic(() => import('@/components/class/ClassContainer'), {
  ssr: false,
});

export default function ClassPage() {
  return (
    <Suspense fallback={null}>
      <ClassContainer />
    </Suspense>
  );
}
