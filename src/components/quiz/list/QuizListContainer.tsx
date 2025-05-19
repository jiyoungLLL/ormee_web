'use client';

import Dropdown from '@/components/ui/dropdown/Dropdown';
import { MenuItem, useDropdown } from '@/hooks/ui/useDropdown';

const QUIZ_DROPDOWN_LIST: MenuItem[] = [
  { id: 'quiz-list-total', label: '전체' },
  { id: 'quiz-list-tempotaty', label: '임시저장' },
];

export default function QuizListContainer() {
  const { selectedItem: selectedQuizCategory, menuListForDropdown: quizCategoryList } = useDropdown({
    menuList: QUIZ_DROPDOWN_LIST,
    initialSelectedItem: QUIZ_DROPDOWN_LIST[0].label,
  });

  return (
    <div className='flex-1 flex flex-col gap-[20px] w-full h-full px-[30px] py-[20px] rounded-[20px] bg-white'>
      <Dropdown
        showTrigger
        menuList={quizCategoryList}
        selectedItem={selectedQuizCategory}
      />
      <div>{selectedQuizCategory}</div>
    </div>
  );
}
