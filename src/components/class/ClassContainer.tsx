'use client';

import ClassModal from '@/components/class/ClassModal';
import Button from '@/components/ui/Button';
import { useDeleteClass, useGetClass } from '@/features/class/hooks/queries/useClassApi';
import { useToastStore } from '@/stores/toastStore';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ClassContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // 데이터 받아오기
  const { data, refetch } = useGetClass();

  const { mutateAsync: deleteClass } = useDeleteClass();

  const { addToast } = useToastStore();
  const [tab, setTab] = useState<'openLectures' | 'closedLectures'>('openLectures');
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [modalType, setModalType] = useState<'new' | 'ongoing' | null>(null);
  const isOpen = modalType !== null;
  const basicStyle = 'w-full rounded-tr-[25px] rounded-b-[25px] bg-white';

  const openModal = (type: 'new' | 'ongoing') => setModalType(type);
  const closeModal = () => setModalType(null);

  // QR로 변경됨
  const handleCopy = (code: number) => {
    navigator.clipboard
      .writeText(code.toString())
      .then(() => addToast({ message: `강의코드를 복사했어요. (코드: ${code}) `, type: 'success', duration: 2500 }));
  };

  const toggleMenu = (index: number) => {
    setOpenMenu((prev) => (prev === index ? null : index));
  };

  const handleNewClass = () => {
    openModal('new');
    setTab('openLectures');
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('filter', tab);

    if (openMenu !== null) {
      params.set('id', openMenu.toString());
    } else if (!isOpen) {
      params.delete('id');
    }

    router.push(`?${params.toString()}`);
  }, [tab, openMenu]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const openCard = document.getElementById(`menu-${openMenu}`);
      const moreButton = document.getElementById(`more-btn-${openMenu}`);
      const target = e.target as Node;

      if (openMenu !== null && !openCard?.contains(target) && !moreButton?.contains(target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);

  const handleDeleteClass = async (lectureId: string) => {
    setOpenMenu(null);
    try {
      await deleteClass(lectureId);
      await refetch();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.error(error);
    }
  };

  const renderClass = (classState: 'openLectures' | 'closedLectures') => {
    const classList = data?.[classState];

    if (classList && classList.length !== 0) {
      const commonStyle = 'flex gap-[10px] text-headline2 h-[22px] items-center';
      const IconSrc = classState === 'openLectures' ? 'home-ui.png' : 'pre-lecture.png';

      return (
        <div className={`${basicStyle} px-[30px] py-[20px] flex gap-[15px] flex-wrap`}>
          {classList.map((data, index) => (
            <div
              id={`${index}-${data.title}`}
              key={`${data.id}-${data.code}`}
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
                  {data.title}
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
                    {data.students}명
                  </div>
                  <div className={commonStyle}>
                    <Image
                      src={'/assets/icons/homeSlide_calendar.png'}
                      width={18}
                      height={18}
                      className='w-[18px] h-[18px]'
                      alt='달력 아이콘'
                    />
                    {format(data.startDate, 'yyyy.MM.dd')}
                  </div>
                </div>
              </div>
              {classState === 'openLectures' && (
                <div className='flex flex-col justify-between'>
                  <button
                    type='button'
                    id={`more-btn-${data.code}`}
                    onClick={() => toggleMenu(Number(data.id))}
                  >
                    <Image
                      src={'/assets/icons/more.png'}
                      width={30}
                      height={28}
                      alt='더보기'
                    />
                  </button>
                  {/* TODO: 디자인 및 기능 변경 후 반영 필요 */}
                  {/* <button
                    type='button'
                    onClick={() => handleCopy(data?.password)}
                  >
                    <Image
                      src={'/assets/icons/dark-copy.png'}
                      width={24}
                      height={24}
                      alt='복사하기'
                    />
                  </button> */}
                </div>
              )}
              {openMenu?.toString() === data.id && (
                <div
                  id={`menu-${openMenu}`}
                  ref={menuRef}
                  className='absolute top-[55px] right-[-60px] z-10 w-[120px] rounded-[5px] px-[4px] py-[6px] flex flex-col gap-[5px] bg-white text-headline2 items-start shadow-[0px_0px_7px_0px_rgba(70,_72,_84,_0.1)]'
                >
                  <button
                    type='button'
                    className='h-[40px] px-[10px] py-[5px] rounded-[5px]'
                    onClick={() => openModal('ongoing')}
                  >
                    설정
                  </button>
                  <button
                    type='button'
                    className='h-[40px] px-[10px] py-[5px] rounded-[5px]'
                    onClick={() => handleDeleteClass(data.id)}
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
          {tab === 'openLectures' ? '현재 진행 중인 강의가 없어요' : '종료된 강의가 없어요'}
        </div>
      );
    }
  };

  return (
    <div className='w-full'>
      <div className='relative top-[8px] px-[5px] text-title3 font-bold'>강의 설정</div>
      <div className='relative top-[13px] flex flex-col'>
        <div className='h-[75px] flex justify-between items-center'>
          <div className='pt-[20px] flex items-center relative'>
            <div className='relative flex items-end z-10'>
              <button
                className={`text-headline1 ${
                  tab === 'openLectures'
                    ? 'h-[55px] rounded-t-[20px] px-[15px] flex items-center gap-[9px] bg-white font-semibold text-purple-50'
                    : 'w-[145px] h-[43px] rounded-[20px] bg-gray-20 text-gray-60'
                }`}
                onClick={() => setTab('openLectures')}
              >
                진행 중 강의
                <div>{tab === 'openLectures' && data?.openLectures?.length}</div>
              </button>

              {tab === 'openLectures' && (
                <Image
                  src={'/assets/icons/class/right-vector.png'}
                  width={25}
                  height={25}
                  alt='오른쪽 벡터 아이콘'
                  className='absolute left-[100%] bottom-0 z-10'
                />
              )}
            </div>

            <div className='relative flex items-end ml-[10px] z-0'>
              {tab === 'closedLectures' && (
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
                  tab === 'closedLectures'
                    ? 'h-[55px] rounded-t-[20px] px-[15px] flex items-center gap-[9px] bg-white font-semibold text-purple-50'
                    : 'w-[145px] h-[43px] rounded-[20px] bg-gray-20 text-gray-60'
                }`}
                onClick={() => setTab('closedLectures')}
              >
                이전 강의
                <div>{tab === 'closedLectures' && data?.closedLectures?.length}</div>
              </button>
              {tab === 'closedLectures' && (
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
            onClick={handleNewClass}
          />
        </div>

        {isOpen && (
          <ClassModal
            type={modalType}
            isOpen={isOpen}
            closeModal={closeModal}
          />
        )}

        <div>{renderClass(tab)}</div>
      </div>
    </div>
  );
}
