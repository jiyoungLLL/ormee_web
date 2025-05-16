'use client';

import { useProblemStore } from '@/stores/problemStore';
import RemoteButton from './RemoteButton';

export default function RemoteController() {
  const { problems } = useProblemStore();
  return (
    <div className='flex justify-start items-center flex-wrap gap-[3px] p-[20px] w-full max-h-[142px] rounded-[15px] bg-white select-none overflow-y-auto'>
      {problems.map((problem, index) => (
        <RemoteButton
          key={problem.id}
          index={index}
        />
      ))}
    </div>
  );
}
