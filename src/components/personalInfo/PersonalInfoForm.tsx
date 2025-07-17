'use client';

import { PersonalInfoFormValues } from '@/features/user/types/user.types';
import { useFormContext } from 'react-hook-form';
import EmailInput from '@/components/ui/inputs/EmailInput';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import PhoneNumberInput from '../ui/inputs/PhoneNumberInput';

type PersonalInfoFormProps = {
  isEdit: boolean;
  isIdentified: boolean;
  username: string | undefined;
  openIdentificationModal: () => void;
  openPasswordChangeModal: () => void;
};

export default function PersonalInfoForm({
  isEdit,
  username,
  isIdentified,
  openIdentificationModal,
  openPasswordChangeModal,
}: PersonalInfoFormProps) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<PersonalInfoFormValues>();

  return (
    <>
      <div className='grid grid-cols-2 gap-x-[130px] gap-y-[20px]'>
        <div className='flex flex-col w-[390px] gap-[8px]'>
          <h3 className='text-headline2 font-semibold text-gray-70'>이름</h3>
          <div className='flex flex-col gap-[4px]'>
            <div className='flex justify-start items-end gap-[10px]'>
              <Input
                name='name'
                control={control}
                size='w-[314px] h-[55px]'
                disabled={!isEdit || !isIdentified}
                inputStyle={
                  errors.name
                    ? 'bg-white pl-[20px] py-[15px] rounded-[10px] border-[1px] border-system-error focus:outline-none disabled:bg-gray-10'
                    : undefined
                }
              />
              {isEdit && (
                <Button
                  type='BUTTON_BASE_TYPE'
                  htmlType='button'
                  size='w-fit h-[40px]'
                  title='수정'
                  onClick={openIdentificationModal}
                  font='text-headline2 font-semibold text-purple-50 leading-[16px]'
                  isPurple
                  isfilled={false}
                />
              )}
            </div>
            {errors.name && <p className='text-label1 font-normal text-system-error'>{errors.name.message}</p>}
          </div>
        </div>
        <div className='flex flex-col w-[390px] gap-[8px]'>
          <h3 className='text-headline2 font-semibold text-gray-70'>강사명</h3>
          <div className='flex flex-col gap-[4px]'>
            <Input
              name='nickname'
              control={control}
              size='w-[390px] h-[55px]'
              disabled={!isEdit}
              inputStyle={
                errors.nickname
                  ? 'bg-white pl-[20px] py-[15px] rounded-[10px] border-[1px] border-system-error focus:outline-none disabled:bg-gray-10'
                  : undefined
              }
            />
            {errors.nickname && <p className='text-label1 font-normal text-system-error'>{errors.nickname.message}</p>}
          </div>
        </div>
        <div className='flex flex-col w-[390px] gap-[8px]'>
          <h3 className='text-headline2 font-semibold text-gray-70'>아이디</h3>
          <div className='flex items-center w-[390px] h-[55px] px-[20px] py-[15px] rounded-[10px] border border-gray-20 bg-gray-10'>
            <p className='text-headline1 font-normal text-label-assistive'>{username}</p>
          </div>
        </div>
        <div className='flex flex-col w-[390px] gap-[8px]'>
          <h3 className='text-headline2 font-semibold text-gray-70'>비밀번호</h3>
          <div className='flex justify-start items-end gap-[10px]'>
            <div className='flex items-center w-[390px] h-[55px] px-[20px] py-[15px] rounded-[10px] border border-gray-20 bg-gray-10'></div>
            {isEdit && (
              <Button
                type='BUTTON_BASE_TYPE'
                htmlType='button'
                size='w-fit h-[40px]'
                title='수정'
                onClick={openPasswordChangeModal}
                font='text-headline2 font-semibold text-purple-50 leading-[16px]'
                isPurple
                isfilled={false}
              />
            )}
          </div>
        </div>
        <div className='flex flex-col w-[390px] col-span-2 gap-[8px]'>
          <h3 className='text-headline2 font-semibold text-gray-70'>연락처 1</h3>
          <PhoneNumberInput
            control={control}
            name='phoneNumber'
            verificationName='isPhoneNumberVerified'
            setValue={setValue}
            disabled={!isEdit}
            sendVertificationButtonDisabled={!isEdit}
            isRequired={false}
          />
        </div>
        <div className='flex flex-col gap-[8px] col-span-2'>
          <h3 className='text-headline2 font-semibold text-gray-70'>이메일</h3>
          <EmailInput
            control={control}
            idName='emailId'
            domainName='emailDomain'
            idDisabled={!isEdit}
            domainDisabled={!isEdit}
            idInputSize='w-[250px] h-[55px]'
            domainInputSize='w-[250px] h-[55px]'
          />
        </div>
      </div>
    </>
  );
}
