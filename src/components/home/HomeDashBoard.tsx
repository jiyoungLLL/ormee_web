'use client';

import { useLectureId } from '@/hooks/queries/useLectureId';
import Image from 'next/image';
import Link from 'next/link';
import HomeWorkIng from './HomeWorkIng';
import RenderContents from './RenderContents';

const minidashList: string[][] = [
  ['퀴즈 생성', '/assets/icons/sidenav/quiz_selected.png', 'quiz'],
  ['쪽지 생성', '/assets/icons/sidenav/note_selected.png', 'note'],
  ['숙제 생성', '/assets/icons/sidenav/homework_selected.png', 'homework'],
  ['공지 작성', '/assets/icons/sidenav/notice_selected.png', 'notice'],
];

const renderMiniDash = (lectureNum: string) => {
  return minidashList.map(([dash, src, path], index) => (
    <Link
      href={`/lectures/${lectureNum}/${path}/create`}
      key={`${dash}-${index}`}
      className='w-[250px] h-[72.5px] bg-purple-15 rounded-[20px] flex justify-between items-center px-[22px] py-[15px] text-headline1 font-semibold'
    >
      {dash}
      <Image
        src={src}
        width={24}
        height={24}
        className='w-[24px] h-[24px]'
        alt={`${dash} 아이콘`}
      />
    </Link>
  ));
};

export default function HomeDashBoard() {
  const lectureNum = useLectureId();

  const handleCopy = () => {
    // 강의코드 데이터 변경 필요
    const text = '강의코드';

    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('복사 성공!');
      });
    }
  };

  return (
    <>
      <div className='w-[115px] h-[34px] px-[5px] flex items-center gap-[10px] text-title3 font-bold'>
        <Image
          src={'/assets/icons/home-ui.png'}
          width={28}
          height={28}
          className='w-[28px] h-[28px]'
          alt='홈 아이콘'
        />
        강의 홈
      </div>
      <div className='absolute top-[137px] w-[1018px] flex justify-between'>
        <div className='w-[500px] h-[153px] rounded-[20px] px-[30px] py-[20px] flex flex-col gap-[18px] bg-purple-50'>
          <div className='h-[56px] flex gap-[18px] justify-between '>
            <div className='px-[5px] flex flex-col gap-[5px]'>
              <div className='text-title3 font-bold text-white'>오르미 토익</div>
              <div className='text-label2-normal text-[rgb(236_233_255)]'>2025. 01. 03 - 2025. 03. 02</div>
            </div>
            <button
              onClick={handleCopy}
              className='h-[24px]'
              type='button'
            >
              <Image
                src={'/assets/icons/copy.png'}
                width={24}
                height={24}
                className='w-[24px] h-[24px]'
                alt='복사하기'
              />
            </button>
          </div>
          <div className='w-[440px] h-[44px] rounded-[10px] px-[16px] py-[10px] flex gap-[10px] bg-[rgb(99_72_217)] text-headline2 font-semibold text-white'>
            <Image
              src={'/assets/icons/comment.png'}
              width={24}
              height={24}
              alt='코멘트'
            />{' '}
            늦었다고 생각할 때는 이미 늦었다
          </div>
        </div>
        <div className='flex flex-wrap w-[509px] gap-[9px]'>{renderMiniDash(lectureNum)}</div>
      </div>

      <div className='absolute top-[330px] w-[1018px] flex flex-col gap-[30px]'>
        <HomeWorkIng />
        <RenderContents category={'질문'} />
        <RenderContents category={'공지'} />
      </div>
    </>
  );
}
