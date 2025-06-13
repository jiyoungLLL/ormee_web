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
  return useQuery<T, Error>({
    queryKey: key,
    queryFn: async () => {
      const response = await fetcher<T>({ method: 'GET', endpoint });
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data;
    },
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
    mutationFn: async (body: V) => {
      const response = await fetcher<T>({ method, endpoint, body });
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess,
    onError,
  });
}
