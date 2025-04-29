'use client';

import { usePathname } from 'next/navigation';
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
  /** 경로별 아이콘 색상 변경 */
  const pathname = usePathname();
  const pathSegments = pathname ? pathname.split('/').filter(Boolean) : [];
  const [mainCategory, subCategory] = pathSegments.slice(0, 2);

  const renderDate = () => {
    if (date) {
      return (
        <div className='flex gap-[10px]'>
          {date.days.map((day, index) => (
            <div
              key={index}
              className='h-[23px] w-[23px] rounded-[5px] bg-purple-10 text-center' // 배경색??
            >
              {day}
            </div>
          ))}
          {date.times[0]}
        </div>
      );
    }
  };

  const inlineComponent = () => {
    if (type === 'main') {
      const categoryList: { [key: string]: string } = {
        퀴즈: 'quiz',
        쪽지: 'note',
        숙제: 'homework',
        질문: 'question',
        공지: 'notice',
      };

      return (
        <div className='flex flex-col gap-[11px]'>
          <div className='w-[252px] rounded-[20px] h-[249px] bg-[rgb(247_245_255)] bg-opacity-100 border border-purple-20 pt-[20px]'>
            <div className='flex flex-col gap-[20px]'>
              <div className='pr-[30px] pl-[30px] flex flex-col gap-[15px]'>
                <div className='text-heading2 font-bold flex items-center gap-[11px]'>
                  {title?.[0]}
                  <SideNavIcon name={'드롭다운'} />
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
                <button className='flex-1'>강의 설정</button>
                <div className='w-[0.5px] h-[30px] bg-gray-40'></div>
                <button className='flex-1'>수강생 목록</button>
              </div>
            </div>
          </div>
          <div className='w-[252px] rounded-[20px] h-[512px] bg-white p-[10px] flex justify-between'>
            <div className='flex flex-col justify-between text-headline2 text-gray-60 font-semibold'>
              <div className='flex flex-col gap-[20px]'>
                <div className='pt-3 pr-4 pb-3 pl-4 flex gap-[12px]'>
                  <SideNavIcon
                    name={'강의홈'}
                    isFocus={mainCategory === 'home'}
                  />
                  강의 홈
                </div>
                <div className='flex flex-col gap-[5px]'>
                  {Object.entries(categoryList).map(([iconName, pathName]) => (
                    <div
                      key={iconName}
                      className='pt-3 pr-4 pb-3 pl-4 flex gap-[12px]'
                    >
                      <SideNavIcon
                        name={iconName}
                        isFocus={mainCategory === pathName}
                      />
                      {iconName}
                    </div>
                  ))}
                </div>
              </div>
              <div className='pt-3 pr-4 pb-3 pl-4 flex gap-[12px]'>
                <SideNavIcon name={'설정'} />
                설정
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      const mypageList: { [key: string]: { [key: string]: string } } = {
        // 카테고리 : 경로명
        setting: {
          개인정보: 'personal',
          강의: 'lector',
        },
        guide: {
          공지사항: 'notice',
          매뉴얼: 'manual',
          FAQ: 'faq',
        },
      };

      const selectedStyle = (category: string) => {
        const mypageCategoryList = mypageList[category];

        return (
          <>
            {Object.keys(mypageCategoryList).map((content) => {
              const value = mypageCategoryList[content];
              const isSelected = subCategory === value;
              const appliedStyle = isSelected ? 'text-purple-10 font-semibold bg-gray-75' : 'text-gray-30 font-normal';

              return (
                <div
                  key={content}
                  className={`w-[180px] h-[46px] rounded-[10px] gap-[12px] pt-[12px] pr-[15px] pb-[12px] pl-[15px] ${appliedStyle}`}
                >
                  {content} 설정
                </div>
              );
            })}
          </>
        );
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
              <div className='flex flex-col items-end gap-[6px]'>{selectedStyle('setting')}</div>
            </div>
            <div className='flex flex-col justify-between h-[184px] text-headline2'>
              <div className='flex gap-[10px] font-semibold text-white'>
                <SideNavIcon name={'마이페이지이용안내'} />
                이용안내
              </div>
              <div className='flex flex-col items-end gap-[6px]'>{selectedStyle('guide')}</div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{inlineComponent()}</div>;
}
