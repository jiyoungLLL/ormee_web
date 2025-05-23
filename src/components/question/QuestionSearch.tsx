'use client';

import { useDropdown } from '@/hooks/ui/useDropdown';
import { QuestionSearchByType, useQuestionFilter } from '@/components/question/QuestionFilterContextProvider';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { useForm } from 'react-hook-form';
import SearchInput from '@/components/ui/SearchInput';

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

  const { setSearchCondition } = useQuestionFilter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      keyword: '', // TODO: 비었을 때 검색 안되게 유효성검사 추가
    },
  });

  const handleSearch = ({ keyword }: { keyword: string }) => {
    const searchBy = SEARCH_BY_LIST.find((item) => item.label === selectedItem)?.id;
    setSearchCondition({ searchBy: searchBy ?? 'title', keyword });
  };

  return (
    <div className='flex items-center gap-[10px]'>
      <Dropdown
        showTrigger
        menuList={menuListForDropdown}
        selectedItem={selectedItem}
        size='w-[119px] h-[46px]'
      />
      <form onSubmit={handleSubmit(handleSearch)}>
        <SearchInput
          name='keyword'
          control={control}
          placeholder='검색'
        />
      </form>
    </div>
  );
}
