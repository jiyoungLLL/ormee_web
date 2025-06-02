'use client';

import Button from '@/components/ui/Button';
import DateTimePicker from '@/components/ui/DateTimePicker';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { useApiMutation } from '@/hooks/useApi';
import { MOCK_HOMEWORK } from '@/mock/homework';
import { useToastStore } from '@/stores/toastStore';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function HomeworkDetail() {
  const { addToast } = useToastStore();
  const lectureNum = useLectureId();
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') === 'ongoing' ? 'openedAssignments' : 'closedAssignments';
  const id = searchParams.get('id');
  // GET : 과제 목록 (진행중, 마감) 에서 받아온 데이터로 변경하기
  const detailData = MOCK_HOMEWORK.data[filter].find((item) => item.id === Number(id));

  const deleteMutation = useApiMutation<unknown, any>(
    'DELETE',
    `/teachers/assignments/${id}`,
    () => addToast({ message: '과제가 삭제되었어요', type: 'success', duration: 2500 }),
    [QUERY_KEYS.homeworkList(lectureNum)],
    (err) => {
      addToast({ message: '과제가 삭제되지 않았어요. 다시 시도해주세요.', type: 'error', duration: 2500 });
      console.log(err);
    },
  );

  const handleDelete = () => {
    deleteMutation.mutate(undefined);
  };

  return (
    <div className='flex flex-col gap-[20px]'>
      <div className='flex gap-[10px] justify-end'>
        <Link href={`/lectures/${lectureNum}/homework/create?filter=${searchParams.get('filter')}&id=${id}`}>
          <Button
            type='BUTTON_BASE_TYPE'
            size='h-[50px]'
            font='text-healine1 font-semibold'
            title='수정하기'
            isPurple={true}
            isfilled={false}
          />
        </Link>
        <Button
          type='BUTTON_BASE_TYPE'
          size='h-[50px]'
          font='text-healine1 font-semibold'
          title='삭제하기'
          isPurple={false}
          onClick={handleDelete}
        />
      </div>
      <div className='bg-white p-[30px] flex flex-col gap-[20px] rounded-[20px]'>
        <div className='flex justify-between items-center'>
          <span className='pl-[10px] text-heading2 font-semibold'>{detailData?.title}</span>
          <DateTimePicker
            type='CALENDAR'
            placeholder={detailData?.dueTime ? format(new Date(detailData.dueTime), 'yy.MM.dd') : ''}
            disabled={true}
            customComponentSize='px-[10px] py-[5px] gap-[10px]'
            customImageSize='w-[20px] h-[20px]'
            customTextStyle='text-[16px] text-headline2 font-semibold'
          />
        </div>
        {detailData?.filePaths && (
          <a
            href={detailData.filePaths}
            download
            target='_blank'
            rel='noopener noreferrer'
            className='flex w-fit h-fit rounded-[18px] border border-gray-30 px-[16px] py-[4px] gap-[5px] bg-gray-10 text-body-reading text-purple-50 items-center'
          >
            <Image
              src='/assets/icons/file.png'
              width={24}
              height={24}
              alt='파일 아이콘'
            />
            <span>{detailData.filePaths.split('/').pop()}</span>
          </a>
        )}

        <div className='h-[1px] bg-gray-30'></div>
        <div className='text-body1-reading min-h-[422px] overflow-auto'>{detailData?.description}</div>
      </div>
    </div>
  );
}
