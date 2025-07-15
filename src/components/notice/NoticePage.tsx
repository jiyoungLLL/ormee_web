import { useGetNotices } from '@/features/notice/useNoticeApi';
import { useLectureId } from '@/hooks/queries/useLectureId';

export default function NoticePage(page: number) {
  const { data } = useGetNotices(useLectureId());

  return <div></div>;
}
