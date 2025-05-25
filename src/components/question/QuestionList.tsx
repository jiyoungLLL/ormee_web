import { Question } from '@/types/question.types';
import QuestionItem from '@/components/question/QuestionItem';

type QuestionListProps = {
  questionList: Question[];
};

export default function QuestionList({ questionList }: QuestionListProps) {
  return (
    <div className='flex flex-col w-full'>
      <div className='grid grid-cols-[34px_360px_55px_68px_82px] justify-between items-center w-full h-[50px] py-[10px] text-headline2 font-semibold text-gray-70'>
        <span className=''>No.</span>
        <span className=''>제목</span>
        <span className=''>답변여부</span>
        <span className=''>작성자</span>
        <span className=''>등록일</span>
      </div>
      <div className='w-full h-[1px] bg-gray-30' />
      <div className='flex flex-col w-full h-[474px] overflow-y-auto'>
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
