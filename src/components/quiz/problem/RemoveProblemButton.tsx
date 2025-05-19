import { UseFieldArrayRemove } from 'react-hook-form';

type RemoveProblemButtonProps = {
  problemIndex: number;
  remove: UseFieldArrayRemove;
};

export default function RemoveProblemButton({ problemIndex, remove }: RemoveProblemButtonProps) {
  return (
    <button
      type='button'
      className='w-[30px] h-[30px] bg-contain bg-center bg-no-repeat'
      style={{
        backgroundImage: `url('/assets/icons/trash.png')`,
      }}
      onClick={() => remove(problemIndex)}
    />
  );
}
