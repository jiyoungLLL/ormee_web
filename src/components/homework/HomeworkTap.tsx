'use client';

import { useLectureId } from '@/hooks/queries/useLectureId';
import { MOCK_HOMEWORK } from '@/mock/homework';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Button from '../ui/Button';
import Dropdown from '../ui/dropdown/Dropdown';
import HomeworkDetail from './HomeworkDetail';

type HomeworkProps = {
  type: '전체' | '진행중' | '마감';
};

const HOMEWORK = MOCK_HOMEWORK.data;

export default function HomeworkTap({ type }: HomeworkProps) {
  const lectureNum = useLectureId();
  const [isOpen, setIsOpen] = useState<{ [key in '진행중' | '마감']?: number[] }>({});
  const [selected, setSelected] = useState<Record<number, '전체' | '미제출' | '미확인'>>({});
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  const menuList = (id: number) => [
    { id: 'hw-all', label: '전체', onClick: () => setSelected((prev) => ({ ...prev, [id]: '전체' })) },
    { id: 'hw-submit', label: '미제출', onClick: () => setSelected((prev) => ({ ...prev, [id]: '미제출' })) },
    { id: 'hw-check', label: '미확인', onClick: () => setSelected((prev) => ({ ...prev, [id]: '미확인' })) },
  ];

  const handleCheckedStudents = (ids: string[]) => {
    setSelectedStudentIds(ids);
  };

  const handleHomeworkAlarm = () => {
    alert(selectedStudentIds);
  };

  const toggleOpen = (name: '진행중' | '마감', id: number) => {
    setIsOpen((prev) => {
      const currentList = prev[name] || [];
      const isAlreadyOpen = currentList.includes(id);
      return {
        ...prev,
        [name]: isAlreadyOpen ? currentList.filter((openId) => openId !== id) : [...currentList, id],
      };
    });
  };

  const renderTap = (name: '진행중' | '마감') => {
    const badgeStyle = name === '진행중' ? 'bg-purple-15 text-purple-50' : 'bg-gray-10 text-gray-60';
    const openIds = isOpen[name] || [];
    const validData = name === '진행중' ? HOMEWORK.openedAssignments : HOMEWORK.closedAssignments;

    return (
      <div
        key={name}
        className='flex flex-col gap-[20px]'
      >
        <div className='text-heading2 font-semibold'>{name === '마감' ? name : '진행'} 숙제</div>
        <div>
          {validData.map((data, index) => (
            <div key={`${data.id}-${data.title}`}>
              <div className='flex justify-between items-center px-[10px] py-[20px]'>
                <div className='w-[509px] flex gap-[20px]'>
                  {name === '진행중' && (
                    <div className='w-[49px] h-[49px] bg-purple-10 rounded-[10px] flex justify-center items-center'>
                      <Image
                        src='/assets/icons/category-icon/homework.png'
                        width={24}
                        height={24}
                        alt='숙제 아이콘'
                      />
                    </div>
                  )}
                  <Link
                    href={`/lectures/${lectureNum}/homework/detail?filter=${name === '진행중' ? 'ongoing' : 'done'}&id=${data.id}`}
                    className='flex flex-col gap-[5px]'
                  >
                    <div className={`text-headline1 font-semibold ${name === '마감' && 'text-gray-60'}`}>
                      {data.title}
                    </div>
                    <div className='text-label text-gray-50'>
                      {data.openTime && data.dueTime
                        ? `${format(data.openTime, 'yyyy.MM.dd')} - ${format(data.dueTime, 'yyyy.MM.dd')}`
                        : ''}
                    </div>
                  </Link>
                </div>
                <div className='flex gap-[30px]'>
                  <div className={`rounded-[24px] px-[15px] py-[6px] text-headline2 font-semibold ${badgeStyle}`}>
                    {name}
                  </div>
                  <Image
                    src='/assets/icons/sidenav/dropdown.png'
                    width={24}
                    height={24}
                    alt='드롭다운 아이콘'
                    className={`w-[24px] h-[24px] cursor-pointer transition-transform ${openIds.includes(data.id) ? 'rotate-180' : ''}`}
                    onClick={() => toggleOpen(name, data.id)}
                  />
                </div>
              </div>
              {openIds.includes(data.id) && (
                <div className='px-[30px] py-[20px] mb-[20px] bg-gray-10 rounded-[15px] flex flex-col items-end'>
                  <div className='w-[227px] flex justify-between'>
                    <Dropdown
                      showTrigger={true}
                      menuList={menuList(data.id)}
                      selectedItem={selected[data.id] || '전체'}
                      triggerAreaOnOpenStyle='bg-gray-10'
                      triggerAreaOnCloseStyle='bg-gray-10'
                    />
                    <Button
                      type='BUTTON_BASE_TYPE'
                      size='h-[40px]'
                      font='text-headline2 font-semibold leading-[4px]'
                      title='과제 알림'
                      isPurple={true}
                      onClick={handleHomeworkAlarm}
                    />
                  </div>
                  <div className='w-full px-[10px] flex flex-col gap-[16px]'>
                    <HomeworkDetail onCheckedStudentsChange={handleCheckedStudents} />
                  </div>
                </div>
              )}
              {index !== validData.length - 1 ? <div className='bg-gray-30 h-[1px] w-full'></div> : ''}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-[40px]'>
      {type === '전체' ? (
        <>
          {renderTap('진행중')}
          {renderTap('마감')}
        </>
      ) : (
        renderTap(type)
      )}
    </div>
  );
}
