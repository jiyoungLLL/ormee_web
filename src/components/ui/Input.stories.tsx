import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import Input, { InputProps } from './Input';

type FormValues = {
  input: string;
};

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Template>;

const Template = (args: Omit<InputProps<FormValues>, 'control'>) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      input: '',
    },
  });

  return (
    <form>
      <Input
        {...args}
        control={control}
      />
    </form>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    name: 'input',
    size: 'w-[320px] h-[50px]',
    placeholder: '텍스트를 입력하세요',
  },
};

export const WithCharacterCount: Story = {
  render: Template,
  args: {
    name: 'input',
    size: 'w-[320px] h-[55px]',
    placeholder: '최대 20자까지 입력 가능합니다',
    maxLength: 20,
    showCharacterCount: true,
  },
};

export const Password: Story = {
  render: Template,
  args: {
    name: 'input',
    type: 'password',
    size: 'w-[320px] h-[55px]',
    placeholder: '비밀번호를 입력하세요',
    showPasswordToggle: true,
  },
};

export const FullFeatured: Story = {
  render: Template,
  args: {
    name: 'input',
    type: 'password',
    size: 'w-[320px] h-[55px]',
    placeholder: '비밀번호를 입력하세요',
    maxLength: 20,
    showCharacterCount: true,
    showPasswordToggle: true,
  },
};
