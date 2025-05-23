'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

export type QuestionListFilterType = 'all' | 'unanswered' | 'answered';
export type QuestionSearchByType = 'title' | 'content' | 'author' | 'all';

type QuestionFilterContextType = {
  filter: QuestionListFilterType;
  setFilter: (filter: QuestionListFilterType) => void;
  setSearchCondition: ({ searchBy, keyword }: { searchBy: QuestionSearchByType; keyword: string }) => void;
};

const QuestionFilterContext = createContext<QuestionFilterContextType | null>(null);

export default function QuestionFilterContextProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filterState, setFilterState] = useState<QuestionListFilterType>('all');
  const [searchByState, setSearchByState] = useState<QuestionSearchByType>('title');
  const [keywordState, setKeywordState] = useState<string>('');

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

  return (
    <QuestionFilterContext.Provider
      value={{
        filter: filterState,
        setFilter,
        setSearchCondition,
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
