'use client';

import { useGetQuestionList } from '@/hooks/queries/question/useGetQuestionList';
import {
  QuestionListFilterType,
  QuestionSearchByType,
  useQuestionSearchParams,
} from '@/hooks/question/useQuestionSearchParams';

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
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;

  return (
    <div className='flex items-center text-headline2 font-semibold text-gray-70'>
      <span className='mr-[10px]'>전체 페이지</span>
      <div className='flex items-center gap-[5px]'>
        <button
          type='button'
          className='w-[18px] h-[18px] bg-center bg-no-repeat bg-contain'
          style={{
            backgroundImage: `url(${isFirstPage ? '/assets/icons/arrows/left_arrow_gray_50.png' : '/assets/icons/arrows/left_arrow_purple_40.png'})`,
          }}
          disabled={isFirstPage}
          onClick={() => setCurrentPage({ type: 'prev', maxPage: totalPage })}
        />
        <span>{currentPage}</span>
        <span>/</span>
        <span>{totalPage}</span>
        <button
          type='button'
          className='w-[18px] h-[18px] bg-center bg-no-repeat bg-contain'
          style={{
            backgroundImage: `url(${isLastPage ? '/assets/icons/arrows/right_arrow_gray_50.png' : '/assets/icons/arrows/right_arrow_purple_40.png'})`,
          }}
          disabled={isLastPage}
          onClick={() => setCurrentPage({ type: 'next', maxPage: totalPage })}
        />
      </div>
    </div>
  );
}
