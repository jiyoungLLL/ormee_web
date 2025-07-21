'use client';

import { useGetNotices, useGetPinnedNotices, useSearchNotice } from '@/features/notice/useNoticeApi';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function NoticeList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const keyword = searchParams.get('search') ?? '';

  const lectureId = useLectureId();

  const searchNoticeData = useSearchNotice(lectureId, keyword, page);
  const getNoticesData = useGetNotices(lectureId, page);
  const totalData = keyword ? searchNoticeData.data : getNoticesData.data;

  const { data: originalPinnedData, refetch: refetchPinnedData } = useGetPinnedNotices(lectureId);
  const searchPinnedData = totalData?.content?.filter((notice) => notice.isPinned === true) ?? [];

  const pinnedData = keyword ? searchPinnedData : originalPinnedData;

  // 고정 공지 제외 인덱싱
  const totalUnpinnedCount = (totalData?.totalElements ?? 0) - (pinnedData?.length ?? 0);
  const pageSize = 15;
  const startNo = totalUnpinnedCount - (page - 1) * pageSize;

  // 검색인지 아닌지
  const isSearchMode = !!keyword;
  const hasPinnedInSearch = isSearchMode && (pinnedData?.length ?? 0) > 0;
  const showPinned = (!isSearchMode && page === 1) || hasPinnedInSearch;

  // 고정 공지 데이터 제외
  const pinnedIds = pinnedData?.map((notice) => notice.id) ?? [];
  const unpinnedData = totalData?.content?.filter((notice) => !pinnedIds.includes(notice.id)) ?? [];

  useEffect(() => {
    const paramPage = searchParams.get('page');
    if (!paramPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');
      router.replace(`?${params.toString()}`);
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (lectureId) {
      refetchPinnedData();
    }
  }, [refetchPinnedData, searchParams, lectureId, router]);

  // list title
  const titleList: [string, string][] = [
    ['No.', 'w-[34px]'],
    ['제목', 'w-[394px]'],
    ['작성자', 'w-[68px]'],
    ['등록일', 'w-[82px]'],
    ['조회수', 'w-[45px]'],
  ];

  const isTotalDataEmpty = totalData?.content?.length === 0;

  if (isTotalDataEmpty) {
    return (
      <div className='relative top-[35px] w-[1018px] min-h-[730px] rounded-[10px] px-[30px] py-[20px] flex flex-col bg-white justify-center items-center'>
        <div className='text-heading2 font-semibold text-[#B5B6BC] h-[621px] flex items-center jusity-center'>
          작성한 공지가 없어요.
        </div>
      </div>
    );
  }

  return (
    <div className='relative top-[35px] w-[1018px] min-h-[730px] rounded-[10px] px-[30px] py-[20px] flex flex-col bg-white'>
      <div className='w-full h-[50px] flex justify-between items-center py-[10px] border-b border-gray-30'>
        {titleList.map(([text, width], index) => (
          <div
            key={`${index}-${text}`}
            className={`${width} text-headline2 font-semibold text-gray-70`}
          >
            {text}
          </div>
        ))}
      </div>
      {showPinned &&
        pinnedData?.map((pinned) => (
          <Link
            href={`/lectures/${lectureId}/notice/detail?page=${page}&ispinned=true&id=${pinned.id}`}
            key={pinned.id}
            className='w-full h-[50px] flex justify-between py-[10px] items-center'
          >
            <div className='w-[34px] flex justify-center text-headline2 font-gray-70'>
              <Image
                src='/assets/icons/pin.png'
                width={24}
                height={24}
                alt='핀 아이콘'
              />
            </div>
            <div className='w-[394px] text-headline2 font-semibold'>{pinned.title}</div>
            <div className='w-[68px]'>{pinned.author}</div>
            <div className='w-[82px]'>{format(pinned.postDate, 'yyyy.MM.dd')}</div>
            <div className='w-[45px]'>{pinned.likes}</div>
          </Link>
        ))}
      {unpinnedData?.map((notice, index) => {
        const no = startNo - index;

        return (
          <Link
            href={`/lectures/${lectureId}/notice/detail?page=${page}&ispinned=false&id=${notice.id}`}
            key={notice.id}
            className='w-full h-[50px] flex justify-between py-[10px] items-center'
          >
            <div className='w-[34px] flex justify-center text-headline2 font-gray-70'>{no}</div>
            <div className='w-[394px] text-headline2 font-semibold'>{notice.title}</div>
            <div className='w-[68px]'>{notice.author}</div>
            <div className='w-[82px]'>{format(notice.postDate, 'yyyy.MM.dd')}</div>
            <div className='w-[45px]'>{notice.likes}</div>
          </Link>
        );
      })}
    </div>
  );
}
