import { useDeleteCoworker, usePostCoworker } from '@/features/class/hooks/queries/useClassApi';
import { useModal } from '@/hooks/ui/useModal';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';

type CoworkerProps = {
  lectureId: string;
  coTeacher: string | undefined;
};

export default function Coworker({ lectureId, coTeacher }: CoworkerProps) {
  const [isPost, setIsPost] = useState<boolean>(true);

  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const { isOpen, openModal, closeModal } = useModal({ defaultOpen: false });

  const methods = useForm({
    mode: 'onSubmit',
  });

  const { control, watch, handleSubmit, reset } = methods;

  useEffect(() => {
    const shouldPost = !(coTeacher !== undefined && coTeacher);
    setIsPost(shouldPost);

    if (!shouldPost) {
      reset({ coworker: coTeacher });
    }
  }, [coTeacher]);

  const username = watch('coworker');

  const postCoworker = usePostCoworker(lectureId, username, () => setIsPost(false));
  const deleteCoworker = useDeleteCoworker(lectureId, username, () => {
    setIsPost(true);
    reset({ coworker: '' });
  });

  const onSubmit = () => {
    if (isPost) {
      postCoworker.mutate(lectureId, username);
    } else {
      deleteCoworker.mutate(lectureId, username);
    }
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-[10px] text-headline2 font-semibold'
    >
      공동작업자 관리
      <div className='flex gap-[10px]'>
        <Input
          name='coworker'
          control={control}
          size='w-full h-[50px]'
          placeholder='아이디 입력'
          type='text'
        />

        <Button
          type='BUTTON_BASE_TYPE'
          size='h-[50px]'
          font='text-healine1 font-bold'
          title={isPost ? '추가' : '삭제'}
          isPurple={true}
          isfilled={false}
          htmlType='button'
          onClick={() => {
            if (isPost) {
              onSubmit();
            } else {
              openModal();
              setConfirmModal(true);
            }
          }}
        />

        {!isPost && confirmModal && (
          <Modal
            isOpen={isOpen}
            onCancel={closeModal}
            onConfirm={onSubmit}
            title='공동작업자를 삭제할까요?'
            iconSrc='/assets/icons/warning.png'
            description='공동작업자 변경은 강의실 당 1회에 한해 가능해요'
            confirmButtonType={{ isPurple: true }}
          />
        )}
      </div>
    </form>
  );
}
