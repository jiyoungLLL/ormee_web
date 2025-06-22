import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { useQueryClient } from '@tanstack/react-query';

export const useHomeworkFromCache = () => {
  const queryClient = useQueryClient();

  const lectureId = useLectureId();
  const homeworkList = queryClient.getQueryData(QUERY_KEYS.homeworkList(lectureId));

  return homeworkList;
};
