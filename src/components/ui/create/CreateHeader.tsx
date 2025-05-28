import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type CreateProps = {
  type: 'notice' | 'homework';
  params: string;
};

export default function CreateHeader({ type, params }: CreateProps) {
  const searchParams = useSearchParams();
  const isModify = !!searchParams.get('filter');
  const filter = searchParams.get('filter');
  const id = searchParams.get('id');

  return (
    <div className='w-full h-[50px] flex justify-between items-center'>
      <Link
        href={
          isModify && type === 'homework'
            ? `/lectures/${params}/${type}/detail?filter=${filter}&id=${id}`
            : `/lectures/${params}/${type}`
        }
        className='w-[136px] px-[5px] text-title3 font-bold flex items-center gap-[15px]'
      >
        <Image
          src='/assets/icons/left_arrow.png'
          width={24}
          height={24}
          alt='이전으로'
        />
        {type === 'notice' ? '공지 작성' : '숙제 생성'}
      </Link>
      <div className='flex gap-[10px]'>
        <Button
          type='BUTTON_BASE_TYPE'
          size='w-[117px] h-[50px]'
          font='text-headline1 font-semibold'
          title='임시저장'
          isPurple={false}
          added='3'
          htmlType='button'
        />
        <Button
          type='BUTTON_BASE_TYPE'
          size='w-[102px] h-[50px]'
          font='text-headline1 font-semibold'
          title='등록하기'
          isPurple={true}
        />
      </div>
    </div>
  );
}
