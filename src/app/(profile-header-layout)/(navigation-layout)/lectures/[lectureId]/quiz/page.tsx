import QuizListContainer from '@/components/quiz/list/QuizListContainer';

export default function QuizPage() {
  return (
    <div className='flex flex-col gap-[17px] max-w-[1018px] h-full'>
      <div className='flex items-center px-[5px] gap-[10px]'>
        <img
          src='/assets/icons/sidenav/quiz_selected.png'
          alt='퀴즈 페이지'
          className='w-[28px] h-[28px]'
        />
        <span className='text-title3 font-bold'>퀴즈</span>
      </div>
      <QuizListContainer />
    </div>
  );
}
