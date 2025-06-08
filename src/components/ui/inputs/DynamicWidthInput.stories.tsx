import type { Meta, StoryObj } from '@storybook/react';
import DynamicWidthInput from './DynamicWidthInput';
import { FormProvider, useForm } from 'react-hook-form';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      testField: '',
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};
const meta: Meta<typeof DynamicWidthInput> = {
  title: 'Components/Inputs/DynamicWidthInput',
  component: DynamicWidthInput,
  decorators: [
    (Story) => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
입력 필드의 너비를 입력된 값에 따라 동적으로 조절하는 컴포넌트입니다.

### 유의사항
- 컴포넌트 렌더링 시 깜빡임이 발생한다면 placeholder 길이에 비해 minWidth가 좁지 않은지 확인해주세요.
- placeholder 텍스트가 완전히 표시될 수 있도록 충분한 길이를 최소 너비로 확보해야 합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DynamicWidthInput>;

export const Default: Story = {
  args: {
    name: 'testField',
    placeholder: '입력해주세요.',
    minWidth: 200,
    maxWidth: 300,
    inputStyle:
      'h-[30px] text-body-reading text-gray-90 placeholder:text-gray-50 bg-transparent border border-gray-20 rounded-[10px] p-[10px]',
  },
};
