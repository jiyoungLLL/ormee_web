import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import EmailInput from './EmailInput';
import React from 'react';

type FormValues = {
  emailId: string;
  emailDomain: string;
};

const EmailInputStory = (args: any) => {
  const form = useForm<FormValues>({
    defaultValues: {
      emailId: '',
      emailDomain: '',
    },
  });

  return (
    <EmailInput
      control={form.control}
      {...args}
    />
  );
};

const meta = {
  title: 'Components/Inputs/EmailInput',
  component: EmailInputStory,
  parameters: {
    layout: 'centered',
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 스타일 */
export const Default: Story = {
  args: {
    idName: 'emailId' as const,
    domainName: 'emailDomain' as const,
    idTestId: 'emailId',
    domainTestId: 'emailDomain',
  },
};

/** 커스텀 스타일 */
export const CustomStyle: Story = {
  args: {
    idName: 'emailId' as const,
    domainName: 'emailDomain' as const,
    idInputSize: 'w-[200px] h-[40px]',
    domainInputSize: 'w-[180px] h-[40px]',
    idInputStyle: 'bg-gray-10 border-2 border-purple-50 rounded-md',
    domainInputStyle: 'bg-gray-10 border-2 border-purple-50 rounded-md',
    idTextStyle: 'text-purple-70 font-bold',
    domainTextStyle: 'text-purple-70 font-bold',
    idTestId: 'customEmailId',
    domainTestId: 'customEmailDomain',
  },
};
