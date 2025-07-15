'use client';

import { useSearchNotice } from '@/features/notice/useNoticeApi';
import { useLectureId } from '@/hooks/queries/useLectureId';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const MAX_PAGE_COUNT = 10;

export default function NoticePage() {
  const router = useRouter();
  const lectureId = useLectureId();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const keyword = searchParams.get('search') ?? '';

  const { data } = useSearchNotice(lectureId, keyword, page);

  if (!data) return null;

  const currentPage = data.currentPage;
  const totalPages = data.totalPages;

  const currentSet = Math.floor((currentPage - 1) / MAX_PAGE_COUNT);
  const startPage = currentSet * MAX_PAGE_COUNT + 1;
  const endPage = Math.min(startPage + MAX_PAGE_COUNT - 1, totalPages);

  const hasPrevSet = startPage > 1;
  const hasNextSet = endPage < totalPages;

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className='relative top-[60px] flex justify-center items-center gap-[18px]'>
      {/* Prev set */}
      {hasPrevSet && (
        <button onClick={() => handlePageChange(startPage - 1)}>
          <Image
            src='/assets/icons/pagination.png'
            alt='이전 페이지'
            width={24}
            height={24}
            className='-rotate-90'
          />
        </button>
      )}

      {/* Page numbers */}
      <div className='flex gap-[10px]'>
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`w-[30px] h-[30px] flex items-center justify-center rounded-[5px] text-headline2 font-semibold ${
              pageNum === page ? 'bg-gray-30' : ''
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* Next set */}
      {hasNextSet && (
        <button onClick={() => handlePageChange(endPage + 1)}>
          <Image
            src='/assets/icons/pagination.png'
            alt='다음 페이지'
            width={24}
            height={24}
          />
        </button>
      )}
    </div>
  );
}
