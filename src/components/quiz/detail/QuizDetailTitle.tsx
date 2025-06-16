import DangerouslySetInnerHTMLDiv from '@/components/commons/DangerouslySetInnerHTMLDiv';
import { QUIZ_LIMIT_TIME_MAP_TO_RENDER } from '@/features/quiz/quiz.constants';
import { QuizDetailResponse } from '@/features/quiz/types/quizDetail.types';
import { formatDatetimeToYYMMDD } from '@/utils/date/formatDate';
import { getPlainText } from '@/utils/getPlainText';

type QuizDetailTitleProps = {
  quizDetail: QuizDetailResponse;
};

export default function QuizDetailTitle({ quizDetail }: QuizDetailTitleProps) {
  const { title, description, dueTime, timeLimit } = quizDetail;
  const openDate = '2025-06-11T15:00:00'; // TODO: api 수정 후 교체
  const formattedOpenDate = formatDatetimeToYYMMDD(openDate);
  const formattedDueDate = formatDatetimeToYYMMDD(dueTime);
  const formattedLimitTime = QUIZ_LIMIT_TIME_MAP_TO_RENDER[timeLimit as keyof typeof QUIZ_LIMIT_TIME_MAP_TO_RENDER];
  const isDescriptionEmpty = !description || getPlainText(description).trim() === '';

  return (
    <div className='flex flex-col gap-[10px] rounded-[10px] w-full px-[30px] py-[20px] bg-white'>
      <DangerouslySetInnerHTMLDiv
        html={title}
        className='p-[10px] text-heading2 font-semibold'
      />
      {/* 시간 표시 영역 */}
      <div className='flex items-center gap-[17px]'>
        <div className='flex items-center gap-[10px] w-fit px-[10px] py-[5px] rounded-[10px] bg-gray-10 text-headline2 font-semibold'>
          {/* 오픈-마감 시간 표시 */}
          <img
            src='/assets/icons/calendar.png'
            alt='응시 기한'
            className='w-[20px] h-[20px]'
          />
          <span>{formattedOpenDate}</span>
          <span>-</span>
          <span>{formattedDueDate}</span>
        </div>
        <div className='flex items-center gap-[10px] w-fit px-[10px] py-[5px] rounded-[5px] bg-gray-10 text-headline2 font-semibold'>
          {/* 제한시간 표시 */}
          <img
            src='/assets/icons/timer.png'
            className='w-[20px] h-[20px]'
            alt='제한 시간'
          />
          <span>{formattedLimitTime}</span>
        </div>
      </div>
      <DangerouslySetInnerHTMLDiv
        html={isDescriptionEmpty ? '설명' : description}
        className='w-full h-[50px] flex items-center px-[20px] py-[15px] rounded-[10px] bg-white border border-gray-20 text-body-reading font-normal text-gray-50'
      />
    </div>
  );
}
