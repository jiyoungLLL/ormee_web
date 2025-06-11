'use client';

import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex-1 flex flex-col justify-center items-center w-full h-full min-h-screen'>
      <Suspense
        fallback={
          <div className='flex items-center justify-center w-full h-full'>
            <div className='w-8 h-8 border-4 border-gray-30 border-t-gray-30 rounded-full animate-spin'></div>
          </div>
        }
      >
        {children}
      </Suspense>
    </main>
  );
}
