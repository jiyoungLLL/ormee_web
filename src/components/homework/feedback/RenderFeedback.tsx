import Badge from '@/components/ui/Badge';
import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
  const menuRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      const isClickInsideAny = menuRef.current.some((ref) => ref?.contains(target));

      if (!isClickInsideAny) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuIndex]);

  if (!MOCK_FEEDBACKGET) return null;

  return (
    <div className='flex flex-col gap-[20px] w-[357px]'>
      {MOCK_FEEDBACKGET.data.map((feedback, index) => (
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
            <div
              ref={(el) => {
                menuRef.current[index] = el;
              }}
              className='relative'
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuIndex((prev) => (prev === index ? null : index));
                }}
              >
                <Image
                  src='/assets/icons/More.png'
                  width={24}
                  height={24}
                  alt='메뉴 아이콘'
                />
              </button>

              {openMenuIndex === index && (
                <div className='absolute z-5 -right-[130px] top-[10px] w-[119px] flex flex-col items-start bg-white gap-[5px] px-[4px] py-[6px] rounded-[5px] shadow-[0px_0px_7px_0px_rgba(70,_72,_84,_0.1)] text-headline2'>
                  <button
                    className='h-[40px] px-[10px] py-[5px]'
                    onClick={() => setOpenMenuIndex(null)}
                  >
                    수정하기
                  </button>
                  <button
                    className='h-[40px] px-[10px] py-[5px]'
                    onClick={() => setOpenMenuIndex(null)}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
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
