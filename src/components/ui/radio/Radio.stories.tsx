import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import Radio from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'UI/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: {
          radioGroup: '',
        },
      });
      return (
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Story />
          </form>
        </FormProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    htmlFor: 'default-radio',
    name: 'radioGroup',
    value: 'default',
  },
  render: (args) => {
    const { register } = useForm();
    return (
      <Radio
        {...args}
        register={register}
      />
    );
  },
};

export const Checked: Story = {
  args: {
    htmlFor: 'checked-radio',
    value: 'checked',
  },
  render: (args) => {
    const { register } = useForm({
      defaultValues: {
        radioGroup: 'checked',
      },
    });
    return (
      <Radio
        {...args}
        name='radioGroup'
        register={register}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    htmlFor: 'disabled-radio',
    name: 'radioGroup',
    value: 'disabled',
    disabled: true,
  },
  render: (args) => {
    const { register } = useForm();
    return (
      <Radio
        {...args}
        register={register}
      />
    );
  },
};

export const WithLabel: Story = {
  args: {
    htmlFor: 'label-radio',
    name: 'radioGroup',
    value: 'withLabel',
  },
  render: (args) => {
    const { register } = useForm();
    return (
      <Radio
        {...args}
        register={register}
      >
        <span className='ml-2 text-sm'>라디오 옵션</span>
      </Radio>
    );
  },
};

export const RadioGroup: Story = {
  render: () => {
    const { register } = useForm({
      defaultValues: {
        favoriteColor: 'blue',
      },
    });

    return (
      <div className='flex flex-col gap-2'>
        <Radio
          htmlFor='red'
          name='favoriteColor'
          value='red'
          register={register}
        >
          <span className='ml-2 text-sm'>빨간색</span>
        </Radio>
        <Radio
          htmlFor='blue'
          name='favoriteColor'
          value='blue'
          register={register}
        >
          <span className='ml-2 text-sm'>파란색</span>
        </Radio>
        <Radio
          htmlFor='green'
          name='favoriteColor'
          value='green'
          register={register}
        >
          <span className='ml-2 text-sm'>초록색</span>
        </Radio>
        <Radio
          htmlFor='disabled'
          name='favoriteColor'
          value='disabled'
          disabled
          register={register}
        >
          <span className='ml-2 text-sm'>선택 불가능</span>
        </Radio>
      </div>
    );
  },
};
