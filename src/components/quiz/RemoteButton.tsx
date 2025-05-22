'use client';

import { QuizFormValues } from '@/types/quiz.types';
import { useActiveProblemStore } from '@/stores/activeProblemStore';
import { FieldArrayWithId } from 'react-hook-form';

type RemoteButtonProps = {
  problem: FieldArrayWithId<QuizFormValues, 'problems', 'id'>;
  index: number;
};

const ACTIVE_BUTTON_STYLE = 'bg-purple-50 text-white';
const INACTIVE_BUTTON_STYLE = 'bg-white border border-gray-10 text-gray-70';

export default function RemoteButton({ problem, index }: RemoteButtonProps) {
  const { activeProblemId } = useActiveProblemStore();
  const isActive = activeProblemId === problem.id;
  const context = index + 1;

  return (
    <button
      className={`flex justify-center items-center w-[32px] h-[32px] p-[10px] rounded-full text-headline2 font-semibold box-border ${isActive ? ACTIVE_BUTTON_STYLE : INACTIVE_BUTTON_STYLE}`}
    >
      {context}
    </button>
  );
}
