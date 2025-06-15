'use server';

import QuizDetailHeader from '@/components/quiz/\bdetail/QuizDetailHeader';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { fetcher } from '@/utils/api/api';
import { QueryClient } from '@tanstack/react-query';

export default async function QuizDetailPage({ params }: { params: Promise<{ lectureId: string; quizId: string }> }) {
  const { lectureId, quizId } = await params;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.quizDetail(quizId),
    queryFn: async () => {
      const response = await fetcher({
        method: 'GET',
        endpoint: `/teachers/quizzes/${quizId}`,
        authorization: true,
      });

      if (response.status === 'fail') {
        Promise.reject(response.data);
      }

      if (response.status === 'success') {
        return response.data;
      }
    },
  });

  return (
    <div>
      <QuizDetailHeader
        lectureId={lectureId}
        quizId={quizId}
      />
    </div>
  );
}
