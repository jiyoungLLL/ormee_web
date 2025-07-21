'use client';

import { ClassItems } from '@/features/class/class.types';
import { useGetClass } from '@/features/class/hooks/queries/useClassApi';
import { useLectureId } from '@/hooks/queries/useLectureId';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import SideNavIcon from './SideNavIcon';

export default function MainSideNav() {
  const lectureId = useLectureId();

  const pathname = usePathname();
  const pathSegments = pathname ? pathname.split('/').filter(Boolean) : [];
  const [lectureNum, mainCategory] = pathSegments.slice(1, 3);

  const [isOpen, setIsOpen] = useState(false);
  const { data: lectureRawData } = useGetClass();
  const [lectureData, setLectureData] = useState<ClassItems | undefined>(undefined);

  useEffect(() => {
    const lectureData = lectureRawData?.openLectures.find((lecture) => lecture.id == lectureId);
    setLectureData(lectureData);
  }, [lectureRawData, lectureNum, lectureId]);

  /** 고정된 categoryList들 (항상 정의됨) */
  const categoryListGroup1 = { 강의홈: 'home' };
  const categoryListGroup2 = {
    퀴즈: 'quiz',
    쪽지: 'note',
    숙제: 'homework',
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

  const handleDayFormat = (day: string) => {
    switch (day) {
      case 'MON':
        return '월';
      case 'TUE':
        return '화';
      case 'WED':
        return '수';
      case 'THU':
        return '목';
      case 'FRI':
        return '금';
      case 'SAT':
        return '토';
      case 'SUN':
        return '일';
    }
  };

  const handleTimeFormat = (time: string | undefined) => {
    if (!time) return;

    const [hour, minute] = time.split(':');
    return `${hour}:${minute}`;
  };

  return (
    <div className='flex flex-col gap-[11px]'>
      <div className='w-[252px] rounded-[20px] bg-[rgb(247_245_255)] border border-purple-20 pt-[20px]'>
        <div className='flex flex-col gap-[20px]'>
          <div className='pr-[30px] pl-[30px] flex flex-col gap-[15px]'>
            <div
              className='relative text-heading2 font-bold flex items-center gap-[11px]'
              onClick={() => setIsOpen(!isOpen)}
            >
              {lectureData?.title}
              <SideNavIcon name={'드롭다운'} />
              {isOpen && (
                <div className='absolute z-10 w-[250px] h-auto top-[38px] left-[30px] py-[6px] px-[4px] gap-[5px] rounded-[5px] bg-white shadow-[0px_0px_7px_0px_rgba(70, 72, 84, 0.1)]'>
                  {lectureRawData?.openLectures.map((lectures) => (
                    <Link
                      href={`/lectures/${lectures.id}/home`}
                      key={`${lectures.id}-${lectures.title}`}
                      className='text-headline2 w-[242px] h-[40px] py-[5px] px-[10px] font-gray-90 font-normal flex items-center'
                    >
                      {lectures.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className='flex flex-col gap-[15px]'>
              <div className='flex flex-col gap-[5px]'>
                <div className='text-label2-normal text-gray-60'>수강생</div>
                <div className='flex items-center gap-[10px] text-gray-90 text-headline2 font-normal'>
                  <SideNavIcon name={'수강생'} />
                  {lectureData?.students} 명
                </div>
              </div>
              <div>
                <div className='flex flex-col gap-[5px]'>
                  <div className='text-label2-normal text-gray-60'>수업 일시</div>
                  <div className='flex flex-wrap gap-[10px]'>
                    {lectureData?.lectureDays.map((day, index) => (
                      <div
                        key={`${day}-${index}`}
                        className='h-[23px] w-[23px] rounded-[5px] bg-purple-10 text-center'
                      >
                        {handleDayFormat(day)}
                      </div>
                    ))}
                    {`${handleTimeFormat(lectureData?.startTime)} - ${handleTimeFormat(lectureData?.endTime)}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='h-[62px] w-full border-t-0.5 border-purple-20 flex justify-center items-center text-center text-gray-80 text-headline2 font-normal'>
            <Link
              href='/mypage/class'
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
