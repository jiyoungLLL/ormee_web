'use client';

import Input from '@/components/ui/Input';
import { PhonePrefix, SignupFormValues, signupSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function SignUpPage() {
  const { control, handleSubmit } = useForm<SignupFormValues>({
    defaultValues: {
      id: '',
      password: '',
      passwordConfirm: '',
      primaryPhone: {
        prefix: PhonePrefix.MOBILE_010,
        number: '',
      },
      isVerifiedPrimaryPhone: false,
      secondaryPhone: {
        prefix: PhonePrefix.SEOUL,
        number: '',
      },
      emailId: '',
      emailDomain: '',
      name: '',
      englishName: '',
    },
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
  });

  return (
    <div className='w-[744.5px] h-full'>
      <div className='flex justify-start items-end gap-[17px]'>
        <h1 className='text-gray-90 text-[32px] font-bold leading-[44.8px] tracking-[-0.64px]'>회원가입</h1>
        <div className='flex justify-center items-center gap-[4px] py-[4px]'>
          <div className='w-[4px] h-[4px] rounded-full bg-purple-50' />
          <p className='text-body1-normal text-gray-60'>표시는 필수 사항입니다.</p>
        </div>
      </div>
      <div className='flex flex-col justify-start items-start self-stretch w-full h-full px-[30px] py-[20px] rounded-[20px] bg-white'>
        <form className='w-full'>
          <section className='w-full'>
            <h2 className='mb-[30px] px-[5px] text-title3 font-bold text-gray-90'>회원정보</h2>
            <div className='grid grid-cols-[140px_1fr] grid-rows-[50px_50px_50px_50px_50px_50px] gap-x-[12px] gap-y-[30px] items-start w-full'>
              <div className='flex items-start gap-[8px] py-[4px]'>
                <div className='top-0 left-[-12px] w-[6px] h-[6px] rounded-full bg-purple-50' />
                <label
                  className='text-gray-70 text-[18px] font-bold leading-[25.2px] tracking-[-0.36px]'
                  htmlFor='id'
                >
                  아이디
                </label>
              </div>
              <Input
                name='id'
                control={control}
                size='w-full h-full'
              />
              <div className='flex items-start gap-[8px] py-[4px]'>
                <div className='top-0 left-[-12px] w-[6px] h-[6px] rounded-full bg-purple-50' />
                <div className='flex flex-col justify-start items-start'>
                  <label
                    className='relative text-gray-70 text-[18px] font-bold leading-[25.2px] tracking-[-0.36px]'
                    htmlFor='password'
                  >
                    비밀번호
                  </label>
                  <span className='text-body2-normal text-gray-60 tracking-[-0.28px]'>특수문자 포함 8자 이상</span>
                </div>
              </div>
              <Input
                name='password'
                type='password'
                control={control}
                showPasswordToggle
                size='w-full h-full'
              />
              <div className='flex items-start gap-[8px] py-[4px]'>
                <div className='top-0 left-[-12px] w-[6px] h-[6px] rounded-full bg-purple-50' />
                <label
                  className='text-gray-70 text-[18px] font-bold leading-[25.2px] tracking-[-0.36px]'
                  htmlFor='passwordConfirm'
                >
                  비밀번호 확인
                </label>
              </div>
              <Input
                name='passwordConfirm'
                type='password'
                control={control}
                maxLength={20}
                showCharacterCount
                showPasswordToggle
                size='w-full h-full'
              />
            </div>
          </section>
          <section className='w-full'>
            <h2 className='mb-[30px] px-[5px] text-title3 font-bold text-gray-90'>추가정보</h2>
            <div className='grid grid-cols-[140px_1fr] grid-rows-[50px_50px] gap-x-[12px] gap-y-[30px] items-start w-full'>
              <div className='flex items-start gap-[8px] py-[4px]'>
                <div className='top-0 left-[-12px] w-[6px] h-[6px] rounded-full bg-purple-50' />
                <label
                  className='text-gray-70 text-[18px] font-bold leading-[25.2px] tracking-[-0.36px]'
                  htmlFor='name'
                >
                  이름
                </label>
              </div>
              <Input
                name='name'
                control={control}
                size='w-full h-full'
              />
              <div className='flex items-start gap-[8px] py-[4px]'>
                <div className='top-0 left-[-12px] w-[6px] h-[6px] rounded-full bg-purple-50' />
                <label
                  className='text-gray-70 text-[18px] font-bold leading-[25.2px] tracking-[-0.36px]'
                  htmlFor='englishName'
                >
                  영문명
                </label>
              </div>
              <Input
                name='englishName'
                control={control}
                size='w-full h-full'
              />
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
