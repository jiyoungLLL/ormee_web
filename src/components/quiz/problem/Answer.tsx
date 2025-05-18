import Badge from '@/components/ui/Badge';
import { QuizFormValues } from '@/schemas/quiz.schema';
import { useFormContext } from 'react-hook-form';

type AnswerProps = {
  problemIndex: number;
};

const INACTIVE_TEXT_STYLE = 'font-normal text-gray-60 decoration-gray-60';
const ACTIVE_TEXT_STYLE = 'font-semibold text-purple-40 decoration-purple-40';

export default function Answer({ problemIndex }: AnswerProps) {
  const { watch } = useFormContext<QuizFormValues>();
  const answerItemId = watch(`problems.${problemIndex}.answerItemId`);
  const item = watch(`problems.${problemIndex}.item`);

  const answerItem = answerItemId ? item.find((item) => item.id === answerItemId) : undefined;
  const isAnswerSelected = answerItem && answerItem?.text !== '';
  const filteredItemText = answerItem?.text.replace(/<p>|<\/p>/g, '') || '';

  return (
    <div className='flex items-center gap-[15px]'>
      <Badge
        label='정답'
        size='medium'
        color='purple'
      />
      <span
        className={`text-headline1 underline decoration-solid decoration-auto underline-offset-[2px] ${isAnswerSelected ? ACTIVE_TEXT_STYLE : INACTIVE_TEXT_STYLE}`}
      >
        {filteredItemText || '정답 선택'}
      </span>
    </div>
  );
}
