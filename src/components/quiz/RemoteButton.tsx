'use client';

type RemoteButtonProps = {
  index: number;
};

export default function RemoteButton({ index }: RemoteButtonProps) {
  const context = index + 1;

  return (
    <button className='flex justify-center items-center w-[32px] h-[32px] p-[10px] rounded-full bg-purple-50 text-headline2 font-semibold text-white'>
      {context}
    </button>
  );
}
