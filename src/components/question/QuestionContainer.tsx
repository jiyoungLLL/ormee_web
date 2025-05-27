'use client';

import QuestionSearch from '@/components/question/QuestionSearch';
import { useGetQuestionList } from '@/hooks/queries/question/useGetQuestionList';
import { QuestionListFilterType, QuestionSearchByType } from '@/hooks/question/useQuestionSearchParams';
import QuestionList from './QuestionList';

type QuestionContainerProps = {
  lectureId: string;
  searchParams: {
    keyword: string;
    searchBy: QuestionSearchByType;
    filter: QuestionListFilterType;
    page: number;
  };
};

export default function QuestionContainer({ lectureId, searchParams }: QuestionContainerProps) {
  const { data, error } = useGetQuestionList({
    lectureId,
    keyword: searchParams.keyword,
    searchBy: searchParams.searchBy,
    filter: searchParams.filter,
    page: searchParams.page,
  });

  const questionList = data?.questions ?? [];

  return (
    <div className='flex flex-col gap-[20px] w-[1018px] h-[660px] px-[30px] py-[20px] rounded-[10px] bg-white'>
      <QuestionSearch />
      <QuestionList
        questionList={questionList}
        error={error}
      />
    </div>
  );
}
