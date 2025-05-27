'use client';

import QuestionPageButton from '@/components/question/QuestionPageButton';
import { useGetQuestionList } from '@/features/question/hooks/queries/useGetQuestionList';
import { QuestionListFilterType, QuestionSearchByType } from '@/features/question/hooks/useQuestionSearchParams';

type QuestionStatsProps = {
  lectureId: string;
  searchParams: {
    keyword: string;
    searchBy: QuestionSearchByType;
    filter: QuestionListFilterType;
    page: number;
  };
};

export default function QuestionStats({ lectureId, searchParams }: QuestionStatsProps) {
  const { data: questionList } = useGetQuestionList({
    lectureId,
    keyword: searchParams.keyword,
    searchBy: searchParams.searchBy,
    filter: searchParams.filter,
    page: searchParams.page,
  });

  const totalQuestionCount = questionList?.totalCount ?? 0;

  return (
    <div className='flex items-center gap-[33px] text-headline2 font-semibold text-gray-70'>
      <div className='flex items-center gap-[5px]'>
        <span>전체 질문 개수: </span>
        <span>{totalQuestionCount}</span>
      </div>
      <QuestionPageButton
        lectureId={lectureId}
        searchParams={{
          keyword: searchParams.keyword,
          searchBy: searchParams.searchBy,
          filter: searchParams.filter,
          page: searchParams.page,
        }}
      />
    </div>
  );
}
