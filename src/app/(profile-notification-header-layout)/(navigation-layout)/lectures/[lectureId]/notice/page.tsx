import NoticeHeader from '@/components/notice/NoticeHeader';
import NoticeList from '@/components/notice/NoticeList';
import NoticePage from '@/components/notice/NoticePage';

export default function Notice() {
  return (
    <div className='h-[100vh]'>
      <NoticeHeader />
      <NoticeList />
      <NoticePage />
    </div>
  );
}
