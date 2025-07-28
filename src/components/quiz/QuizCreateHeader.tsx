'use client';

import Image from 'next/image';
import { useLectureId } from '@/hooks/queries/useLectureId';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useConfirmModal } from '@/hooks/ui/useConfirmModal';
import Modal from '@/components/ui/Modal';
import { useQuizEditMode } from '@/features/quiz/hooks/useQuizEditMode';
import { useModal } from '@/hooks/ui/useModal';
import LoadModal from '@/components/ui/loadModal/LoadModal';
import Draft from '@/components/ui/draftModal/Draft';
import { useGetTemporaryQuizList } from '@/features/quiz/hooks/useGetTemporaryQuizList';

type QuizCreateHeaderProps = {
  onTemporarySave: () => void;
  onRegister: () => void;
};

export default function QuizCreateHeader({ onTemporarySave, onRegister }: QuizCreateHeaderProps) {
  const router = useRouter();
  const lectureId = useLectureId();
  const { isEditMode } = useQuizEditMode();

  // 임시저장된 퀴즈 목록 가져오기
  const { data: temporaryQuizList } = useGetTemporaryQuizList(lectureId);
  const draftCount = temporaryQuizList?.length || 0;

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

  const {
    isOpen: isLoadModalOpen,
    openModal: openLoadModal,
    closeModal: closeLoadModal,
  } = useModal({ defaultOpen: false });

  const {
    isOpen: isDraftModalOpen,
    openModal: openDraftModal,
    closeModal: closeDraftModal,
  } = useModal({ defaultOpen: false });

  const handleLoadQuiz = (quizId: number) => {
    router.push(`/lectures/${lectureId}/quiz/create?loadQuizId=${quizId}`);
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
            title='불러오기'
            onClick={openLoadModal}
          />
          <Button
            type='BUTTON_BASE_TYPE'
            size='w-fit h-[50px]'
            isPurple={false}
            font='text-headline1 font-semibold text-label-normal'
            title='임시저장'
            onClick={openDraftModal}
            added={draftCount > 0 ? ` ${draftCount}` : ''}
          />
          <Button
            type='BUTTON_BASE_TYPE'
            size='w-fit h-[50px]'
            isPurple
            isfilled
            font='text-headline1 font-semibold text-white'
            title={isEditMode ? '수정하기' : '등록하기'}
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
      {isLoadModalOpen && (
        <LoadModal
          type='퀴즈'
          isOpen={true}
          onCancel={closeLoadModal}
          onConfirm={closeLoadModal}
          onClick={handleLoadQuiz}
        />
      )}
      {isDraftModalOpen && (
        <Draft
          type='QUIZ'
          isOpen={true}
          closeModal={closeDraftModal}
          onSaveDraft={onTemporarySave}
        />
      )}
    </>
  );
}
