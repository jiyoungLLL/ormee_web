type HomeSlideProps = {
  id: number;
  type: string;
  title: string;
  submitStudents: number;
  totalStudents: number;
  openTime: string;
  dueTime: string;
};

const rawData: Record<number, HomeSlideProps> = [
  {
    id: 52,
    type: '숙제',
    title: '과제6',
    submitStudents: 0,
    totalStudents: 6,
    openTime: '2024-06-03T00:00:00',
    dueTime: '2024-06-15T12:36:00',
  },
  {
    id: 6,
    type: '숙제',
    title: '과제6',
    submitStudents: 0,
    totalStudents: 6,
    openTime: '2024-06-03T00:00:00',
    dueTime: '2024-06-13T12:36:00',
  },
  {
    id: 5,
    type: '숙제',
    title: '과제5',
    submitStudents: 0,
    totalStudents: 6,
    openTime: '2024-06-03T00:00:00',
    dueTime: '2024-06-13T12:36:00',
  },
  {
    id: 4,
    type: '숙제',
    title: '과제4',
    submitStudents: 0,
    totalStudents: 6,
    openTime: '2024-06-03T00:00:00',
    dueTime: '2024-06-13T12:36:00',
  },
  {
    id: 453,
    type: '숙제',
    title: '숙제 제목은 20자까지',
    submitStudents: 0,
    totalStudents: 6,
    openTime: '2025-06-03T00:00:00',
    dueTime: '2026-06-03T00:00:00',
  },
  {
    id: 452,
    type: '숙제',
    title: '숙제 제목은 20자까지',
    submitStudents: 0,
    totalStudents: 6,
    openTime: '2025-06-03T00:00:00',
    dueTime: '2026-06-03T00:00:00',
  },
  {
    id: 402,
    type: '숙제',
    title: '숙제 제목은 20자까지',
    submitStudents: 0,
    totalStudents: 6,
    openTime: '2025-06-03T00:00:00',
    dueTime: '2026-06-03T00:00:00',
  },
  {
    id: 353,
    type: '숙제',
    title: '숙제 제목은 20자까지',
    submitStudents: 0,
    totalStudents: 6,
    openTime: '2025-06-03T00:00:00',
    dueTime: '2026-06-03T00:00:00',
  },
  {
    id: 352,
    type: '숙제',
    title: '숙제 제목은 20자까지',
    submitStudents: 0,
    totalStudents: 6,
    openTime: '2025-06-03T00:00:00',
    dueTime: '2026-06-03T00:00:00',
  },
  {
    id: 303,
    type: '숙제',
    title: '과제2',
    submitStudents: 0,
    totalStudents: 6,
    openTime: '2025-06-03T00:00:00',
    dueTime: '2025-07-12T12:36:00',
  },
  {
    id: 102,
    type: '숙제',
    title: '과제6',
    submitStudents: 4,
    totalStudents: 6,
    openTime: '2025-06-03T00:00:00',
    dueTime: '2025-06-15T12:36:00',
  },
  {
    id: 252,
    type: '숙제',
    title: '과제101',
    submitStudents: 0,
    totalStudents: 6,
    openTime: '2025-06-23T00:00:00',
    dueTime: '2025-06-30T12:36:00',
  },
  {
    id: 202,
    type: '숙제',
    title: '과제101',
    submitStudents: 0,
    totalStudents: 6,
    openTime: '2025-06-23T00:00:00',
    dueTime: '2025-06-30T12:36:00',
  },
  {
    id: 152,
    type: '숙제',
    title: '과제100',
    submitStudents: 0,
    totalStudents: 6,
    openTime: '2025-06-23T00:00:00',
    dueTime: '2025-06-30T12:36:00',
  },
  {
    id: 8,
    type: '퀴즈',
    title: '객체지향 프로그래밍 퀴즈2',
    submitStudents: 0,
    totalStudents: 6,
    openTime: '2025-07-04T14:01:40.049608',
    dueTime: '2025-07-10T23:59:59',
  },
];

export const MOCK_HOME_SLIDE: HomeSlideProps[] = Object.values(rawData);

export const MOCK_HOME_CONTENTS: string[][] = [
  ['이거 어떻게 풀어요?', '2025.01.23'],
  ['설연휴 휴강으로 인한 보강은 언제인가요?', '2025.01.25'],
];
