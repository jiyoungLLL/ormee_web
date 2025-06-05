'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import { Quiz } from '@/features/quiz/quiz.types';
import { formatDatetimeWithTime } from '@/utils/date/formatDate';
import { useModal } from '@/hooks/ui/useModal';
import Modal from '@/components/ui/Modal';
import { usePutQuizState } from '@/features/quiz/hooks/usePutQuizState';
import { useLectureId } from '@/hooks/queries/useLectureId';

type OpenQuizItemProps = {
  quiz: Quiz;
  type: 'ongoing' | 'ready';
  isLastQuiz: boolean;
};

export default function OpenQuizItem({ quiz, type, isLastQuiz }: OpenQuizItemProps) {
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

  const { id: quizId, title, limitTime, dueTime } = quiz;
  const formattedDueTime = formatDatetimeWithTime(dueTime);

  const lectureId = useLectureId();
  const { mutate: mutateQuizState } = usePutQuizState({ quizId, lectureId, prevState: type });

  // TODO: 로딩상태 추가

  const handleCloseQuiz = async () => {
    mutateQuizState('closed');
    closeCloseModal();
  };

  const handleUploadQuiz = async () => {
    mutateQuizState('ongoing');
    closeUploadModal();
  };

  return (
    <div className='flex flex-col w-full gap-[5px]'>
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
            <p className='text-label font-semibold text-gray-50'>{formattedDueTime}</p>
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
      {!isLastQuiz && <div className='w-full h-[1px] bg-gray-30' />}
    </div>
  );
}
