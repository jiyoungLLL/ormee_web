'use client';

import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { useGetQuizList } from '@/hooks/queries/quiz/useGetQuizList';
import { MenuItem, useDropdown } from '@/hooks/ui/useDropdown';
import Link from 'next/link';
import { useMemo } from 'react';
import OpenQuizList from './OpenQuizList';
import { usePathname } from 'next/navigation';
import CloseQuizItem from './CloseQuizItem';

const QUIZ_DROPDOWN_LIST: MenuItem[] = [
  { id: 'quiz-list-total', label: '전체' },
  { id: 'quiz-list-tempotaty', label: '임시저장' },
];

export default function QuizListContainer() {
  const pathname = usePathname();

  const { selectedItem: selectedQuizCategory, menuListForDropdown: quizCategoryList } = useDropdown({
    menuList: QUIZ_DROPDOWN_LIST,
    initialSelectedItem: QUIZ_DROPDOWN_LIST[0].label,
  });

  const mockLectureId = '1';
  const { data: quizList } = useGetQuizList(mockLectureId);

  const { readyQuizzes, ongoingQuizzes, closedQuizzes } = useMemo(() => {
    const ready = quizList?.filter((quiz) => quiz.state === 'ready') ?? [];
    const ongoing = quizList?.filter((quiz) => quiz.state === 'ongoing') ?? [];
    const closed = quizList?.filter((quiz) => quiz.state === 'closed') ?? [];

    return { readyQuizzes: ready, ongoingQuizzes: ongoing, closedQuizzes: closed };
  }, [quizList]);

  return (
    <div className='flex-1 flex flex-col gap-[20px] w-full h-full px-[30px] py-[20px] rounded-[20px] bg-white'>
      <div className='flex justify-between items-center'>
        <Dropdown
          showTrigger
          menuList={quizCategoryList}
          selectedItem={selectedQuizCategory}
        />
        <Link href={`${pathname}/create`}>
          <Button
            type='BUTTON_CREATE_TYPE'
            size='w-fit h-[49px]'
            title='퀴즈 생성'
            font='text-headline1 font-bold'
            htmlType='button'
            isPurple={false}
          />
        </Link>
      </div>
      {selectedQuizCategory === '전체' && (
        <div className='flex flex-col justify-start items-start gap-[45px]'>
          <OpenQuizList
            readyQuizzes={readyQuizzes}
            ongoingQuizzes={ongoingQuizzes}
          />
        </div>
      )}
      {closedQuizzes.length === 0 && (
        <div className='flex justify-center items-center w-full h-[90px] text-heading2 font-semibold text-gray-50'>
          마감된 퀴즈가 없어요.
        </div>
      )}
      {closedQuizzes.map((quiz) => (
        <CloseQuizItem
          key={quiz.id}
          quiz={quiz}
        />
      ))}
    </div>
  );
}
