'use client';

import { useEffect, useState } from 'react';

export default function MswProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { default: initMsw } = await import('@/mock/initMsw');
      await initMsw();
      setMswReady(true);
    };

    if (!mswReady && process.env.NODE_ENV === 'development') init();
  }, [mswReady]);

  if (process.env.NODE_ENV === 'production') return <>{children}</>;
  if (!mswReady) return null;
  return <>{children}</>;
}
