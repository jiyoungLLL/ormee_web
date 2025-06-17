'use client';

import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { useGetQuizList } from '@/features/quiz/hooks/useGetQuizList';
import { MenuItem, useDropdown } from '@/hooks/ui/useDropdown';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import OpenQuizList from '@/components/quiz/list/OpenQuizList';
import CloseQuizList from '@/components/quiz/list/CloseQuizList';
import { useLectureId } from '@/hooks/queries/useLectureId';
import TemporaryQuizList from '@/components/quiz/list/TemporaryQuizList';
import { useQuizCategory } from '@/features/quiz/hooks/useQuizCategory';

export default function QuizListContainer() {
  const pathname = usePathname();
  const { currentQuizCategory, changeQuizCategory } = useQuizCategory();

  const QUIZ_DROPDOWN_LIST: MenuItem[] = [
    { id: 'quiz-list-total', label: '전체', onClick: () => changeQuizCategory('전체') },
    { id: 'quiz-list-tempotaty', label: '임시저장', onClick: () => changeQuizCategory('임시저장') },
  ];

  const { selectedItem: selectedQuizCategory, menuListForDropdown: quizCategoryList } = useDropdown({
    menuList: QUIZ_DROPDOWN_LIST,
    initialSelectedItem: currentQuizCategory,
  });

  const lectureId = useLectureId();
  const { data: quizList, error } = useGetQuizList(lectureId);

  const { openQuizzes, closedQuizzes } = quizList ?? { openQuizzes: [], closedQuizzes: [] };

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
            <OpenQuizList
              openQuizzes={openQuizzes}
              error={error}
            />
            <CloseQuizList
              closedQuizzes={closedQuizzes}
              error={error}
            />
          </div>
        </>
      )}
      {selectedQuizCategory === '임시저장' && <TemporaryQuizList />}
    </div>
  );
}
