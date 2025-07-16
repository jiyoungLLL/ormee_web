'use client';

import { PersonalInfoFormValues } from '@/features/user/types/user.types';
import { useGetPersonalInfo } from '@/features/user/usePersonalInfoApi';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import EmailInput from '@/components/ui/inputs/EmailInput';
import Input from '@/components/ui/Input';

type PersonalInfoFormProps = {
  isEdit: boolean;
};

export default function PersonalInfoForm({ isEdit }: PersonalInfoFormProps) {
  const { data: userInfo } = useGetPersonalInfo();
  const { control, setValue } = useForm<PersonalInfoFormValues>();

  useEffect(() => {
    if (!userInfo) return;

    const [emailId, emailDomain] = userInfo.email.split('@');

    setValue('name', userInfo.name);
    setValue('nickname', userInfo.nickname);
    setValue('emailId', emailId);
    setValue('emailDomain', emailDomain);
    setValue('phoneNumber', userInfo.phoneNumber);
  }, [userInfo]);

  return (
    <form className='grid grid-cols-2 gap-x-[130px] gap-y-[20px]'>
      <div className='flex flex-col w-[390px] gap-[8px]'>
        <h3 className='text-headline2 font-semibold text-gray-70'>이름</h3>
        <Input
          name='name'
          control={control}
          size='w-[314px] h-[55px]'
          disabled={!isEdit}
        />
      </div>
      <div className='flex flex-col w-[390px] gap-[8px]'>
        <h3 className='text-headline2 font-semibold text-gray-70'>강사명</h3>
        <Input
          name='nickname'
          control={control}
          size='w-[390px] h-[55px]'
          disabled={!isEdit}
        />
      </div>
      <div className='flex flex-col w-[390px] gap-[8px]'>
        <h3 className='text-headline2 font-semibold text-gray-70'>아이디</h3>
        <div className='flex items-center w-[390px] h-[55px] px-[20px] py-[15px] rounded-[10px] border border-gray-20 bg-gray-10'>
          <p className='text-headline1 font-normal text-label-assistive'>{userInfo?.username}</p>
        </div>
      </div>
      <div className='flex flex-col w-[390px] gap-[8px]'>
        <h3 className='text-headline2 font-semibold text-gray-70'>비밀번호</h3>
        <Input
          name='password'
          control={control}
          size='w-[390px] h-[55px]'
          disabled={!isEdit}
        />
      </div>
      <div className='flex flex-col w-[390px] col-span-2 gap-[8px]'>
        <h3 className='text-headline2 font-semibold text-gray-70'>연락처 1</h3>
        <Input
          name='phoneNumber'
          control={control}
          size='w-[314px] h-[55px]'
          disabled={!isEdit}
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
    </form>
  );
}
