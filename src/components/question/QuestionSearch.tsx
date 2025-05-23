'use client';

import { useDropdown } from '@/hooks/ui/useDropdown';
import { QuestionSearchByType, useQuestionFilter } from '@/components/question/QuestionFilterContextProvider';
import Dropdown from '../ui/dropdown/Dropdown';

const SEARCH_BY_LIST: { id: QuestionSearchByType; label: string }[] = [
  { id: 'title', label: '제목' },
  { id: 'content', label: '내용' },
  { id: 'author', label: '작성자' },
  { id: 'all', label: '전체' },
];

export default function QuestionSearch() {
  const { selectedItem, menuListForDropdown } = useDropdown({
    menuList: SEARCH_BY_LIST,
    initialSelectedItem: '제목',
  });

  const { searchBy, setSearchBy, setKeyword } = useQuestionFilter();

  return (
    <div>
      <Dropdown
        showTrigger
        menuList={menuListForDropdown}
        selectedItem={selectedItem}
      />
    </div>
  );
}
