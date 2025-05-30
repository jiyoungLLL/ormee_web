import { Question } from '@/features/question/question.types';
import QuestionItem from '@/components/question/QuestionItem';

type QuestionListProps = {
  questionList: Question[];
  error: Error | null;
};

export default function QuestionList({ questionList, error }: QuestionListProps) {
  return (
    <div className='flex flex-col w-full h-full'>
      <div className='grid grid-cols-[34px_360px_55px_68px_82px] justify-between items-center w-full h-[50px] py-[10px] border-b border-gray-30 text-headline2 font-semibold text-gray-70'>
        <span className=''>No.</span>
        <span className=''>제목</span>
        <span className=''>답변여부</span>
        <span className=''>작성자</span>
        <span className=''>등록일</span>
      </div>
      <div className='flex flex-col w-full h-full'>
        {error && (
          <div className='flex justify-center items-center w-full h-full text-headline2 font-semibold text-label-assistive'>
            질문 목록을 불러오는 중 오류가 발생했습니다.
          </div>
        )}
        {!error && questionList.length === 0 && (
          <div className='flex justify-center items-center w-full h-full text-headline2 font-semibold text-label-assistive'>
            등록된 질문이 없습니다.
          </div>
        )}
        {questionList.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
          />
        ))}
      </div>
    </div>
  );
}
