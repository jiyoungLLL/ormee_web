import Badge from '@/components/ui/Badge';
import { format } from 'date-fns';
import Image from 'next/image';

const MOCK_FEEDBACKGET = {
  status: 'success',
  code: 200,
  data: [
    {
      id: 2,
      stamp: 'GOOD',
      content: '잘했어요',
      createdAt: '2025-06-19T01:34:52.149867',
    },
    {
      id: 3,
      stamp: 'IMPROVE',
      content: '좀 더 꼼꼼하게 해보아요',
      createdAt: '2025-06-23T01:34:52.149867',
    },
  ],
};

type FeedbackProps = {
  selectedHomeworkSubmitId: number;
};

export default function RenderFeedback({ selectedHomeworkSubmitId }: FeedbackProps) {
  if (!MOCK_FEEDBACKGET) return null;

  return (
    <div className='flex flex-col gap-[20px] w-[357px]'>
      {MOCK_FEEDBACKGET.data.map((feedback) => (
        <div
          key={feedback.id}
          className='flex flex-col gap-[15px] rounded-[20px] px-[15px] py-[20px]'
        >
          <div className='flex rounded-[5px] justify-between'>
            <div className='flex gap-[10px] items-center'>
              <Badge
                size='medium'
                color='purple'
                label='피드백 완료'
              />
              <span className='text-body2-normal text-gray-70'>
                {feedback.createdAt && format(feedback.createdAt, 'yyyy.MM.dd')}
              </span>
            </div>
            <button>
              <Image
                src='/assets/icons/More.png'
                width={24}
                height={24}
                alt='메뉴 아이콘'
              />
            </button>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <div className='h-[25px] text-body-reading'>{feedback.content}</div>
            <Image
              src={`/assets/icons/feedback/${feedback.stamp}.png`}
              width={140}
              height={140}
              alt='스탬프'
            />
          </div>
        </div>
      ))}
    </div>
  );
}
