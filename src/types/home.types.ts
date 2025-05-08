export type HomeSlideProps = {
  cate: string;
  title: string;
  student: string;
  date: string;
};

export type ScrollButtonProps = {
  direction: 'left' | 'right';
  onClick: () => void;
  visible: boolean;
};
