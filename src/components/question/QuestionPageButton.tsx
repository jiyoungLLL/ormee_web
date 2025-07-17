'use client';

import { useGetQuestionList } from '@/features/question/hooks/queries/useGetQuestionList';
import {
  QuestionListFilterType,
  QuestionSearchByType,
  useQuestionSearchParams,
} from '@/features/question/hooks/useQuestionSearchParams';

type QuestionPageButtonProps = {
  lectureId: string;
  searchParams: {
    keyword: string;
    searchBy: QuestionSearchByType;
    filter: QuestionListFilterType;
    page: number;
  };
};

export default function QuestionPageButton({ lectureId, searchParams }: QuestionPageButtonProps) {
  const { data: questionList } = useGetQuestionList({
    lectureId,
    keyword: searchParams.keyword,
    searchBy: searchParams.searchBy,
    filter: searchParams.filter,
    page: searchParams.page,
  });

  const { currentPage, setCurrentPage } = useQuestionSearchParams();

  const totalPage = questionList?.totalPages ?? 1;
  // const totalPage = 11;

  const maxVisiblePages = 10;
  const currentGroup = Math.ceil(currentPage / maxVisiblePages);
  const totalGroups = Math.ceil(totalPage / maxVisiblePages);

  const startPage = (currentGroup - 1) * maxVisiblePages + 1;
  const endPage = Math.min(currentGroup * maxVisiblePages, totalPage);

  const showPrevButton = totalPage > maxVisiblePages && currentGroup > 1;
  const showNextButton = totalPage > maxVisiblePages && currentGroup < totalGroups;

  const handlePrevGroup = () => {
    const prevGroupLastPage = (currentGroup - 2) * maxVisiblePages + maxVisiblePages;
    setCurrentPage(prevGroupLastPage);
  };

  const handleNextGroup = () => {
    const nextGroupFirstPage = currentGroup * maxVisiblePages + 1;
    setCurrentPage(nextGroupFirstPage);
  };

  return (
    <div className='flex justify-center items-center gap-[14px] w-full mt-[60px]'>
      {/* 이전 그룹 버튼 */}
      {showPrevButton && (
        <button
          onClick={handlePrevGroup}
          className='w-[24px] h-[24px] bg-no-repeat bg-center bg-contain'
          style={{
            backgroundImage: `url(/assets/icons/arrows/right_arrow_gray_75.png)`,
            backgroundSize: '100% 100%',
            transform: 'rotate(180deg)',
          }}
        />
      )}

      {/* 페이지 번호 버튼들 */}
      {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
        const pageNumber = startPage + idx;
        const isCurrentPage = currentPage === pageNumber;

        return (
          <button
            key={`question-page-${pageNumber}`}
            onClick={() => setCurrentPage(pageNumber)}
            className={`flex justify-center items-center w-[30px] h-[30px] p-[10px] rounded-[5px] text-headline2 font-semibold text-[#000] ${isCurrentPage ? 'bg-gray-30' : ''}`}
            disabled={isCurrentPage}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* 다음 그룹 버튼 */}
      {showNextButton && (
        <button
          onClick={handleNextGroup}
          className='w-[24px] h-[24px] bg-no-repeat bg-center bg-contain'
          style={{
            backgroundImage: `url(/assets/icons/arrows/right_arrow_gray_75.png)`,
            backgroundSize: '100% 100%',
          }}
        />
      )}
    </div>
  );
}
