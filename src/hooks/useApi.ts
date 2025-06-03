import { fetcher, Method } from '@/utils/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useApiQuery<T>(
  key: readonly unknown[],
  endpoint: string,
  enabled = true,
  options?: {
    staleTime?: number;
    gcTime?: number;
  },
) {
  return useQuery<T>({
    queryKey: key,
    queryFn: () => fetcher<T>({ method: 'GET', endpoint }),
    enabled,
    staleTime: options?.staleTime,
    gcTime: options?.gcTime,
  });
}

export function useApiMutation<T, V>(
  method: Exclude<Method, 'GET'>,
  endpoint: string,
  onSuccess?: () => void,
  invalidateKey?: readonly unknown[] | readonly unknown[][],
  onError?: (err: Error) => void,
) {
  const queryClient = useQueryClient();

  return useMutation<T, Error, V>({
    mutationFn: (body: V) => fetcher<T>({ method, endpoint, body }),
    onSuccess: () => {
      if (Array.isArray(invalidateKey)) {
        invalidateKey.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
      } else if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
      onSuccess?.();
    },
    onError,
  });
}
