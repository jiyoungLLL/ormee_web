'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import { Quiz } from '@/schemas/quiz.schema';
import { formatDatetimeToYYYYMMDD } from '@/utils/date/formatDate';
import { useModal } from '@/hooks/ui/useModal';
import Modal from '@/components/ui/Modal';
import { useToastStore } from '@/stores/toastStore';
import { usePutQuizState } from '@/hooks/queries/quiz/usePutQuizState';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { useEffect } from 'react';

type OpenQuizItemProps = {
  quiz: Quiz;
  type: 'ongoing' | 'ready';
};

const SUCCESS_MESSAGE = {
  ongoing: '퀴즈가 마감되었습니다.',
  ready: '퀴즈가 게시되었습니다.',
};

export default function OpenQuizItem({ quiz, type }: OpenQuizItemProps) {
  const {
    isOpen: isUploadModalOpen,
    openModal: openUploadModal,
    closeModal: closeUploadModal,
  } = useModal({ defaultOpen: false });

  const {
    isOpen: isCloseModalOpen,
    openModal: openCloseModal,
    closeModal: closeCloseModal,
  } = useModal({ defaultOpen: false });

  const { addToast } = useToastStore();

  const { id: quizId, title, limitTime, updatedAt } = quiz;
  const formattedUpdatedAt = formatDatetimeToYYYYMMDD(updatedAt);

  const lectureId = useLectureId();
  const { mutate: mutateQuizState, isSuccess, error } = usePutQuizState({ quizId, lectureId });

  // TODO: 로딩상태 추가

  const handleCloseQuiz = async () => {
    mutateQuizState('closed');
    closeCloseModal();
  };

  const handleUploadQuiz = async () => {
    mutateQuizState('ongoing');
    closeUploadModal();
  };

  useEffect(() => {
    if (isSuccess) {
      addToast({ message: SUCCESS_MESSAGE[type], type: 'success' });
    }
  }, [isSuccess, type]);

  useEffect(() => {
    if (error) {
      addToast({ message: error.message, type: 'error' });
    }
  }, [error]);

  return (
    <div className='flex justify-between items-center px-[10px] py-[20px]'>
      <div className='flex items-center gap-[10px]'>
        <div className='flex justify-center items-center w-[49px] h-[49px] bg-accent-redOrange-5 rounded-[15px]'>
          <Image
            src='/assets/icons/category-icon/quiz.png'
            width={24}
            height={24}
            className='object-contain'
            alt='진행 퀴즈'
            draggable={false}
          />
        </div>
        <div className='flex flex-col gap-[5px]'>
          <h3 className='text-headline1 font-semibold'>{title}</h3>
          <p className='text-label font-semibold text-gray-50'>{formattedUpdatedAt}</p>
        </div>
      </div>
      <div className='flex items-center gap-[29px]'>
        <div className='flex items-center gap-[5px]'>
          <Image
            src='/assets/icons/timer.png'
            width={14}
            height={16.9}
            alt='응시 시간'
            draggable={false}
          />
          <span className='text-headline1 font-semibold'>{limitTime}</span>
        </div>
        {type === 'ongoing' && (
          <>
            <Button
              type='BUTTON_BASE_TYPE'
              size='w-fit h-[46px]'
              font='text-headline2 font-semibold'
              isPurple
              title='마감하기'
              onClick={openCloseModal}
            />
            <Modal
              isOpen={isCloseModalOpen}
              onCancel={closeCloseModal}
              onConfirm={handleCloseQuiz}
              title='퀴즈를 마감하시겠어요?'
              description='퀴즈를 마감하면 학생들이 더 이상 응시할 수 없어요.'
              iconSrc='/assets/icons/sidenav/quiz_selected.png'
            />
          </>
        )}
        {type === 'ready' && (
          <>
            <Button
              type='BUTTON_BASE_TYPE'
              size='w-fit h-[46px]'
              font='text-headline2 font-semibold'
              isPurple
              isfilled
              title='게시하기'
              onClick={openUploadModal}
            />
            <Modal
              isOpen={isUploadModalOpen}
              onCancel={closeUploadModal}
              onConfirm={handleUploadQuiz}
              title='퀴즈를 게시하시겠어요?'
              description='퀴즈를 게시하면 학생들이 바로 응시할 수 있어요.'
              iconSrc='/assets/icons/sidenav/quiz_selected.png'
            />
          </>
        )}
      </div>
    </div>
  );
}
