'use client';

import ClassModal from '@/components/class/ClassModal';
import Button from '@/components/ui/Button';
import { MOCK_CLASSES } from '@/mock/class';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Class() {
  const [classes, setClasses] = useState(MOCK_CLASSES);
  const [tab, setTab] = useState<'ing' | 'done'>('ing');
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [modalType, setModalType] = useState<'new' | 'ing' | null>(null);
  const isOpen = modalType !== null;
  const basicStyle = 'w-full rounded-tr-[25px] rounded-b-[25px] bg-white';

  const openModal = (type: 'new' | 'ing') => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleCopy = () => {
    const text = '강의코드';
    navigator.clipboard.writeText(text).then(() => alert('복사 성공!'));
  };

  const toggleMenu = (index: number) => {
    setOpenMenu((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const openCard = document.getElementById(`menu-${openMenu}`);
      const moreButton = document.getElementById(`more-btn-${openMenu}`);

      if (openCard && !openCard.contains(e.target as Node) && moreButton && !moreButton.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);

  const handleDeleteClass = (classState: 'ing' | 'done', id: string) => {
    const updatedClassList = classes[classState].filter(([index, title]) => `${index}-${title}` !== id);

    setClasses({
      ...classes,
      [classState]: updatedClassList,
    });
  };

  const renderClass = (classState: 'ing' | 'done') => {
    if (classes[classState] && classes[classState].length !== 0) {
      const commonStyle = 'flex gap-[10px] text-headline2 h-[22px] items-center';
      const IconSrc = classState === 'ing' ? 'home-ui.png' : 'pre-lecture.png';

      return (
        <div className={`${basicStyle} px-[30px] py-[20px] flex gap-[15px] flex-wrap`}>
          {classes[classState].map(([index, title, students, date]) => (
            <div
              id={`${index}-${title}`}
              key={`${title}-${students}-${date}-${index}`}
              className='relative w-[309px] flex justify-between gap-[41px] px-[30px] py-[20px] rounded-[15px] border border-gray-30'
            >
              <div className='w-[178px] flex flex-col gap-[41px]'>
                <div className='text-headline1 font-semibold flex gap-[12px]'>
                  <Image
                    src={`/assets/icons/${IconSrc}`}
                    width={28}
                    height={28}
                    alt='강의 아이콘'
                  />
                  {title}
                </div>
                <div className='flex flex-col gap-[1px]'>
                  <div className={commonStyle}>
                    <Image
                      src={'/assets/icons/homeSlide_student.png'}
                      width={18}
                      height={18}
                      className='w-[18px] h-[18px]'
                      alt='학생 아이콘'
                    />
                    {students}명
                  </div>
                  <div className={commonStyle}>
                    <Image
                      src={'/assets/icons/homeSlide_calendar.png'}
                      width={18}
                      height={18}
                      className='w-[18px] h-[18px]'
                      alt='달력 아이콘'
                    />
                    {date}
                  </div>
                </div>
              </div>
              {classState === 'ing' && (
                <div className='flex flex-col justify-between'>
                  <button
                    type='button'
                    id={`more-btn-${index}`}
                    onClick={() => toggleMenu(index)}
                  >
                    <Image
                      src={'/assets/icons/more.png'}
                      width={30}
                      height={28}
                      alt='더보기'
                    />
                  </button>
                  <button
                    type='button'
                    onClick={handleCopy}
                  >
                    <Image
                      src={'/assets/icons/dark-copy.png'}
                      width={24}
                      height={24}
                      alt='복사하기'
                    />
                  </button>
                </div>
              )}
              {openMenu === index && (
                <div
                  id={`menu-${openMenu}`}
                  ref={menuRef}
                  className='absolute top-[55px] right-[-60px] z-10 w-[120px] rounded-[5px] px-[4px] py-[6px] flex flex-col gap-[5px] bg-white text-headline2 items-start shadow-[0px_0px_7px_0px_rgba(70,_72,_84,_0.1)]'
                >
                  <button
                    type='button'
                    className='h-[40px] px-[10px] py-[5px] rounded-[5px]'
                    onClick={() => openModal('ing')}
                  >
                    설정
                  </button>
                  <button
                    type='button'
                    className='h-[40px] px-[10px] py-[5px] rounded-[5px]'
                    onClick={() => handleDeleteClass(classState, `${index}-${title}`)}
                  >
                    강의 삭제
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div
          className={`${basicStyle} h-[184px] flex justify-center items-center text-heading2 font-semibold text-[rgb(181_182_188)]`}
        >
          {tab === 'ing' ? '현재 진행 중인 강의가 없어요' : '이전에 진행한 강의가 없어요'}
        </div>
      );
    }
  };

  return (
    <div>
      <div className='relative top-[8px] px-[5px] text-title3 font-bold'>강의 설정</div>
      <div className='relative top-[13px] flex flex-col'>
        <div className='h-[75px] flex justify-between items-center'>
          {/* 탭 */}
          <div className='pt-[20px] flex gap-4 items-center'>
            <div className='relative flex items-end'>
              <button
                className={`text-headline1 ${
                  tab === 'ing'
                    ? 'h-[55px] rounded-t-[20px] px-[15px] pr-[30px] flex items-center gap-[9px] bg-white font-semibold text-purple-50'
                    : 'w-[145px] h-[43px] rounded-[20px] bg-gray-20 text-gray-60'
                }`}
                onClick={() => setTab('ing')}
              >
                진행 중 강의
                <div>{tab === 'ing' && classes['ing'].length}</div>
              </button>

              {tab === 'ing' && (
                <Image
                  src={'/assets/icons/class/right-vector.png'}
                  width={25}
                  height={25}
                  alt='오른쪽 벡터 아이콘'
                  className='absolute left-[100%] bottom-0 z-10'
                />
              )}
            </div>

            <div className='relative flex items-end'>
              {tab === 'done' && (
                <Image
                  src={'/assets/icons/class/left-vector.png'}
                  width={25}
                  height={25}
                  alt='왼쪽 벡터 아이콘'
                  className='absolute right-[100%] bottom-0 z-10'
                />
              )}
              <button
                className={`text-headline1 ${
                  tab === 'done'
                    ? 'h-[55px] rounded-t-[20px] px-[15px] flex items-center gap-[9px] bg-white font-semibold text-purple-50'
                    : 'w-[145px] h-[43px] rounded-[20px] bg-gray-20 text-gray-60'
                }`}
                onClick={() => setTab('done')}
              >
                이전 강의
                <div>{tab === 'done' && classes['done'].length}</div>
              </button>
              {tab === 'done' && (
                <Image
                  src={'/assets/icons/class/right-vector.png'}
                  width={25}
                  height={25}
                  alt='오른쪽 벡터 아이콘'
                  className='absolute left-[100%] bottom-0 z-10'
                />
              )}
            </div>
          </div>

          <Button
            type='BUTTON_CREATE_TYPE'
            size='w-[133px] h-[50px]'
            font='text-headline1 font-bold'
            title='강의 개설'
            isPurple={true}
            htmlType='button'
            onClick={() => openModal('new')}
          />
        </div>

        {isOpen && (
          <ClassModal
            type={modalType!}
            isOpen={isOpen}
            closeModal={closeModal}
          />
        )}

        <div>{renderClass(tab)}</div>
      </div>
    </div>
  );
}
