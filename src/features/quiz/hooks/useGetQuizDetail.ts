import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../hooks/queries/queryKeys';

const getQuizDetail = async (quizId: string) => {
  const response = await fetch(`/api/teachers/quizzes/${quizId}`);

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') console.error(response.statusText);
    throw new Error('퀴즈 상세 정보를 불러오는데 실패했습니다.');
  }

  const json = await response.json();

  return json;
};

// TODO: 임시저장 목록 불러오는 api 연동 후 교체
export const useGetQuizDetailTemp = (quizId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.quizDetail(quizId),
    queryFn: () => getQuizDetail(quizId),
    enabled: !!quizId,
    staleTime: 6 * 60 * 60 * 1000, // 6시간
    gcTime: 12 * 60 * 60 * 1000, // 12시간
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
