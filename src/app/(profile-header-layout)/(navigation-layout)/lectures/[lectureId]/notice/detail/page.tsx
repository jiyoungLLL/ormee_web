'use client';

import RenderingDetails from '@/components/homework/RenderingDetails';
import Button from '@/components/ui/Button';
import DateTimePicker from '@/components/ui/DateTimePicker';
import {
  useDeleteNotice,
  useGetNoticeDetails,
  useGetPinnedNotices,
  usePinNotice,
  useUnpinNotice,
} from '@/features/notice/useNoticeApi';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { useBackRedirect } from '@/hooks/useBackRedirect';
import { useToastStore } from '@/stores/toastStore';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function NoticeDetail() {
  const { addToast } = useToastStore();

  const router = useRouter();
  const lectureId = useLectureId();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page'));
  const noticeId = searchParams.get('id') as string;
  const paramsPin = searchParams.get('ispinned');
  const params = new URLSearchParams(searchParams.toString());

  const { data: detailNoticeData } = useGetNoticeDetails(noticeId);
  const { data: pinnedData } = useGetPinnedNotices(lectureId);

  const pinMutation = usePinNotice(lectureId, page, noticeId);
  const unpinMutation = useUnpinNotice(lectureId, page, noticeId);

  const handlePinned = () => {
    if (pinnedData?.length === 3) {
      addToast({ message: '공지는 최대 3개까지 고정 가능합니다.', type: 'error' });
    }

    if (paramsPin === 'true') {
      unpinMutation.mutate();
      params.set('ispinned', 'false');
    } else {
      pinMutation.mutate();
      params.set('ispinned', 'true');
    }
    router.replace(`?${params.toString()}`);
  };

  const deleteMutation = useDeleteNotice(lectureId, '공지가 삭제되었어요.');
  const handleDelete = () => {
    deleteMutation.mutate(noticeId);
    router.push(`/lectures/${lectureId}/notice`);
  };

  useBackRedirect(`/lectures/${lectureId}/notice?page=${page}`);

  return (
    <div className='flex flex-col gap-[8px]'>
      <div className='flex flex-col gap-[20px]'>
        <div className='flex justify-between'>
          <Button
            type='BUTTON_BASE_TYPE'
            size='h-50px'
            font='text-healine1 font-bold'
            title={paramsPin === 'true' ? '고정됨' : '고정하기'}
            isPurple={true}
            isfilled={paramsPin === 'true' ? true : false}
            onClick={handlePinned}
            isPinned={true}
            pinImg={paramsPin === 'true' ? 'whitePin' : 'purplePin'}
          />
          <div className='flex gap-[10px]'>
            <Button
              type='BUTTON_BASE_TYPE'
              size='h-[50px]'
              font='text-healine1 font-semibold'
              title='삭제하기'
              isPurple={false}
              onClick={handleDelete}
            />
            <Link href={`/lectures/${lectureId}/notice/create?id=${noticeId}`}>
              <Button
                type='BUTTON_BASE_TYPE'
                size='h-[50px]'
                font='text-healine1 font-semibold'
                title='수정하기'
                isPurple={true}
                isfilled={false}
              />
            </Link>
          </div>
        </div>
        <div className='bg-white p-[30px] flex flex-col gap-[20px] rounded-[20px]'>
          <div className='flex justify-between items-center'>
            <span className='pl-[10px] text-heading2 font-semibold'>{detailNoticeData?.title}</span>
            <DateTimePicker
              type='CALENDAR'
              placeholder={detailNoticeData?.postDate ? format(detailNoticeData?.postDate, 'yy.MM.dd') : ''}
              disabled={true}
              customComponentSize='px-[10px] py-[5px] gap-[10px]'
              customImageSize='w-[20px] h-[20px]'
              customTextStyle='text-[16px] text-headline2 font-semibold'
            />
          </div>
          {detailNoticeData?.filePaths?.length !== 0 && (
            <div>
              {detailNoticeData?.filePaths?.map((files, index) => (
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
                  <span>
                    {/* {detailNoticeData?.fileNames?.[index].replace(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+/, '')} */}
                  </span>
                </a>
              ))}
            </div>
          )}

          <div className='h-[1px] bg-gray-30'></div>
          {detailNoticeData?.description && RenderingDetails(detailNoticeData?.description)}
        </div>
      </div>

      <div className='h-[38px] w-fit bg-white px-[12px] py-[6px] flex gap-[4px] items-center rounded-[19px]'>
        <Image
          src={'/assets/icons/like.png'}
          alt='좋아요 아이콘'
          width={24}
          height={24}
        />
        <span className='text-headline1 font-semibold'>{detailNoticeData?.likes}</span>
      </div>
    </div>
  );
}
