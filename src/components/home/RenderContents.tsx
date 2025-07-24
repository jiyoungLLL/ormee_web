import { useGetHome } from '@/features/home/hooks/useGetHome';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

export default function RenderContents({ category }: { category: string }) {
  const added = category === '질문' ? 'question' : 'notice?page=1';

  const emptyComment = category === '질문' ? '아직 올라온 질문이 없어요.' : '작성한 공지가 없어요.';
  const lectureNum = useLectureId();
  const { data: homeData } = useGetHome();
  const renderData = category === '질문' ? homeData?.questions : homeData?.notices;

  // 고정 데이터 중복 제기
  const seen = new Set();
  const filterData = renderData?.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });

  const isEmpty = renderData?.length == 0;
  const emptyStyle = isEmpty ? 'justify-center items-center' : '';

  const handleLinkUrl = (category: string, id: string, isPinned?: boolean) => {
    if (category === '질문') return `/question/${id}`;
    if (category === '공지') {
      return `/notice/detail?ispinned=${isPinned}&id=${id}`;
    }
  };

  return (
    <div className='w-full flex flex-col gap-[10px]'>
      <div className=' h-[28px] flex justify-between pr-[5px] pl-[8px]'>
        <div className='text-heading2 font-semibold'>{category}</div>
        <Link
          href={`/lectures/${lectureNum}/${added}`}
          className='text-headline2 font-semibold text-[16px] text-gray-50 flex gap-[4px] items-center'
        >
          더보기
          <Image
            src={'/assets/icons/right_arrow.png'}
            width={22}
            height={22}
            alt='더보기 아이콘'
          />
        </Link>
      </div>
      <div
        className={`w-full h-[140px] rounded-[20px] px-[30px] py-[20px] flex flex-col gap-[10px] bg-white ${emptyStyle}`}
      >
        {isEmpty ? (
          <div className='text-heading2 font-semibold text-[rgb(181_182_188)]'>{emptyComment}</div>
        ) : (
          filterData?.map((item, index) => {
            const isPinned = item?.type === '고정';
            const redirectUrl = handleLinkUrl(category, item.id.toString(), isPinned);

            return (
              <Link
                href={`/lectures/${lectureNum}/${redirectUrl}`}
                key={`${item.title}-${index}`}
                className='flex justify-between text-headline1'
              >
                <div className='flex gap-[5px] items-center'>
                  {item.type === '고정' && (
                    <Image
                      src={'/assets/icons/homePin.png'}
                      alt='고정 아이콘'
                      width={18}
                      height={18}
                      className='w-[18px] h-[18px]'
                    />
                  )}
                  <div>{item.title}</div>
                </div>
                <div className='text-[rgb(126_127_142)]'>{item.openTime && format(item.openTime, 'yyyy.MM.dd')}</div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
