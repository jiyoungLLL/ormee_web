import XIcon from '@/components/icon/XIcon';
import { useGetDraftHomeworks } from '@/features/homework/useHomeworkApi';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { format } from 'date-fns';
import { usePathname } from 'next/navigation';
import Modal from '../Modal';

type DraftProps = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  onConfirm: () => void;
};

export default function Draft({ isOpen, openModal, closeModal, onConfirm }: DraftProps) {
  const lectureId = useLectureId();
  const pathname = usePathname();
  const category = pathname.split('/')[3];

  const { data } = useGetDraftHomeworks(lectureId);

  const renderDraft = () => {
    return data?.map((item) => (
      <div
        key={item.id}
        className='flex gap-[40px] h-[50px] justify-between items-center text-body-reading'
      >
        <div className='flex gap-[40px] flex-1 hover:opacity-50'>
          <div className='flex-1'>{item.title}</div>
          <div className='w-[76px] text-nowrap'>{item.openTime && format(item.openTime, 'yy-MM-dd')}</div>
        </div>
        <XIcon
          size={14.29}
          thickness={2}
          color='bg-gray-40'
          useTailwind={true}
        />
      </div>
    ));
  };

  return (
    <form>
      <Modal
        isOpen={isOpen}
        onCancel={closeModal}
        onConfirm={onConfirm}
        title='임시저장'
        containerStyle='w-[532px] h-[688px] flex flex-col px-[20px] py-[30px] bg-white rounded-[15px]'
      >
        <div className='flex gap-[10px] flex-col mb-auto'>
          <div className='text-headline2 text-gray-70 font-semibold flex justify-between pb-[10px] border-b border-b-gray-30'>
            <div className='w-[300px]'>제목</div>
            <div className='pr-[64px]'>임시저장일</div>
          </div>
          {renderDraft()}
        </div>
      </Modal>
    </form>
  );
}
