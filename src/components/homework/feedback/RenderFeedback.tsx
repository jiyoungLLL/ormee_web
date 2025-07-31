import Badge from '@/components/ui/Badge';
import { useDeleteFeedback, useGetFeedback } from '@/features/homework/hooks/useFeedback';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type FeedbackProps = {
  selectedHomeworkSubmitId: number;
};

export default function RenderFeedback({ selectedHomeworkSubmitId }: FeedbackProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const menuRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const { data: feedbackData } = useGetFeedback(selectedHomeworkSubmitId);

  const handlePutFeedbackId = (feedbackId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('feedbackId', feedbackId.toString());

    router.replace(`?${params.toString()}`);
  };

  const deleteFeedback = useDeleteFeedback(selectedHomeworkSubmitId);
  const handleDelete = (feedbackId: number) => {
    deleteFeedback.mutate(feedbackId);
  };

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

  if (!feedbackData || feedbackData.length === 0) return null;

  return (
    <div className='flex flex-col gap-[20px] w-[357px]'>
      {feedbackData?.map((feedback, index) => (
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
                    onClick={() => {
                      setOpenMenuIndex(null);
                      handlePutFeedbackId(feedback.id);
                    }}
                  >
                    수정하기
                  </button>
                  <button
                    className='h-[40px] px-[10px] py-[5px]'
                    onClick={() => {
                      setOpenMenuIndex(null);
                      handleDelete(feedback.id);
                    }}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-[10px]'>
            {feedback.content && <div className='h-[25px] text-body-reading'>{feedback.content}</div>}
            {feedback.stamp && (
              <Image
                src={`/assets/icons/feedback/${feedback.stamp}.png`}
                width={140}
                height={140}
                alt='스탬프'
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
