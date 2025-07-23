'use client';

import IdentificationModal from '@/components/personalInfo/IdentificationModal';
import PasswordChangeModal from '@/components/personalInfo/PasswordChangeModal';
import PersonalInfoForm from '@/components/personalInfo/PersonalInfoForm';
import Button from '@/components/ui/Button';
import { personalInfoFormSchema } from '@/features/user/schemas/user.schema';
import { PersonalInfoFormValues } from '@/features/user/types/user.types';
import { useEditPersonalInfo, useGetPersonalInfo } from '@/features/user/usePersonalInfoApi';
import { useModal } from '@/hooks/ui/useModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function PersonalPage() {
  const { data: userInfo } = useGetPersonalInfo();
  const methods = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      isPhoneNumberVerified: false,
    },
  });

  const { setValue, handleSubmit } = methods;

  useEffect(() => {
    if (!userInfo) return;

    const [emailId, emailDomain] = userInfo.email.split('@');
    const [prefix, middle, last] = userInfo.phoneNumber.split('-');

    setValue('name', userInfo.name);
    setValue('nickname', userInfo.nickname);
    setValue('emailId', emailId);
    setValue('emailDomain', emailDomain);
    setValue('phoneNumberPrefix', prefix);
    setValue('phoneNumberMiddle', middle);
    setValue('phoneNumberLast', last);
  }, [userInfo, setValue]);

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    if (!isEdit) {
      setIsEdit(true);
      setValue('isPhoneNumberVerified', false);
    }
  };

  const { mutate: mutatePersonalInfo, isPending: isPendingPersonalInfo } = useEditPersonalInfo();
  const handleSubmitInfo = handleSubmit((data) => {
    mutatePersonalInfo(
      {
        phoneNumber: `${data.phoneNumberPrefix}-${data.phoneNumberMiddle}-${data.phoneNumberLast}`,
        email: `${data.emailId}@${data.emailDomain}`,
        name: data.name,
        nickname: data.nickname,
      },
      {
        onSuccess: () => {
          setIsEdit(false);
        },
      },
    );
  });

  const [isIdentified, setIsIdentified] = useState(false);
  const {
    isOpen: isIdentificationModalOpen,
    openModal: openIdentificationModal,
    closeModal: closeIdentificationModal,
  } = useModal({ defaultOpen: false });

  const confirmIdentification = () => {
    setIsIdentified(true);
    closeIdentificationModal();
  };

  const {
    isOpen: isPasswordChangeModalOpen,
    openModal: openPasswordChangeModal,
    closeModal: closePasswordChangeModal,
  } = useModal({ defaultOpen: false });

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <div className='flex justify-between items-center mb-[25px]'>
            <h1 className='text-title3 font-bold px-[5px]'>개인정보 설정</h1>
            <Button
              htmlType='button'
              type='BUTTON_BASE_TYPE'
              size='w-fit h-fit'
              title={isEdit ? '저장하기' : '수정하기'}
              font='text-headline1 font-[18px] font-semibold'
              isPurple
              isfilled={isEdit}
              onClick={isEdit ? handleSubmitInfo : handleEdit}
              disabled={isPendingPersonalInfo}
            />
          </div>
          <div className='w-[1018px] h-[706px] px-[30px] py-[20px] rounded-[20px] bg-white'>
            <PersonalInfoForm
              isEdit={isEdit}
              isIdentified={isIdentified}
              username={userInfo?.username}
              openIdentificationModal={openIdentificationModal}
              openPasswordChangeModal={openPasswordChangeModal}
            />
          </div>
        </form>
      </FormProvider>
      <IdentificationModal
        isOpen={isIdentificationModalOpen}
        onCancel={closeIdentificationModal}
        onConfirm={confirmIdentification}
      />
      <PasswordChangeModal
        isOpen={isPasswordChangeModalOpen}
        onCancel={closePasswordChangeModal}
        onConfirm={closePasswordChangeModal}
      />
    </>
  );
}
