// components/ui/create/CreateHeader.tsx
'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type CreateHeaderProps = {
  isModify: boolean;
  type: 'HOMEWORK' | 'NOTICE';
  draftNum?: string;
  contentId?: string;
  lectureId: string;
  onClickLoad: () => void;
  onClickDraft: () => void;
};

export default function CreateHeader({
  isModify,
  type,
  draftNum,
  contentId,
  lectureId,
  onClickLoad,
  onClickDraft,
}: CreateHeaderProps) {
  const title = type === 'HOMEWORK' ? '숙제 생성' : '공지 작성';
  const paramsType = type.toLowerCase();
  const searchParams = useSearchParams();
  const isDraft = searchParams.get('isdraft') ? true : false;

  return (
    <div className='w-full h-[50px] flex justify-between items-center'>
      <Link
        href={
          isModify && !isDraft
            ? `/lectures/${lectureId}/${paramsType}/detail?id=${contentId}`
            : `/lectures/${lectureId}/${paramsType}`
        }
        className='w-[136px] px-[5px] text-title3 font-bold flex items-center gap-[15px]'
      >
        <Image
          src='/assets/icons/left_arrow.png'
          width={24}
          height={24}
          alt='이전으로'
        />
        {title}
      </Link>
      <div className='flex gap-[10px]'>
        {(!isModify || type === 'NOTICE') && (
          <>
            <Button
              type='BUTTON_BASE_TYPE'
              size='w-[117px] h-[50px]'
              font='text-headline1 font-semibold'
              title='불러오기'
              isPurple={false}
              onClick={onClickLoad}
            />
            {!isModify && (
              <Button
                type='BUTTON_BASE_TYPE'
                size='w-[117px] h-[50px]'
                font='text-headline1 font-semibold'
                title='임시저장'
                isPurple={false}
                onClick={onClickDraft}
                htmlType='button'
                added={draftNum}
              />
            )}
          </>
        )}
        <Button
          type='BUTTON_BASE_TYPE'
          size='w-[102px] h-[50px]'
          font='text-headline1 font-semibold'
          title='등록하기'
          isPurple={true}
          isfilled={true}
        />
      </div>
    </div>
  );
}
