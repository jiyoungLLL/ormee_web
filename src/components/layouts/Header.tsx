import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  /** 로고 외에 추가로 표시할 컴포넌트 (로고 이미지와 justify-between 으로 배치됩니다.) */
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className='flex justify-between items-center w-[1320px] h-[74px] bg-transparent px-[10px] py-[12px]'>
      <Link href='/'>
        <Image
          src='/assets/images/brand/logo.png'
          alt='logo'
          width={107.43}
          height={20}
          className='select-none'
          draggable={false}
        />
      </Link>
      <div>{children}</div>
    </header>
  );
}
