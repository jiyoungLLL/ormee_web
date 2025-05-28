import { useLectureId } from '@/hooks/queries/useLectureId';
import { MOCK_HOMEWORK } from '@/mock/homework';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

const FEEDBACK_TITLE: string[] = ['피드백을 기다리는 과제', '피드백 완료된 과제'];
const FEEDBACK_FILTER: string[] = ['yet', 'complete'];
const FEEDBACK_BADGE: string[][] = [
  ['피드백 미완료', 'bg-purple-15 text-purple-50'],
  ['피드백 완료', 'bg-gray-10 text-gray-60'],
];

const FEEDBACK = MOCK_HOMEWORK.data;

export default function Feedback() {
  const lectureNum = useLectureId();

  const renderFeedback = (title: string, index: number) => {
    const filteredFeedback = FEEDBACK_FILTER[index];
    const [badge, badgeStyle] = FEEDBACK_BADGE[index];
    const tempData = filteredFeedback === 'yet' ? FEEDBACK.openedAssignments : FEEDBACK.closedAssignments;

    return (
      <div className='flex flex-col gap-[20px]'>
        <div className='text-heading2 font-semibold'>{title}</div>
        <div className='flex flex-col gap-[5px]'>
          {tempData.map((data, index) => (
            <>
              <Link
                key={`${data.id}-${data.title}`}
                href={`/lectures/${lectureNum}/homework/feedback?id=${data.id}`}
                className='flex items-center gap-[10px] justify-between px-[10px] py-[20px]'
              >
                <div className={filteredFeedback === 'yet' ? 'flex gap-[20px]' : ''}>
                  {filteredFeedback === 'yet' && (
                    <div className='w-[49px] h-[49px] bg-accent-blue-5 rounded-[10px] flex justify-center items-center'>
                      <Image
                        src='/assets/icons/category-icon/homework.png'
                        width={24}
                        height={24}
                        alt='숙제 아이콘'
                      />
                    </div>
                  )}
                  <div className='flex flex-col gap-[5px]'>
                    <div
                      className={`${filteredFeedback === 'complete' && 'text-gray-60'} text-headline1 font-semibold`}
                    >
                      {data.title}
                    </div>
                    <div className='text-label text-gray-50'>
                      {data.openTime && data.dueTime
                        ? `${format(data.openTime, 'yyyy.MM.dd')} - ${format(data.dueTime, 'yyyy.MM.dd')}`
                        : ''}
                    </div>
                  </div>
                </div>
                <span
                  className={`${badgeStyle} w-fit h-fit rounded-[24px] px-[15px] py-[6px] text-headline2 font-semibold`}
                >
                  {badge}
                </span>
              </Link>

              {index !== tempData.length - 1 ? <div className='bg-gray-30 h-[1px] w-full'></div> : ''}
            </>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='bg-white max-h-[666px] overflow-auto rounded-[25px] px-[30px] py-[25px] flex flex-col gap-[40px]'>
      {FEEDBACK_TITLE.map((title, index) => (
        <div key={index}>{renderFeedback(title, index)}</div>
      ))}
    </div>
  );
}
