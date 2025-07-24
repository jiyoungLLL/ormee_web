'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SideNavIcon from './SideNavIcon';

export default function MyPageSideNav() {
  const pathname = usePathname();

  // mypage
  const mypageList: {
    [category: string]: {
      [label: string]: string;
    };
  } = {
    setting: { 개인정보: 'personal', 강의: 'class' },
    guide: { 공지사항: 'notice', 매뉴얼: 'manual', FAQ: 'faq' },
  };

  const selectedMyPageStyle = (category: string) => {
    const list = mypageList[category];
    return Object.entries(list).map(([name, path]) => {
      const isSelected = pathname === `/mypage/${path}`;
      const style = isSelected ? 'text-purple-10 font-semibold bg-gray-75' : 'text-gray-30 font-normal';
      return (
        <Link
          key={name}
          href={`/mypage/${path}`}
          className={`w-[180px] h-[46px] rounded-[10px] pt-[12px] px-[15px] ${style}`}
        >
          {name} 설정
        </Link>
      );
    });
  };

  return (
    <div className='fix top-[74px] left-[300px] flex flex-col gap-[30px] w-[252px] h-[521px] rounded-[20px] bg-gray-70 p-[20px] text-white'>
      <div className='text-headline1 font-semibold'>마이페이지</div>
      <div className='flex flex-col gap-[20px]'>
        <div className='flex flex-col justify-between h-[132px] text-headline2'>
          <div className='flex gap-[10px] font-semibold text-white'>
            <SideNavIcon name={'마이페이지설정'} />
            설정
          </div>
          <div className='flex flex-col items-end gap-[6px]'>{selectedMyPageStyle('setting')}</div>
        </div>
        <div className='flex flex-col justify-between h-[184px] text-headline2'>
          <div className='flex gap-[10px] font-semibold text-white'>
            <SideNavIcon name={'마이페이지이용안내'} />
            이용안내
          </div>
          <div className='flex flex-col items-end gap-[6px]'>{selectedMyPageStyle('guide')}</div>
        </div>
      </div>
    </div>
  );
}
