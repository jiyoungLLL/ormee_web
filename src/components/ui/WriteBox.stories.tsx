import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import WriteBox from './WriteBox';

const meta = {
  title: 'Components/WriteBox',
  component: WriteBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: { contents: '' },
      });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
} satisfies Meta<typeof WriteBox>;

export default meta;
type Story = StoryObj<typeof WriteBox>;

export const Default: Story = {
  args: { type: '공지' },
};
