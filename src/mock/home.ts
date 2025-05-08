import { HomeSlideProps } from '@/types/home.types';

const rawData: Record<number, HomeSlideProps> = {
  0: { cate: '퀴즈', title: '2주차 단어', student: '24/50', date: '2025.02.23 - 2025.04.02' },
  1: { cate: '숙제', title: '2주차 단어', student: '24/50', date: '2025.02.23 - 2025.04.02' },
  2: { cate: '퀴즈', title: '2주차 단어', student: '24/50', date: '2025.02.23 - 2025.04.02' },
  3: { cate: '숙제', title: '2주차 단어', student: '24/50', date: '2025.02.23 - 2025.04.02' },
  4: { cate: '퀴즈', title: '2주차 단어', student: '24/50', date: '2025.02.23 - 2025.04.02' },
};

export const MOCK_HOME_SLIDE: HomeSlideProps[] = Object.values(rawData);

export const MOCK_HOME_CONTENTS: string[][] = [
  ['이거 어떻게 풀어요?', '2025.01.23'],
  ['설연휴 휴강으로 인한 보강은 언제인가요?', '2025.01.25'],
];
