'use client';

import Image from 'next/image';
import { useLectureId } from '@/hooks/queries/useLectureId';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useConfirmModal } from '@/hooks/ui/useConfirmModal';
import Modal from '@/components/ui/Modal';

type QuizCreateHeaderProps = {
  onTemporarySave: () => void;
  onRegister: () => void;
};

export default function QuizCreateHeader({ onTemporarySave, onRegister }: QuizCreateHeaderProps) {
  const router = useRouter();
  const lectureId = useLectureId();

  const {
    isOpen: isRouteModalOpen,
    showConfirm: showRouteConfirm,
    handleConfirm: handleRouteConfirm,
    handleCancel: handleRouteCancel,
  } = useConfirmModal();

  const handleRouteToQuizList = async () => {
    const confirmed = await showRouteConfirm();

    if (confirmed) {
      router.push(`/lectures/${lectureId}/quiz`);
    }
  };

  return (
    <>
      <div className='flex justify-between items-center w-[1320px] h-[50px] mb-[22px]'>
        <button
          className='w-[136px] px-[5px] text-title3 font-bold flex items-center gap-[15px]'
          onClick={handleRouteToQuizList}
        >
          <Image
            src='/assets/icons/left_arrow.png'
            width={24}
            height={24}
            alt='이전으로'
          />
          퀴즈 생성
        </button>
        <div className='flex gap-[10px]'>
          <Button
            type='BUTTON_BASE_TYPE'
            size='w-fit h-[50px]'
            isPurple={false}
            font='text-headline1 font-semibold text-label-normal'
            title='임시저장'
            onClick={onTemporarySave}
          />
          <Button
            type='BUTTON_BASE_TYPE'
            size='w-fit h-[50px]'
            isPurple
            isfilled
            font='text-headline1 font-semibold text-white'
            title='등록하기'
            onClick={onRegister}
          />
        </div>
      </div>
      <Modal
        isOpen={isRouteModalOpen}
        onConfirm={handleRouteConfirm}
        onCancel={handleRouteCancel}
        title='지금 나가시겠어요?'
        description='작성 중인 퀴즈는 저장되지 않아요.'
        iconSrc='/assets/icons/trash_purple.png'
        enableCancelButton={true}
        enableConfirmButton={true}
      />
    </>
  );
}
