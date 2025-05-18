import type { Meta, StoryObj } from '@storybook/react';
import ProblemInput from './ProblemInput';
import { useForm, FormProvider } from 'react-hook-form';
import { QuizFormValues } from '@/schemas/quiz.schema';
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
              type: 'choice',
              context: '',
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
      type: 'choice',
      context: '',
      item: [
        { id: '1', text: '선택지 1' },
        { id: '2', text: '선택지 2' },
      ],
      answerItemId: '',
    },
    index: 0,
    remove: () => {},
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
