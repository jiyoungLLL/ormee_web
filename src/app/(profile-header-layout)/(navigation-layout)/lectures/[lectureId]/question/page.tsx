import QuestionContainer from '@/components/question/QuestionContainer';
import QuestionFilterButton from '@/components/question/QuestionFilterButton';
import QuestionFilterContextProvider from '@/components/question/QuestionFilterContextProvider';
import QuestionPageButton from '@/components/question/QuestionPageButton';

export default function QuestionPage() {
  return (
    <div className='flex flex-col max-w-[1018px] h-full'>
      <div className='flex items-center px-[5px] gap-[10px] mb-[20px]'>
        <img
          src='/assets/icons/sidenav/question_selected.png'
          alt='퀴즈 페이지'
          className='w-[28px] h-[28px]'
        />
        <h1 className='text-title3 font-bold'>질문</h1>
      </div>
      <QuestionFilterContextProvider>
        <div className='flex justify-between items-center mb-[12px]'>
          <div className='flex items-center gap-[10px]'>
            <QuestionFilterButton type='all' />
            <QuestionFilterButton type='unanswered' />
            <QuestionFilterButton type='answered' />
          </div>
          <QuestionPageButton />
        </div>
        <QuestionContainer />
      </QuestionFilterContextProvider>
    </div>
  );
}
