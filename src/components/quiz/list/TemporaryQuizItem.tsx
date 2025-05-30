import Button from '@/components/ui/Button';
import { Quiz } from '@/types/quiz.types';
import { formatDatetimeWithTime } from '@/utils/date/formatDate';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type TemporaryQuizItemProps = {
  quiz: Quiz;
  isLastQuiz: boolean;
};

export default function TemporaryQuizItem({ quiz, isLastQuiz }: TemporaryQuizItemProps) {
  const { id: quizId, title, limitTime, dueTime } = quiz;
  const formattedDueTime = formatDatetimeWithTime(dueTime);

  const pathname = usePathname();

  return (
    <div className='flex flex-col w-full gap-[5px]'>
      <div className='flex justify-between items-center px-[10px] py-[20px]'>
        <div className='flex flex-col gap-[5px]'>
          <h3 className='text-headline1 font-semibold'>{title}</h3>
          <p className='text-label font-semibold text-gray-50'>{formattedDueTime}</p>
        </div>

        <div className='flex items-center gap-[29px]'>
          <div className='flex items-center gap-[5px]'>
            <Image
              src='/assets/icons/timer.png'
              width={14}
              height={16.9}
              alt='응시 시간'
              draggable={false}
            />
            <span className='text-headline1 font-semibold'>{limitTime}</span>
          </div>
          <Link href={{ pathname: `${pathname}/create`, query: { type: 'edit', quizId } }}>
            <Button
              type='BUTTON_BASE_TYPE'
              size='w-fit h-[46px]'
              font='text-headline2 font-semibold'
              isPurple
              title='수정하기'
              htmlType='button'
            />
          </Link>
        </div>
      </div>
      {!isLastQuiz && <div className='w-full h-[1px] bg-gray-30' />}
    </div>
  );
}
