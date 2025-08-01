'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import { Quiz, QuizState } from '@/features/quiz/types/quiz.types';
import { useModal } from '@/hooks/ui/useModal';
import Modal from '@/components/ui/Modal';
import { usePutQuizState } from '@/features/quiz/hooks/usePutQuizState';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { getPlainText } from '@/utils/getPlainText';
import { useRouter } from 'next/navigation';
import TeacherLabel from '@/components/ui/label/TeacherLabel';
import { useGetAuthorRole } from '@/hooks/useGetAuthorRole';

type OpenQuizItemProps = {
  quiz: Quiz;
  isLastQuiz: boolean;
};

export default function OpenQuizItem({ quiz, isLastQuiz }: OpenQuizItemProps) {
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

  const { id: quizId, title, limitTime, dueTime, state, author } = quiz;
  const plainTitle = getPlainText(title);
  const authorRole = useGetAuthorRole(author);

  const lectureId = useLectureId();
  const { mutate: mutateQuizState } = usePutQuizState({
    quizId,
    lectureId,
    prevState: state as Exclude<QuizState, 'closed' | 'temporary'>,
  });

  // TODO: 로딩상태 추가

  const handleCloseQuiz = async () => {
    mutateQuizState(undefined);
    closeCloseModal();
  };

  const handleUploadQuiz = async () => {
    mutateQuizState(undefined);
    closeUploadModal();
  };

  const router = useRouter();
  const handleRouteToDetailPage = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;

    router.push(`/lectures/${lectureId}/quiz/${quizId}?state=${state}`);
  };

  return (
    <div className='flex flex-col w-full gap-[5px]'>
      <div
        className='flex justify-between items-center px-[10px] py-[20px] cursor-pointer'
        onClick={handleRouteToDetailPage}
      >
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
            <h3 className='text-headline1 font-semibold'>{plainTitle}</h3>
            <div className='flex items-center gap-[10px]'>
              <TeacherLabel
                name={author}
                role={authorRole}
              />
              <p className='text-label font-semibold text-gray-50'>{dueTime}</p>
            </div>
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
          {state === 'ongoing' && (
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
                confirmButtonType={{
                  type: 'BUTTON_BASE_TYPE',
                  isPurple: true,
                  isfilled: true,
                }}
              />
            </>
          )}
          {state === 'ready' && (
            <>
              <Button
                type='BUTTON_BASE_TYPE'
                size='w-fit h-[46px]'
                font='text-headline2 font-semibold'
                isPurple
                isfilled
                title='공개하기'
                onClick={openUploadModal}
              />
              <Modal
                isOpen={isUploadModalOpen}
                onCancel={closeUploadModal}
                onConfirm={handleUploadQuiz}
                title='퀴즈를 공개하시겠어요?'
                description='공개하면 학생들이 바로 응시할 수 있어요.'
                iconSrc='/assets/icons/sidenav/quiz_selected.png'
                confirmButtonType={{
                  type: 'BUTTON_BASE_TYPE',
                  isPurple: true,
                  isfilled: true,
                }}
              />
            </>
          )}
        </div>
      </div>
      {!isLastQuiz && <div className='w-full h-[1px] bg-gray-30' />}
    </div>
  );
}
