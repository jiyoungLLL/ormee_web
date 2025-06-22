import type { Meta, StoryObj } from '@storybook/react';
import ProblemInput from '@/components/quiz/ProblemInput';
import { useForm, FormProvider } from 'react-hook-form';
import { QuizFormValues } from '@/features/quiz/types/quiz.types';
import { Editor } from '@tiptap/react';

const meta: Meta<typeof ProblemInput> = {
  title: 'Quiz/ProblemInput',
  component: ProblemInput,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<QuizFormValues>({
        defaultValues: {
          problems: [
            {
              type: 'CHOICE',
              content: '',
              item: [
                { id: '1', text: '선택지 1' },
                { id: '2', text: '' },
              ],
              answerItemId: '',
            },
          ],
        },
      });

      return (
        <FormProvider {...methods}>
          <div className='w-[900px] mx-auto'>
            <Story />
          </div>
        </FormProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ProblemInput>;

export const Default: Story = {
  args: {
    problem: {
      id: '1',
      type: 'CHOICE',
      context: '',
      item: [
        { id: '1', text: '선택지 1' },
        { id: '2', text: '선택지 2' },
      ],
      answerItemId: '',
    } as any,
    index: 0,
    setEditor: (editor: Editor | null) => {},
  },
};

export const Active: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    store: {
      initialState: {
        activeProblemId: '',
      },
    },
  },
};
