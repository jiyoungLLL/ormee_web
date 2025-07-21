'use client';

import Modal from '@/components/ui/Modal';
import { passwordChangeAction } from '@/features/auth/auth.action';
import { passwordChangeFormSchema } from '@/features/auth/auth.schema';
import { PasswordChangeFormValues } from '@/features/auth/auth.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';

type PasswordChangeModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (newPassword: string) => void;
};

export default function PasswordChangeModal({ isOpen, onCancel, onConfirm }: PasswordChangeModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<PasswordChangeFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    resolver: zodResolver(passwordChangeFormSchema),
  });

  const handleConfirm = handleSubmit(async (data) => {
    const response = await passwordChangeAction(data);

    if (response.status === 'success') {
      onConfirm(data.newPassword);
      reset();
    } else {
      setError('password', { message: response.data });
    }
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <Modal
      isOpen={isOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      title='비밀번호 변경'
      containerStyle='w-[499px] bg-white rounded-[15px] px-[30px] py-[20px] select-none'
      confirmButtonType={{ type: 'BUTTON_BASE_TYPE', isPurple: true, isfilled: true }}
    >
      <div className='flex flex-col gap-[20px] mb-[35px]'>
        <div className='flex flex-col gap-[10px] mb-[15px]'>
          <h3 className='text-headline2 font-semibold'>현재 비밀번호</h3>
          <div className='flex flex-col gap-[4px]'>
            <Input
              name='password'
              type='password'
              control={control}
              size='w-full h-[50px]'
              showCharacterCount
              maxLength={50}
            />
            {errors.password && <p className='text-label1 font-medium text-system-error'>{errors.password.message}</p>}
          </div>
        </div>
        <div className='flex flex-col gap-[10px] mb-[15px]'>
          <h3 className='text-headline2 font-semibold'>새 비밀번호</h3>
          <div className='flex flex-col gap-[4px]'>
            <Input
              name='newPassword'
              type='password'
              control={control}
              size='w-full h-[50px]'
              showCharacterCount
              maxLength={50}
            />
            {errors.newPassword && (
              <p className='text-label1 font-medium text-system-error'>{errors.newPassword.message}</p>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-[10px] mb-[15px]'>
          <h3 className='text-headline2 font-semibold'>비밀번호 확인</h3>
          <div className='flex flex-col gap-[4px]'>
            <Input
              name='newPasswordConfirm'
              type='password'
              control={control}
              size='w-full h-[50px]'
              showCharacterCount
              maxLength={50}
            />
            {errors.newPasswordConfirm && (
              <p className='text-label1 font-medium text-system-error'>{errors.newPasswordConfirm.message}</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
