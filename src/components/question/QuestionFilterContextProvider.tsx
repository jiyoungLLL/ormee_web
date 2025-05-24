'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

export type QuestionListFilterType = 'all' | 'unanswered' | 'answered';
export type QuestionSearchByType = 'title' | 'content' | 'author' | 'all';
export type QuestionPageButtonType = 'prev' | 'next';

type QuestionFilterContextType = {
  filter: QuestionListFilterType;
  setFilter: (filter: QuestionListFilterType) => void;
  setSearchCondition: ({ searchBy, keyword }: { searchBy: QuestionSearchByType; keyword: string }) => void;
  currentPage: number;
  setCurrentPage: (type: QuestionPageButtonType) => void;
};

const QuestionFilterContext = createContext<QuestionFilterContextType | null>(null);

export default function QuestionFilterContextProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPage = Number(searchParams.get('page')) || 1;

  const [filterState, setFilterState] = useState<QuestionListFilterType>('all');
  const [searchByState, setSearchByState] = useState<QuestionSearchByType>('title');
  const [keywordState, setKeywordState] = useState<string>('');
  const [currentPageState, setCurrentPageState] = useState<number>(initialPage);

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter === 'unanswered' || filter === 'answered') {
      setFilterState(filter);
    } else {
      setFilterState('all');
    }

    const searchBy = searchParams.get('searchBy');
    const keyword = searchParams.get('keyword');

    setSearchByState(searchBy === 'all' || searchBy === 'content' || searchBy === 'author' ? searchBy : 'title');
    setKeywordState(keyword ?? '');

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

  const setSearchCondition = ({ searchBy, keyword }: { searchBy: QuestionSearchByType; keyword: string }) => {
    setSearchByState(searchBy);
    setKeywordState(keyword);

    const params = new URLSearchParams(searchParams.toString());
    params.set('searchBy', searchBy);
    params.set('keyword', keyword);
    router.push(`?${params.toString()}`);
  };

  const setCurrentPage = (type: QuestionPageButtonType) => {
    let newPage = currentPageState;

    if (type === 'prev') {
      newPage = Math.max(1, newPage - 1);
    } else {
      newPage = newPage + 1;
    }

    setCurrentPageState(newPage);

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <QuestionFilterContext.Provider
      value={{
        filter: filterState,
        setFilter,
        setSearchCondition,
        currentPage: currentPageState,
        setCurrentPage,
      }}
    >
      {children}
    </QuestionFilterContext.Provider>
  );
}

export const useQuestionFilter = () => {
  const context = useContext(QuestionFilterContext);

  if (!context) {
    throw new Error('useQuestionFilter는 QuestionFilterContextProvider 내부에서 사용되어야 합니다');
  }

  return context;
};
