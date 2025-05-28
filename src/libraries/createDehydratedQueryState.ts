import { DefaultOptions, dehydrate, QueryClient } from '@tanstack/react-query';

const defaultOptions = {
  staileTime: 1 * 60 * 60 * 1000, // 1시간
  gcTime: 5 * 60 * 60 * 1000, // 5시간
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
};

type PrefetchParams<T> = {
  queryKey: any[];
  queryFn: () => Promise<T>;
};

export const createDehydratedQueryState = async ({
  prefetchParams,
  prefetchOptions,
}: {
  prefetchParams: PrefetchParams<any>[];
  prefetchOptions?: DefaultOptions;
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { ...defaultOptions, ...prefetchOptions },
    },
  });

  await Promise.all(prefetchParams.map(({ queryKey, queryFn }) => queryClient.prefetchQuery({ queryKey, queryFn })));

  return { dehydrateState: dehydrate(queryClient) };
};
