'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export type QuestionListFilterType = 'all' | 'unanswered' | 'answered';
export type QuestionSearchByType = 'title' | 'content' | 'author' | 'all';
export type QuestionPageButtonType = 'prev' | 'next';

type useQuestionSearchParamsReturnType = {
  initialSearchBy: QuestionSearchByType;
  initialKeyword: string;
  filter: QuestionListFilterType;
  setFilter: (newFilter: QuestionListFilterType) => void;
  currentPage: number;
  setCurrentPage: ({ type, maxPage }: { type: QuestionPageButtonType; maxPage: number }) => void;
  setSearchCondition: ({ searchBy, keyword }: { searchBy: QuestionSearchByType; keyword: string }) => void;
};

export const useQuestionSearchParams = (): useQuestionSearchParamsReturnType => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialFilter = searchParams.get('filter') ?? 'all';
  const initialPage = searchParams.get('page') ?? 1;
  const initialSearchBy = searchParams.get('searchBy') ?? 'title';
  const initialKeyword = searchParams.get('keyword') ?? '';

  const [filterState, setFilterState] = useState<QuestionListFilterType>(initialFilter as QuestionListFilterType);
  const [currentPageState, setCurrentPageState] = useState<number>(initialPage as number);

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter === 'unanswered' || filter === 'answered') {
      setFilterState(filter);
    } else {
      setFilterState('all');
    }

    const page = searchParams.get('page');
    setCurrentPageState(page ? parseInt(page) : 1);
  }, [searchParams]);

  const setFilter = (newFilter: QuestionListFilterType) => {
    setFilterState(newFilter);

    const params = new URLSearchParams(searchParams.toString());

    if (newFilter === 'all') {
      params.delete('filter');
    } else {
      params.set('filter', newFilter);
    }

    router.push(`?${params.toString()}`);
  };

  const setCurrentPage = ({ type, maxPage }: { type: QuestionPageButtonType; maxPage: number }) => {
    let newPage = currentPageState;

    if (type === 'prev') {
      newPage = Math.max(1, newPage - 1);
    } else {
      newPage = Math.min(maxPage, newPage + 1);
    }

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
    initialSearchBy: initialSearchBy as QuestionSearchByType,
    initialKeyword,
    filter: filterState,
    setFilter,
    currentPage: currentPageState,
    setCurrentPage,
    setSearchCondition,
  };
};
