'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import SideNavIcon from './SideNavIcon';

type DateType = {
  /* day: ['월', ,'수'] */
  days: string[];
  /* time: ['시작시간', '종료시간'] */
  times: string[];
};

type SideNavProps = {
  /** 두 가지 nav 구분 */
  type: 'main' | 'mypage';
  /** main- 강좌명 */
  title?: string[];
  /** main - 수강생 인원수 */
  student?: number;
  /** main - 수업 일시 */
  date?: DateType;
};

export default function SideNav({ type, title, student, date }: SideNavProps) {
  const pathname = usePathname();
  const pathSegments = pathname ? pathname.split('/').filter(Boolean) : [];
  const [lectureNum, mainCategory] = pathSegments.slice(1, 3);
  const [isOpen, setIsOpen] = useState(false);

  /** 고정된 categoryList들 (항상 정의됨) */
  const categoryListGroup1 = { 강의홈: 'home' };
  const categoryListGroup2 = {
    퀴즈: 'quiz',
    쪽지: 'note',
    과제: 'homework',
    질문: 'question',
    공지: 'notice',
  };
  const categoryListGroup3 = { 설정: 'setting' };
  const renderCategoryGroup = (group: { [key: string]: string }) =>
    Object.entries(group).map(([iconName, pathName]) => {
      const isFocus = mainCategory === pathName;
      const commonStyle = 'pt-3 pr-4 pb-3 pl-4 flex gap-[12px]';
      const focusStyle = isFocus ? 'bg-purple-10 text-purple-50 rounded-[10px] font-bold' : '';

      return (
        <Link
          href={`/lectures/${lectureNum}/${pathName}`}
          key={iconName}
          className={`${commonStyle} ${focusStyle}`}
        >
          <SideNavIcon
            name={iconName}
            isFocus={isFocus}
          />
          {iconName === '강의홈' ? '강의 홈' : iconName}
        </Link>
      );
    });

  const categoryGroup1Memo = useMemo(() => renderCategoryGroup(categoryListGroup1), [mainCategory]);
  const categoryGroup2Memo = useMemo(() => renderCategoryGroup(categoryListGroup2), [mainCategory]);
  const categoryGroup3Memo = useMemo(() => renderCategoryGroup(categoryListGroup3), [mainCategory]);

  const renderDate = () => {
    if (!date) return null;
    return (
      <div className='flex gap-[10px]'>
        {date.days.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className='h-[23px] w-[23px] rounded-[5px] bg-purple-10 text-center'
          >
            {day}
          </div>
        ))}
        {date.times[0]}
      </div>
    );
  };

  if (type === 'main') {
    return (
      <div className='flex flex-col gap-[11px]'>
        <div className='w-[252px] rounded-[20px] h-[249px] bg-[rgb(247_245_255)] border border-purple-20 pt-[20px]'>
          <div className='flex flex-col gap-[20px]'>
            <div className='pr-[30px] pl-[30px] flex flex-col gap-[15px]'>
              <div
                className='relative text-heading2 font-bold flex items-center gap-[11px]'
                onClick={() => setIsOpen(!isOpen)}
              >
                {title?.[0]}
                <SideNavIcon name={'드롭다운'} />
                {isOpen && (
                  <div className='absolute z-10 w-[250px] h-auto top-[38px] left-[30px] py-[6px] px-[4px] gap-[5px] rounded-[5px] bg-white shadow-[0px_0px_7px_0px_rgba(70, 72, 84, 0.1)]'>
                    {title?.map((title, index) => (
                      <div
                        key={`${title}-${index}`}
                        className='text-headline2 w-[242px] h-[40px] py-[5px] px-[10px] font-gray-90 font-normal flex items-center'
                      >
                        {title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-[15px]'>
                <div className='flex flex-col gap-[5px]'>
                  <div className='text-label2-normal text-gray-60'>수강생</div>
                  <div className='flex items-center gap-[10px] text-gray-90 text-headline2 font-normal'>
                    <SideNavIcon name={'수강생'} />
                    {student} 명
                  </div>
                </div>
                <div>
                  <div className='flex flex-col gap-[5px]'>
                    <div className='text-label2-normal text-gray-60'>수업 일시</div>
                    <div>{renderDate()}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='h-[62px] w-full border-t-0.5 border-purple-20 flex justify-center items-center text-center text-gray-80 text-headline2 font-normal'>
              <Link
                href='/'
                className='flex-1'
              >
                강의 설정
              </Link>
              <div className='w-[0.5px] h-[30px] bg-gray-40'></div>
              <Link
                href={`/lectures/${lectureNum}/students`}
                className='flex-1'
              >
                수강생 목록
              </Link>
            </div>
          </div>
        </div>

        <div className='w-[252px] rounded-[20px] h-[512px] bg-white p-[10px] flex justify-between'>
          <div className='w-full flex flex-col justify-between text-headline2 text-gray-60 font-semibold'>
            <div className='flex flex-col gap-[20px]'>
              <div>{categoryGroup1Memo}</div>
              <div className='flex flex-col gap-[5px]'>{categoryGroup2Memo}</div>
              <div>{categoryGroup3Memo}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      const isSelected = lectureNum === path;
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
    <div className='flex flex-col gap-[30px] w-[252px] h-[521px] rounded-[20px] bg-gray-70 p-[20px] text-white'>
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
