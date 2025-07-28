import XIcon from '@/components/icon/XIcon';
import { Feedback, feedbackSchema } from '@/features/homework/feedback.schema';
import { usePostFeedback } from '@/features/homework/hooks/useFeedback';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { useToastStore } from '@/stores/toastStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import RenderFeedback from './RenderFeedback';

const MOCK_FEEDBACK = {
  status: 'success',
  code: 200,
  data: [
    {
      homeworkSubmitId: 1,
      studentName: '김학생',
      isSubmitted: null,
      isChecked: false,
      isFeedback: false,
      createdAt: '2025-06-12T14:16:36.094638',
    },
    {
      homeworkSubmitId: 2,
      studentName: '이학생',
      isSubmitted: null,
      isChecked: true,
      isFeedback: true,
      createdAt: '2025-06-16T14:16:36.094638',
    },
    {
      homeworkSubmitId: 3,
      studentName: '박학생',
      isSubmitted: null,
      isChecked: false,
      isFeedback: false,
      createdAt: '2025-06-20T14:16:36.094638',
    },
  ],
};

const MOCK_SUBMIT = {
  status: 'success',
  code: 200,
  data: {
    name: '김학생',
    content: '과제 제출합니다.',
    filePaths: [],
    createdAt: '2025-06-12T14:16:36.094638',
  },
};

const STICKER = ['EXCELLENT', 'GOOD', 'OK', 'FIGHTING', 'IMPROVE'] as const;
type StickerType = (typeof STICKER)[number];

