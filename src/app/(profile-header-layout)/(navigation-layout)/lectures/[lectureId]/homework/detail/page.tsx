'use client';

import RenderingDetails from '@/components/homework/RenderingDetails';
import Button from '@/components/ui/Button';
import DateTimePicker from '@/components/ui/DateTimePicker';
import { useDeleteHomework, useGetHomeworksDetail } from '@/features/homework/hooks/queries/useHomeworkApi';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { useBackRedirect } from '@/hooks/useBackRedirect';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function HomeworkDetail() {
  const router = useRouter();

  const lectureNum = useLectureId();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') as string;
  const homeworkFilter = searchParams.get('filter');

  const { data: detailData } = useGetHomeworksDetail(id);

  const deleteMutation = useDeleteHomework(lectureNum, '숙제가 삭제되었어요.');

  const handleDelete = () => {
    deleteMutation.mutate(id);
    router.push(`/lectures/${lectureNum}/homework`);
  };

  useBackRedirect(`/lectures/${lectureNum}/homework`);

  return (
    <div className='flex flex-col gap-[20px]'>
      <div className='flex gap-[10px] justify-end'>
        <Button
          type='BUTTON_BASE_TYPE'
          size='h-[50px]'
          font='text-healine1 font-semibold'
          title='삭제하기'
          isPurple={false}
          onClick={handleDelete}
        />
        {homeworkFilter !== 'done' && (
          <Link href={`/lectures/${lectureNum}/homework/create?id=${id}`}>
            <Button
              type='BUTTON_BASE_TYPE'
              size='h-[50px]'
              font='text-healine1 font-semibold'
              title='수정하기'
              isPurple={true}
              isfilled={false}
            />
          </Link>
        )}
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
        {detailData?.filePaths?.length !== 0 && detailData?.fileNames?.length !== 0 && (
          <div>
            {detailData?.filePaths?.map((files, index) => (
              <a
                key={files}
                href={files}
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
                <span>{detailData?.fileNames?.[index].replace(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+/, '')}</span>
              </a>
            ))}
          </div>
        )}

        <div className='h-[1px] bg-gray-30'></div>
        {detailData?.description && RenderingDetails(detailData?.description)}
      </div>
    </div>
  );
}
