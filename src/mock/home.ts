import { HomeSlideProps } from '@/types/home.types';

const rawData: Record<number, HomeSlideProps> = {
  0: { cate: '퀴즈', title: '2주차 단어', student: '24/50', date: '2025.02.23 - 2025.04.02' },
  1: { cate: '숙제', title: '2주차 단어', student: '24/50', date: '2025.02.23 - 2025.04.02' },
  2: { cate: '퀴즈', title: '2주차 단어', student: '24/50', date: '2025.02.23 - 2025.04.02' },
  3: { cate: '숙제', title: '2주차 단어', student: '24/50', date: '2025.02.23 - 2025.04.02' },
  4: { cate: '퀴즈', title: '2주차 단어', student: '24/50', date: '2025.02.23 - 2025.04.02' },
};

export const MOCK_HOME_SLIDE: HomeSlideProps[] = Object.values(rawData);
