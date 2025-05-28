import QuestionDetail from '@/components/question/detail/QuestionDetail';

export default function QuestionDetailPage() {
  return (
    <div className='flex flex-col gap-[28px] w-full h-full'>
      <div className='flex items-center gap-[15px] px-[5px]'>
        <img
          src='/assets/icons/left_arrow.png'
          className='w-[24px] h-[24px]'
          alt='질문 목록으로 돌아가기'
        />
        <h1 className='text-title3 font-bold'>질문</h1>
      </div>
      <div className='flex flex-col gap-[40px] w-full h-[710px] px-[30px] py-[20px] bg-white rounded-[20px]'>
        <QuestionDetail />
      </div>
    </div>
  );
}
