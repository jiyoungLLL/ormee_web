import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useBackRedirect(redirectTo: string) {
  const router = useRouter();

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      router.push(redirectTo);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router, redirectTo]);
}
