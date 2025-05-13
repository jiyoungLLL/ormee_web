'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import EmailInput from '@/components/ui/inputs/EmailInput';
import PhoneNumberInput from '@/components/ui/inputs/PhoneNumberInput';
import { PHONE_NUMBER_PREFIX, SignupFormValues, signupSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrors, useForm } from 'react-hook-form';

export default function SignUpPage() {
  const { control, handleSubmit, setValue } = useForm<SignupFormValues>({
    defaultValues: {
      id: '',
      password: '',
      passwordConfirm: '',
      primaryPhone: {
        prefix: PHONE_NUMBER_PREFIX.MOBILE_010,
        number: '',
      },
      isVerifiedPrimaryPhone: false,
      secondaryPhone: {
        prefix: PHONE_NUMBER_PREFIX.SEOUL,
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

  const handleSingnUp = (data: SignupFormValues) => {
    // TODO: 회원가입 요청 API 연동
    alert('test');
    alert(
      `회원가입 요청\n아이디: ${data.id}\n비밀번호: ${data.password}\n비밀번호 확인: ${data.passwordConfirm}\n연락처 1: ${data.primaryPhone.prefix}-${data.primaryPhone.number}\n번호인증: ${data.isVerifiedPrimaryPhone}\n연락처 2: ${data.secondaryPhone?.prefix}-${data.secondaryPhone?.number}\n이메일: ${data.emailId}@${data.emailDomain}\n이름: ${data.name}\n영문명: ${data.englishName}`,
    );
  };

  const handleSignupError = (errors: FieldErrors<SignupFormValues>) => {
    const errorFields = Object.entries(errors);

    if (errorFields.length > 0) {
      const [field, error] = errorFields[0];

      if (field === 'primaryPhone' || field === 'secondaryPhone') {
        const phoneError = error as any;
        if (phoneError.number) {
          alert(phoneError.number.message);
        } else if (phoneError.prefix) {
          alert(phoneError.prefix.message);
        }
      } else if (error.message) {
        alert(error.message);
      }
    }

    // TODO: 예상치 못한 에러처리
  };

  return (
    <div className='w-[744.5px] h-full mb-[87px]'>
      <div className='flex justify-start items-end gap-[17px] mb-[30px]'>
        <h1 className='text-gray-90 text-[32px] font-bold leading-[44.8px] tracking-[-0.64px]'>회원가입</h1>
        <div className='flex justify-center items-center gap-[4px] py-[4px]'>
          <div className='w-[4px] h-[4px] rounded-full bg-purple-50' />
          <p className='text-body1-normal text-gray-60'>표시는 필수 사항입니다.</p>
        </div>
      </div>
      <div className='flex flex-col justify-start items-start self-stretch w-full h-full px-[30px] py-[20px] mb-[20px] rounded-[20px] bg-white'>
        <form className='w-full'>
          <section className='w-full mb-[40px]'>
            <h2 className='mb-[30px] px-[5px] text-title3 font-bold text-gray-90'>회원정보</h2>
            <div className='grid grid-cols-[140px_1fr] gap-x-[12px] gap-y-[30px] items-start w-full'>
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
                size='w-full h-[50px]'
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
                size='w-full h-[50px]'
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
                size='w-full h-[50px]'
              />
              <div className='flex items-start gap-[8px] py-[4px]'>
                <div className='top-0 left-[-12px] w-[6px] h-[6px] rounded-full bg-purple-50' />
                <label
                  className='text-gray-70 text-[18px] font-bold leading-[25.2px] tracking-[-0.36px]'
                  htmlFor='passwordConfirm'
                >
                  연락처 1
                </label>
              </div>
              <PhoneNumberInput
                control={control}
                prefixName='primaryPhone.prefix'
                numberName='primaryPhone.number'
                verificationName='isVerifiedPrimaryPhone'
                setValue={setValue}
              />
              <div className='flex items-start gap-[8px] py-[4px]'>
                <label
                  className='text-gray-70 text-[18px] font-bold leading-[25.2px] tracking-[-0.36px]'
                  htmlFor='passwordConfirm'
                >
                  연락처 2
                </label>
              </div>
              <PhoneNumberInput
                control={control}
                prefixName='secondaryPhone.prefix'
                numberName='secondaryPhone.number'
              />
              <div className='flex items-start gap-[8px] py-[4px]'>
                <div className='top-0 left-[-12px] w-[6px] h-[6px] rounded-full bg-purple-50' />
                <label
                  className='text-gray-70 text-[18px] font-bold leading-[25.2px] tracking-[-0.36px]'
                  htmlFor='passwordConfirm'
                >
                  이메일
                </label>
              </div>
              <EmailInput
                control={control}
                idName='emailId'
                domainName='emailDomain'
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
      <Button
        type={'BUTTON_BASE_TYPE'}
        size='w-full h-[50px]'
        title={'회원가입 완료하기'}
        isPurple
        isfilled
        font='text-headline1 font-bold'
        onClick={handleSubmit(handleSingnUp, handleSignupError)}
      />
    </div>
  );
}
