import { QuizFormValues } from '@/features/quiz/types/quiz.types';
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form';

type RemoveProblemButtonProps = {
  problemIndex: number;
};

export default function RemoveProblemButton({ problemIndex }: RemoveProblemButtonProps) {
  const { getValues, setValue } = useFormContext<QuizFormValues>();

  const handleRemove = () => {
    const currentProblems = getValues('problems') || [];

    if (currentProblems.length <= 1) return;

    const newProblems = currentProblems.filter((_, idx) => idx !== problemIndex);
    setValue('problems', newProblems);
  };

  return (
    <button
      type='button'
      className='w-[30px] h-[30px] bg-contain bg-center bg-no-repeat'
      style={{
        backgroundImage: `url('/assets/icons/trash.png')`,
      }}
      onClick={handleRemove}
    />
  );
}
