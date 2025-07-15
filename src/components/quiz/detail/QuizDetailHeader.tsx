'use client';

import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useDeleteQuiz } from '@/features/quiz/hooks/usePutQuizState';
import { QuizState } from '@/features/quiz/types/quiz.types';
import { useConfirmModal } from '@/hooks/ui/useConfirmModal';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

type QuizDetailHeaderProps = {
  lectureId: string;
  quizId: string;
};

export default function QuizDetailHeader({ lectureId, quizId }: QuizDetailHeaderProps) {
  const { mutate: deleteQuiz, isPending } = useDeleteQuiz({ lectureId, quizId });
  const searchParams = useSearchParams();
  const state = searchParams.get('state') as QuizState;

  const router = useRouter();
  const handleRouteToEditPage = () => {
    router.push(`/lectures/${lectureId}/quiz/create?type=edit&quizId=${quizId}`);
  };

  const {
    isOpen: isOpenDelete,
    showConfirm: showConfirmDelete,
    handleConfirm: handleConfirmDelete,
    handleCancel: handleCancelDelete,
  } = useConfirmModal();

  const handleDeleteQuiz = async () => {
    const confirmed = await showConfirmDelete();

    if (confirmed) {
      deleteQuiz(undefined);
    }
  };

  return (
    <div className='flex justify-between items-center w-full h-[50px] mb-[22px]'>
      <Link
        href={`/lectures/${lectureId}/quiz`}
        className='w-[136px] px-[5px] text-title3 font-bold flex items-center gap-[15px]'
      >
        <Image
          src='/assets/icons/left_arrow.png'
          width={24}
          height={24}
          alt='이전으로'
        />
        퀴즈 상세
      </Link>
      <div className='flex gap-[10px]'>
        <Button
          type='BUTTON_BASE_TYPE'
          size='w-fit h-[50px]'
          isPurple={false}
          font='text-headline1 font-semibold text-label-normal'
          title='삭제하기'
          onClick={handleDeleteQuiz}
          disabled={isPending}
        />
        {state === 'ready' && (
          <Button
            type='BUTTON_BASE_TYPE'
            size='w-fit h-[50px]'
            isPurple
            isfilled={false}
            font='text-headline1 font-semibold text-purple-50'
            title='수정하기'
            onClick={handleRouteToEditPage}
          />
        )}
      </div>
      <Modal
        isOpen={isOpenDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title='퀴즈를 삭제하시겠어요?'
        description='삭제된 퀴즈는 복구할 수 없어요.'
        iconSrc='/assets/icons/trash_purple.png'
        enableCancelButton={true}
        enableConfirmButton={true}
        confirmButtonType={{
          type: 'BUTTON_BASE_TYPE',
          isPurple: true,
          isfilled: true,
        }}
      />
    </div>
  );
}
