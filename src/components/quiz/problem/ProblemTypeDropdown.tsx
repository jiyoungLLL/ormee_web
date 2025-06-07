'use client';

import Dropdown from '@/components/ui/dropdown/Dropdown';
import { useDropdown } from '@/hooks/ui/useDropdown';
import { ProblemType, QuizFormValues } from '@/features/quiz/quiz.types';
import { useFormContext } from 'react-hook-form';
import { QUIZ_LABEL_MAP } from '@/features/quiz/quiz.constants';

type ProblemTypeDropdownProps = {
  index: number;
};

export default function ProblemTypeDropdown({ index }: ProblemTypeDropdownProps) {
  const { setValue, watch } = useFormContext<QuizFormValues>();

  const currentProblemType = watch(`problems.${index}.type`);

  const setProblemType = (type: ProblemType) => {
    setValue(`problems.${index}.type`, type);
  };

  const { selectedItem, menuListForDropdown } = useDropdown({
    menuList: [
      {
        id: 'p-type-choice',
        label: QUIZ_LABEL_MAP.CHOICE,
        onClick: () => setProblemType('CHOICE'),
      },
      { id: 'p-type-essay', label: QUIZ_LABEL_MAP.ESSAY, onClick: () => setProblemType('ESSAY') },
    ],
    initialSelectedItem: QUIZ_LABEL_MAP[currentProblemType] || QUIZ_LABEL_MAP.CHOICE,
  });

  return (
    <Dropdown
      showTrigger
      menuList={menuListForDropdown}
      selectedItem={QUIZ_LABEL_MAP[currentProblemType] || selectedItem}
      triggerAreaOnOpenStyle='bg-white'
    />
  );
}
