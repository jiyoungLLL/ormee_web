import NoteContent from '@/components/note/NoteContent';
import Image from 'next/image';

export default function Note() {
  return (
    <>
      <div className='flex items-end gap-[5px] h-[34px]'>
        <div className='text-title3 font-bold flex items-center gap-[10px] px-[5px]'>
          <Image
            src={'/assets/icons/sidenav/note_selected.png'}
            width={28}
            height={28}
            alt='쪽지 아이콘'
            className='w-[28px] h-[28px]'
          />
          <div>쪽지</div>
        </div>
        <div className='text-label2-normal text-gray-60'>
          어려웠거나 해설이 필요한 문장을 쪽지로 전달받을 수 있어요.
        </div>
      </div>
      <NoteContent />
    </>
  );
}
