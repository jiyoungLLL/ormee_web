import { fetcher, Method } from '@/utils/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useApiQuery<T>(key: string[], endpoint: string, enabled = true) {
  return useQuery<T>({
    queryKey: key,
    queryFn: () => fetcher<T>({ method: 'GET', endpoint }),
    enabled,
  });
}

export function useApiMutation<T, V>(method: Exclude<Method, 'GET'>, endpoint: string, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation<T, Error, V>({
    mutationFn: (body: V) => fetcher<T>({ method, endpoint, body }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      onSuccess?.();
    },
  });
}
