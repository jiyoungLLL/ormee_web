'use client';

import Dropdown from '@/components/ui/dropdown/Dropdown';
import { QUIZ_TYPE_MAP } from '@/constants/quiz.constants';
import { useDropdown } from '@/hooks/ui/useDropdown';
import { QuizFormValues } from '@/schemas/quiz.schema';
import { ProblemType } from '@/types/quiz.types';
import { useFormContext } from 'react-hook-form';

type ProblemTypeDropdownProps = {
  index: number;
};

export default function ProblemTypeDropdown({ index }: ProblemTypeDropdownProps) {
  const { setValue } = useFormContext<QuizFormValues>();

  const setProblemType = (type: ProblemType) => {
    setValue(`problems.${index}.type`, type);
  };

  const { selectedItem, menuListForDropdown } = useDropdown({
    menuList: [
      {
        id: 'p-type-choice',
        label: QUIZ_TYPE_MAP.choice.label,
        onClick: () => setProblemType(QUIZ_TYPE_MAP.choice.type),
      },
      { id: 'p-type-essay', label: QUIZ_TYPE_MAP.essay.label, onClick: () => setProblemType(QUIZ_TYPE_MAP.essay.type) },
    ],
    initialSelectedItem: QUIZ_TYPE_MAP.choice.label,
  });

  return (
    <Dropdown
      showTrigger
      menuList={menuListForDropdown}
      selectedItem={selectedItem}
      triggerAreaOnOpenStyle='bg-white'
    />
  );
}
