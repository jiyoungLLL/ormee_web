import Image from 'next/image';
import Link from 'next/link';

const mokData: string[][] = [
  //   ['이거 어떻게 풀어요?', '2025.01.23'],
  //   ['설연휴 휴강으로 인한 보강은 언제인가요?', '2025.01.25'],
];

export default function RenderContents({ category }: { category: string }) {
  const added = category === '질문' ? 'qna' : 'notice';
  const isEmpty = mokData.length == 0;
  const emptyStyle = isEmpty ? 'justify-center items-center' : '';
  const emptyComment = category === '질문' ? '아직 올라온 질문이 없어요.' : '작성한 공지가 없어요.';

  return (
    <div className='w-full flex flex-col gap-[10px]'>
      <div className=' h-[28px] flex justify-between pr-[5px] pl-[8px]'>
        <div className='text-heading2 font-semibold'>{category}</div>
        <Link
          href={`/${added}`}
          className='text-headline2 font-semibold text-[16px] text-gray-50 flex gap-[4px] items-center'
        >
          더보기{' '}
          <Image
            src={'/assets/icons/right_arrow.png'}
            width={22}
            height={22}
            alt='더보기 아이콘'
          />
        </Link>
      </div>
      <div
        className={`w-full h-[140px] rounded-[20px] px-[30px] py-[20px] flex flex-col gap-[10px] bg-white ${emptyStyle}`}
      >
        {isEmpty ? (
          <div className='text-heading2 font-semibold text-[rgb(181_182_188)]'>{emptyComment}</div>
        ) : (
          mokData.map(([title, date], index) => (
            <div
              key={`${title}-${date}-${index}`}
              className='flex justify-between text-headline1'
            >
              <div>{title}</div>
              <div className='text-[rgb(126_127_142)]'>{date}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
