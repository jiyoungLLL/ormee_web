import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useQueryClient } from '@tanstack/react-query';

export const useClassFromCache = () => {
  const queryClient = useQueryClient();

  const classList = queryClient.getQueryData(QUERY_KEYS.classList());

  return classList;
};
