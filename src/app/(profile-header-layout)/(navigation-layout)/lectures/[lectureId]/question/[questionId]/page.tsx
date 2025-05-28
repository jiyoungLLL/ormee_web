import QuestionDetail from '@/components/question/detail/QuestionDetail';
import Link from 'next/link';

export default function QuestionDetailPage({
  params,
  searchParams,
}: {
  params: { lectureId: string; questionId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { lectureId } = params;

  const searchParamsString = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      searchParamsString.append(key, Array.isArray(value) ? value[0] : value);
    }
  });

  const queryString = searchParamsString.toString() ? `?${searchParamsString.toString()}` : '';

  return (
    <div className='flex flex-col gap-[28px] w-full h-full'>
      <Link
        href={`/lectures/${lectureId}/question${queryString}`}
        className='flex items-center gap-[15px] px-[5px]'
      >
        <img
          src='/assets/icons/left_arrow.png'
          className='w-[24px] h-[24px]'
          alt='질문 목록으로 돌아가기'
        />
        <h1 className='text-title3 font-bold'>질문</h1>
      </Link>
      <div className='flex flex-col gap-[40px] w-full h-[710px] px-[30px] py-[20px] bg-white rounded-[20px]'>
        <QuestionDetail />
      </div>
    </div>
  );
}
