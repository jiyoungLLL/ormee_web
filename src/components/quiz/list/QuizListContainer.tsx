'use client';

import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { useGetQuizList } from '@/hooks/queries/quiz/useGetQuizList';
import { MenuItem, useDropdown } from '@/hooks/ui/useDropdown';
import Link from 'next/link';
import { useMemo } from 'react';
import OpenQuizList from './OpenQuizList';
import { usePathname } from 'next/navigation';
import CloseQuizList from './CloseQuizList';
import { useLectureId } from '@/hooks/queries/useLectureId';

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

  const lectureId = useLectureId();
  const { data: quizList } = useGetQuizList(lectureId);

  const { openQuizzes, closedQuizzes } = useMemo(() => {
    const open = quizList?.filter((quiz) => quiz.state === 'ready' || quiz.state === 'ongoing') ?? [];
    const closed = quizList?.filter((quiz) => quiz.state === 'closed') ?? [];

    return { openQuizzes: open, closedQuizzes: closed };
  }, [quizList]);

  return (
    <div className='flex flex-col gap-[20px] w-full h-[721px] px-[30px] py-[20px] rounded-[20px] box-border bg-white overflow-y-auto'>
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
        <>
          <div className='flex flex-col justify-start items-start gap-[45px]'>
            <OpenQuizList openQuizzes={openQuizzes} />
            <CloseQuizList closedQuizzes={closedQuizzes} />
          </div>
        </>
      )}
    </div>
  );
}
