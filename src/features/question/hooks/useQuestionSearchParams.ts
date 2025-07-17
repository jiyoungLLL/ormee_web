'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export type QuestionListFilterType = '전체' | '답변 미등록' | '답변 등록';
export type QuestionSearchByType = 'title' | 'content' | 'author' | 'all';
export type QuestionPageButtonType = 'prev' | 'next';

type useQuestionSearchParamsReturnType = {
  initialFilter: QuestionListFilterType;
  initialPage: number;
  initialSearchBy: QuestionSearchByType;
  initialKeyword: string;
  filter: QuestionListFilterType;
  setFilter: (newFilter: QuestionListFilterType) => void;
  currentPage: number;
  setCurrentPage: (newPage: number) => void;
  setSearchCondition: ({ searchBy, keyword }: { searchBy: QuestionSearchByType; keyword: string }) => void;
};

export const useQuestionSearchParams = (): useQuestionSearchParamsReturnType => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialFilter = searchParams.get('filter') ?? '전체';
  const initialPage = searchParams.get('page') ?? 1;
  const initialSearchBy = searchParams.get('searchBy') ?? 'title';
  const initialKeyword = searchParams.get('keyword') ?? '';

  const [filterState, setFilterState] = useState<QuestionListFilterType>(initialFilter as QuestionListFilterType);
  const [currentPageState, setCurrentPageState] = useState<number>(initialPage as number);

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter === '답변 미등록' || filter === '답변 등록') {
      setFilterState(filter);
    } else {
      setFilterState('전체');
    }

    const page = searchParams.get('page');
    setCurrentPageState(page ? parseInt(page) : 1);
  }, [searchParams]);

  const setFilter = (newFilter: QuestionListFilterType) => {
    setFilterState(newFilter);

    const params = new URLSearchParams(searchParams.toString());

    if (newFilter === '전체') {
      params.delete('filter');
    } else {
      params.set('filter', newFilter);
    }

    router.push(`?${params.toString()}`);
  };

  const setCurrentPage = (newPage: number) => {
    setCurrentPageState(newPage);

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());

    router.push(`?${params.toString()}`);
  };

  const setSearchCondition = ({ searchBy, keyword }: { searchBy: QuestionSearchByType; keyword: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('searchBy', searchBy);
    params.set('keyword', keyword);

    router.push(`?${params.toString()}`);
  };

  return {
    initialFilter: initialFilter as QuestionListFilterType,
    initialPage: initialPage as number,
    initialSearchBy: initialSearchBy as QuestionSearchByType,
    initialKeyword,
    filter: filterState,
    setFilter,
    currentPage: currentPageState,
    setCurrentPage,
    setSearchCondition,
  };
};
