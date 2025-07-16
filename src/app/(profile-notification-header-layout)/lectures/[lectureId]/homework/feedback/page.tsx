'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import SearchInput from '@/components/ui/SearchInput';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const MOCK_FEEDBACK = {
  status: 'success',
  code: 200,
  data: [
    {
      name: '홍길동',
      content: '안녕하세요 3주차 과제 제출합니다! 이번주 과제는 좀 어렵네요..',
      filePaths: [],
      createdAt: '2025-05-25T01:01:08.045806',
    },
    {
      name: '홍길금',
      content: null,
      filePaths: [],
      createdAt: '2025-05-25T01:01:08.045806',
    },
    {
      name: '홍길은',
      content: null,
      filePaths: [],
      createdAt: '2025-05-25T01:01:08.045806',
    },
  ],
};

export default function HomeworkFeedback() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      searchStudent: '',
      feedback: '',
    },
  });

  const onSubmit = (data: { searchStudent: string }) => {
    // 검색 로직 실행
  };

  const lectureNum = useLectureId();
  const searchParams = useSearchParams();
  const assingmnetId = searchParams.get('id');
  const title = searchParams.get('title');

  const [selected, setSelected] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('filter', selected);
  }, [selected]);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <SearchInput
              name='searchStudent'
              control={control}
              size='w-fill h-[43px]'
              placeholder='학생 이름 검색'
              iconPosition='right'
            />
          </form>
          <button className='flex flex-col text-start '>
            {MOCK_FEEDBACK.data.map((data) => {
              return (
                <div
                  key={`${data.name}-${data.createdAt}`}
                  className={`text-headline1 px-[12px] py-[10px] rounded-[10px] bg-white`}
                >
                  {data.name}
                </div>
              );
            })}
          </button>
        </div>
        {/* 우측: 제출 상세 */}
        <div className='w-[715px] h-[726px] rounded-[10px] pt-[30px] pb-[20px] px-[30px] bg-gray-10 flex flex-col gap-[20px]'>
          <div className='flex flex-col gap-[17px] w-fill overflow-y-auto '>
            <div className='flex gap-[17px] items-center'>
              <span className='text-headline1 font-semibold'>{MOCK_FEEDBACK.data[0].name}</span>
              <div className='flex gap-[5px] text-body2-normal text-gray-70'>
                <span>{format(MOCK_FEEDBACK.data[0].createdAt, 'yyyy.MM.dd')}</span>
                <span>{format(MOCK_FEEDBACK.data[0].createdAt, 'a h:mm')}</span>
              </div>
            </div>
            <div className='text-body1-reading'>{MOCK_FEEDBACK.data[0].content}</div>
            <div className='flex justify-center'>
              <Image
                src='https://static.cdn.soomgo.com/upload/portfolio/3fb583d6-6e4b-4495-893b-af8224ababbd.jpg?webp=1'
                width={451}
                height={494}
                alt='과제 이미지'
                className='rounded-[8px]'
              />
            </div>
          </div>
          <div className='flex gap-[8px]'>
            <Input
              name='feedback'
              control={control}
              size='h-[50px] flex-1'
              placeholder='피드백을 입력해주세요'
            />
            <Button
              type='BUTTON_BASE_TYPE'
              title='피드백 남기기'
              size='h-[50px]'
              font='text-headline1 font-bold'
              isPurple={true}
              isfilled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
