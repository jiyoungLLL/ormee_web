'use client';

import { useDropdown } from '@/hooks/ui/useDropdown';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { useForm } from 'react-hook-form';
import SearchInput from '@/components/ui/SearchInput';
import { useToastStore } from '@/stores/toastStore';
import { QuestionSearchByType, useQuestionSearchParams } from '@/features/question/hooks/useQuestionSearchParams';

const SEARCH_BY_LIST: { id: QuestionSearchByType; label: string }[] = [
  { id: 'title', label: '제목' },
  { id: 'content', label: '내용' },
  { id: 'author', label: '작성자' },
  { id: 'all', label: '전체' },
];

export default function QuestionSearch() {
  const { setSearchCondition, initialSearchBy, initialKeyword } = useQuestionSearchParams();

  const { selectedItem, menuListForDropdown } = useDropdown({
    menuList: SEARCH_BY_LIST,
    initialSelectedItem: SEARCH_BY_LIST.find((item) => item.id === initialSearchBy)?.label ?? '제목',
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      keyword: initialKeyword,
    },
  });

  const { addToast } = useToastStore();

  const handleSearch = ({ keyword }: { keyword: string }) => {
    if (!keyword.trim()) addToast({ message: '검색어를 입력해주세요.', type: 'error' });

    const searchBy = SEARCH_BY_LIST.find((item) => item.label === selectedItem)?.id;
    setSearchCondition({ searchBy: searchBy ?? 'title', keyword });
  };

  return (
    <div className='flex items-center gap-[10px] mb-[20px]'>
      <Dropdown
        showTrigger
        menuList={menuListForDropdown}
        selectedItem={selectedItem}
        size='w-[119px] h-[46px]'
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(handleSearch)(e);
        }}
      >
        <SearchInput
          name='keyword'
          control={control}
          placeholder='검색'
        />
      </form>
    </div>
  );
}
