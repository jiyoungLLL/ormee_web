import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import PhoneNumberInput from './PhoneNumberInput';
import { Control, FieldValues, Path } from 'react-hook-form';

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

type PhoneFormValues = {
  phoneNumber: string;
  verification: boolean;
};

type PhoneNumberInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  verificationName: Path<T>;
  setValue?: (name: keyof T, value: any) => void;
  inputSize?: string;
  testId?: string;
  number?: string;
  isVerified?: boolean;
};

const PhoneNumberInputWrapper = (props: Partial<PhoneNumberInputProps<PhoneFormValues>>) => {
  const { control, setValue } = useForm<PhoneFormValues>({
    defaultValues: {
      phoneNumber: props.number || '',
      verification: props.isVerified || false,
    },
  });

  return (
    <div className='w-[550px]'>
      <PhoneNumberInput<PhoneFormValues>
        control={control}
        name='phoneNumber'
        verificationName='verification'
        setValue={setValue}
        {...props}
      />
    </div>
  );
};

// 인증번호 발송 상태를 확인하기 위한 컴포넌트
const PhoneNumberInputWithSendState = () => {
  const { control, setValue } = useForm<PhoneFormValues>({
    defaultValues: {
      phoneNumber: '',
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
      <PhoneNumberInput<PhoneFormValues>
        control={control}
        name='phoneNumber'
        verificationName='verification'
        setValue={setValue}
        testId='phone-number-input'
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
  render: () => <PhoneNumberInputWrapper inputSize='w-[200px] h-[40px]' />,
};