export default function Submissions() {
  const { addToast } = useToastStore();

  const [selectedHomeworkSubmitId, setSelectedHomeworkSubmitId] = useState<number>(
    MOCK_FEEDBACK.data[0].homeworkSubmitId,
  );
  const [emoji, setEmoji] = useState<boolean>(false);
  const [selectedSticker, setSelectedSticker] = useState<StickerType | null>(null);

  const lectureNum = useLectureId();
  const searchParams = useSearchParams();
  const assingmnetId = searchParams.get('id');
  const title = searchParams.get('title');

  const methods = useForm<Feedback>({
    resolver: zodResolver(feedbackSchema),
    mode: 'onSubmit',
    defaultValues: {
      content: undefined,
      stamp: undefined,
    },
  });

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const createFeedback = usePostFeedback(selectedHomeworkSubmitId);
  const onSubmit = (data: Feedback) => {
    createFeedback.mutate(data);
  };
  const onError = (errors: any) => {
    if (errors.content) {
      addToast({ message: errors.content.message, type: 'error' });
    }
  };

  // 스티커
  useEffect(() => {
    if (selectedSticker) {
      setValue('stamp', selectedSticker);
    } else {
      setValue('stamp', undefined);
    }
  }, [selectedSticker, setValue]);

  const stickerRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        stickerRef.current &&
        !stickerRef.current.contains(target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(target)
      ) {
        setEmoji(false);
      }
    };

    if (emoji) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emoji]);

  const handleStudentClick = (homeworkSubmitId: number) => {
    setSelectedHomeworkSubmitId(homeworkSubmitId);
  };

  return (
    <div className=''>
      <div className='flex gap-[20px] items-center justify-start'>
        <Link
          href={`/lectures/${lectureNum}/homework`}
          className='flex gap-[15px] px-[5px] items-center'
        >
          <Image
            src='/assets/icons/left_arrow.png'
            width={24}
            height={24}
            alt='뒤로가기 아이콘'
            className='w-[24px] h-[24px]'
          />
          <span className='text-title3 font-bold'>과제 피드백</span>
        </Link>
        <span className='text-headline1 font-semibold text-gray-70'>{title}</span>
      </div>
      <div className='absolute top-[129px] rounded-[20px] p-[20px] flex gap-[20px] bg-white'>
        {/* 좌측: 학생명 */}
        <div className='w-[180px] h-[726px] rounded-[20px] flex flex-col gap-[21px]'>
          <div>
            {/* <SearchInput
              name='searchStudent'
              control={control}
              size='w-fill h-[43px]'
              iconPosition='right'
            /> */}
          </div>
          <div className='flex flex-col'>
            {MOCK_FEEDBACK.data.map((student) => {
              if (student.studentName === '') return;

              return (
                <button
                  key={`${student.studentName}-${student.createdAt}`}
                  className={`flex gap-[8px] items-center text-start text-headline1 px-[12px] py-[10px] rounded-[10px] ${
                    student.homeworkSubmitId === selectedHomeworkSubmitId
                      ? 'bg-gray-10 text-purple-50 font-semibold'
                      : 'bg-white'
                  }`}
                  onClick={() => handleStudentClick(student.homeworkSubmitId)}
                >
                  {student.studentName}
                  {!student.isFeedback && (
                    <span className='w-[4px] h-[4px] bg-[#14DB6E] rounded-[50px] inline-block'></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {/* 우측: 제출 상세 */}
        <div className='w-[715px] h-[726px] rounded-[10px] pt-[30px] pb-[20px] px-[30px] bg-gray-10 flex flex-col gap-[20px]'>
          <div className='flex flex-col gap-[17px] w-fill overflow-y-auto '>
            <div className='flex gap-[17px] items-center'>
              <span className='text-headline1 font-semibold'>{MOCK_SUBMIT.data?.name}</span>
              <div className='flex gap-[5px] text-body2-normal text-gray-70'>
                <span>{MOCK_SUBMIT.data?.createdAt && format(MOCK_SUBMIT.data?.createdAt, 'yyyy.MM.dd')}</span>
                <span>{MOCK_SUBMIT.data?.createdAt && format(MOCK_SUBMIT.data?.createdAt, 'a h:mm')}</span>
              </div>
            </div>
            <div className='text-body1-reading'>{MOCK_SUBMIT.data.content}</div>
            <div className='flex justify-center w-full'>
              <Image
                src='https://static.cdn.soomgo.com/upload/portfolio/3fb583d6-6e4b-4495-893b-af8224ababbd.jpg?webp=1'
                width={500}
                height={497}
                alt='과제 이미지'
                className='rounded-[8px] w-full h-auto'
              />
            </div>
          </div>
          <div className='relative'>
            {selectedSticker === null && emoji && (
              <div
                ref={stickerRef}
                className='absolute bottom-[55px] z-10 w-[511px] h-[214px] py-[18px] rounded-[10px] border border-white bg-white flex items-center justify-center'
              >
                <div className='w-[471px] max-h-full overflow-y-auto'>
                  <div className='grid grid-cols-3 gap-x-[15px]'>
                    {STICKER.map((sticker, idx) => (
                      <button
                        key={`${idx}-${sticker}`}
                        className='w-[129px] h-[129px] flex-shrink-0'
                        onClick={() => {
                          setSelectedSticker(sticker);
                          setEmoji(false);
                        }}
                      >
                        <Image
                          src={`/assets/icons/feedback/${sticker}.png`}
                          width={129}
                          height={129}
                          alt={`${sticker} 스티커`}
                          className='w-full h-full object-contain'
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {selectedSticker && (
              <div
                ref={stickerRef}
                className='absolute bottom-[50px] z-10 w-[511px] h-[214px] py-[20px] px-[30px] rounded-[10px] border bg-black/70 flex items-center'
              >
                <div className='flex flex-col'>
                  <button
                    className='flex justify-end'
                    onClick={() => setSelectedSticker(null)}
                  >
                    <XIcon
                      size={18}
                      thickness={2}
                      color='bg-gray-10'
                      useTailwind={true}
                    />
                  </button>
                  <Image
                    src={`/assets/icons/feedback/${selectedSticker}.png`}
                    width={140}
                    height={140}
                    alt={`${selectedSticker} 스티커`}
                    className='object-contain'
                  />
                </div>
              </div>
            )}
            <FormProvider {...methods}>
              <form
                className=' flex gap-[8px] items-center'
                onSubmit={handleSubmit(onSubmit, onError)}
              >
                <div className='flex flex-col gap-[5px] flex-1'>
                  <Input
                    name='content'
                    control={control}
                    size='h-[50px]'
                  >
                    <button
                      ref={toggleBtnRef}
                      className='relative z-5 -right-[471px] top-[15px]'
                      onClick={() => {
                        selectedSticker === null
                          ? setEmoji((prev) => !prev)
                          : addToast({ message: '피드백 1개당 도장은 최대 1개까지 선택 가능해요.', type: 'error' });
                      }}
                      type='button'
                    >
                      <Image
                        src='/assets/icons/emoji.png'
                        width={24}
                        height={24}
                        alt='이모티콘 아이콘'
                      />
                    </button>
                  </Input>
                  <div className='text-label font-regular text-label-neutral'>특수문자 및 숫자 입력 불가</div>
                </div>

                <Button
                  type='BUTTON_BASE_TYPE'
                  title='피드백 남기기'
                  size='h-[50px]'
                  font='text-headline1 font-bold'
                  isPurple={true}
                  isfilled={true}
                />
              </form>
            </FormProvider>
          </div>
        </div>
        <RenderFeedback selectedHomeworkSubmitId={selectedHomeworkSubmitId} />
      </div>
    </div>
  );
}
