import { Meta, StoryObj } from '@storybook/react';
import PhoneNumberInput from './PhoneNumberInput';
import { useForm } from 'react-hook-form';
import { PHONE_NUMBER_PREFIX } from '@/schemas/auth.schema';

const meta: Meta<typeof PhoneNumberInput> = {
  title: 'Components/Inputs/PhoneNumberInput',
  component: PhoneNumberInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhoneNumberInput>;

const PhoneNumberInputWrapper = (args: any) => {
  const { control, setValue } = useForm({
    defaultValues: {
      prefix: PHONE_NUMBER_PREFIX.MOBILE_010,
      number: args.number || '',
      verification: args.isVerified || false,
    },
  });

  return (
    <div className='w-[550px]'>
      <PhoneNumberInput
        control={control}
        prefixName='prefix'
        numberName='number'
        verificationName={args.verificationName}
        setValue={setValue}
        prefixInputSize={args.prefixInputSize}
        numberInputSize={args.numberInputSize}
        numberTestId={args.numberTestId}
      />
    </div>
  );
};

// 인증번호 발송 상태를 확인하기 위한 컴포넌트
const PhoneNumberInputWithSendState = () => {
  const { control, setValue } = useForm({
    defaultValues: {
      prefix: PHONE_NUMBER_PREFIX.MOBILE_010,
      number: '12345678',
      verification: false,
    },
  });

  // 스토리 표시 직후 인증번호 발송 상태로 모킹하기 위한 설정
  setTimeout(() => {
    const verificationButton = document.querySelector('button[title="인증번호 받기"]');
    if (verificationButton) {
      (verificationButton as HTMLButtonElement).click();
    }
  }, 100);

  return (
    <div className='w-[550px]'>
      <PhoneNumberInput
        control={control}
        prefixName='prefix'
        numberName='number'
        verificationName='verification'
        setValue={setValue}
      />
    </div>
  );
};

/** 기본 스타일 */
export const Default: Story = {
  render: () => <PhoneNumberInputWrapper />,
};

/** 번호 인증 옵션 활성화 */
export const WithVerification: Story = {
  render: () => <PhoneNumberInputWrapper verificationName='verification' />,
};

/** 인증번호 발송 상태 */
export const WithSendVerification: Story = {
  render: () => <PhoneNumberInputWithSendState />,
};

/** 인증번호 확인 상태 */
export const VerifiedState: Story = {
  render: () => (
    <PhoneNumberInputWrapper
      verificationName='verification'
      isVerified={true}
      number='12345678'
    />
  ),
};

/** 커스텀 사이즈 */
export const CustomSizes: Story = {
  render: () => (
    <PhoneNumberInputWrapper
      prefixInputSize='w-[100px] h-[40px]'
      numberInputSize='w-[200px] h-[40px]'
    />
  ),
};
