'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

export type QuestionListFilterType = 'all' | 'unanswered' | 'answered';

type QuestionFilterContextType = {
  filter: QuestionListFilterType;
  setFilter: (filter: QuestionListFilterType) => void;
};

const QuestionFilterContext = createContext<QuestionFilterContextType | null>(null);

export default function QuestionFilterContextProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filterState, setFilterState] = useState<QuestionListFilterType>('all');

  useEffect(() => {
    const param = searchParams.get('filter');
    if (param === 'unanswered' || param === 'answered') {
      setFilterState(param);
    } else {
      setFilterState('all');
    }
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

  return (
    <QuestionFilterContext.Provider value={{ filter: filterState, setFilter }}>
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
