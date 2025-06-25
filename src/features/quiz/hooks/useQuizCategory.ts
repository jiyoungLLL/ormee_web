'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type QuizCategoryType = '전체' | '임시저장';

type UseQuizCategoryReturn = {
  currentQuizCategory: QuizCategoryType;
  changeQuizCategory: (newCategory: QuizCategoryType) => void;
};

export const useQuizCategory = (): UseQuizCategoryReturn => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentQuizCategory = (searchParams.get('category') ?? '전체') as QuizCategoryType;

  const changeQuizCategory = (newCategory: QuizCategoryType) => {
    if (currentQuizCategory === newCategory) return;

    const params = new URLSearchParams(searchParams.toString());

    if (newCategory === '전체') {
      params.delete('category');
    } else {
      params.set('category', newCategory);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    currentQuizCategory,
    changeQuizCategory,
  };
};
