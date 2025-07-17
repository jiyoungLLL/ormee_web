'use client';

import Modal from '@/components/ui/Modal';
import Input from '../ui/Input';
import { useForm } from 'react-hook-form';
import { PasswordCheckFormValues } from '@/features/auth/auth.types';
import { passwordCheckSchema } from '@/features/auth/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordCheckAction } from '@/features/auth/auth.action';

type IdentificationModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function IdentificationModal({ isOpen, onCancel, onConfirm }: IdentificationModalProps) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<PasswordCheckFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(passwordCheckSchema),
    defaultValues: {
      password: '',
    },
  });

  const handleConfirm = handleSubmit(async (data) => {
    const response = await passwordCheckAction(data);

    if (response.status === 'success') {
      onConfirm();
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
      title='본인 확인'
      containerStyle='w-[492px] bg-white rounded-[15px] px-[30px] py-[20px] select-none'
      confirmButtonType={{ type: 'BUTTON_BASE_TYPE', isPurple: true, isfilled: true }}
    >
      <div className='flex flex-col gap-[10px] mb-[35px]'>
        <h3 className='text-headline2 font-semibold'>비밀번호를 입력하세요</h3>
        <div className='flex flex-col gap-[4px] mb-[15px]'>
          <Input
            name='password'
            type='password'
            control={control}
            size='w-full h-[50px]'
            showCharacterCount
            maxLength={50}
          />
          {errors.password && <p className='text-label1 font-normal text-system-error'>{errors.password.message}</p>}
        </div>
      </div>
    </Modal>
  );
}
