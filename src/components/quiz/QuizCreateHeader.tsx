'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLectureId } from '@/hooks/queries/useLectureId';
import Button from '../ui/Button';

export default function QuizCreateHeader() {
  const lectureId = useLectureId();

  const handleTemporarySave = () => {
    // TODO: 퀴즈 임시저장 api 연동
    alert('퀴즈가 임시저장 되었습니다.');
  };

  const handleRegister = () => {
    // TODO: 퀴즈 등록 api 연동
    alert('퀴즈가 등록 되었습니다.');
  };

  return (
    <>
      <div className='flex justify-between items-center w-full h-[50px] mb-[22px]'>
        <Link
          href={`/lectures/${lectureId}/quiz`}
          className='w-[136px] px-[5px] text-title3 font-bold flex items-center gap-[15px]'
        >
          <Image
            src='/assets/icons/left_arrow.png'
            width={24}
            height={24}
            alt='이전으로'
          />
          퀴즈 생성
        </Link>
        <div className='flex gap-[10px]'>
          <Button
            type='BUTTON_BASE_TYPE'
            size='w-fit h-[50px]'
            isPurple={false}
            font='text-headline1 font-semibold text-label-normal'
            title='임시저장'
            onClick={handleTemporarySave}
          />
          <Button
            type='BUTTON_BASE_TYPE'
            size='w-fit h-[50px]'
            isPurple
            isfilled
            font='text-headline1 font-semibold text-white'
            title='등록하기'
            onClick={handleRegister}
          />
        </div>
      </div>
    </>
  );
}
