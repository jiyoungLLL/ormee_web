'use client';

import { Quiz } from '@/features/quiz/types/quiz.types';
import Image from 'next/image';
import { useState } from 'react';
import CloseQuizStats from '@/components/quiz/list/CloseQuizStats';
import { getPlainText } from '@/utils/getPlainText';
import { useRouter } from 'next/navigation';
import { useLectureId } from '@/hooks/queries/useLectureId';
import TeacherLabel from '@/components/ui/label/TeacherLabel';
import { useGetAuthorRole } from '@/hooks/useGetAuthorRole';

type CloseQuizItemProps = {
  quiz: Quiz;
  isLastQuiz: boolean;
};

export default function CloseQuizItem({ quiz, isLastQuiz }: CloseQuizItemProps) {
  const { id, title, dueTime, limitTime, submitCount, totalCount, state, author } = quiz;
  const plainTitle = getPlainText(title);
  const authorRole = useGetAuthorRole(author);

  const [isOpen, setIsOpen] = useState(false);

  const handleStatsToggle = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();
  const lectureId = useLectureId();

  const handleRouteToDetailPage = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;

    router.push(`/lectures/${lectureId}/quiz/${id}?state=${state}`);
  };

  const showSeparator = !isOpen && !isLastQuiz;

  return (
    <div className='flex flex-col w-full gap-[5px]'>
      <div
        className='flex justify-between items-center px-[10px] py-[20px] rounded-[15px] cursor-pointer'
        onClick={handleRouteToDetailPage}
      >
        <div className='flex flex-col gap-[5px]'>
          <span className='text-headline1 font-semibold text-gray-60'>{plainTitle}</span>
          <div className='flex items-center gap-[10px]'>
            <TeacherLabel
              name={author}
              role={authorRole}
            />
            <span className='text-label font-semibold text-gray-50'>{dueTime}</span>
          </div>
        </div>
        <div className='flex items-center gap-[29px]'>
          <div className='flex items-center gap-[5px]'>
            <Image
              src='/assets/icons/timer.png'
              alt='응시 시간'
              width={14}
              height={14}
              draggable={false}
            />
            <span className='text-headline1 font-semibold text-gray-50'>{limitTime}</span>
          </div>
          <div className='flex items-center gap-[5px]'>
            <Image
              src='/assets/icons/people.png'
              alt='제출 인원'
              width={16}
              height={16}
              draggable={false}
            />
            <p className='flex items-center gap-[2px]'>
              <span className='text-headline1 font-semibold text-gray-60'>{submitCount}</span>
              <span className='text-headline1 font-normal text-gray-50'>/</span>
              <span className='text-headline1 font-normal text-gray-50'>{totalCount}</span>
            </p>
          </div>
          <button
            onClick={handleStatsToggle}
            className={`w-[18px] h-[18px] bg-contain bg-no-repeat bg-center ${
              isOpen
                ? 'bg-[url("/assets/icons/sidenav/dropdown_up.png")]'
                : 'bg-[url("/assets/icons/sidenav/dropdown.png")]'
            }`}
            aria-label='마감퀴즈 통계'
          />
        </div>
      </div>
      {showSeparator && <div className='w-full h-[1px] bg-gray-30' />}
      {isOpen && <CloseQuizStats quizId={id} />}
    </div>
  );
}
