import Image from 'next/image';

type ScrollButtonProps = {
  direction: 'left' | 'right';
  onClick: () => void;
  visible: boolean;
};

export default function ScrollButton({ direction, onClick, visible }: ScrollButtonProps) {
  const isLeft = direction === 'left';
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className={`opacity-0 group-hover:opacity-100 absolute top-1/2 ${
        isLeft ? 'left-[-45px]' : 'right-[-45px]'
      } -translate-y-1/2 bg-white w-[42px] h-[42px] rounded-full shadow-md flex justify-center items-center z-10 transition-opacity duration-200`}
    >
      <Image
        src='/assets/icons/right_arrow.png'
        width={22}
        height={22}
        alt={`${direction} 스크롤 버튼`}
        className={isLeft ? 'rotate-180' : ''}
      />
    </button>
  );
}
