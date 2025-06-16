import DangerouslySetInnerHTMLDiv from '@/components/commons/DangerouslySetInnerHTMLDiv';
import Badge from '@/components/ui/Badge';
import RadioIndicator from '@/components/ui/radio/RadioIndicator';
import { ProblemResponse } from '@/features/quiz/types/quizDetail.types';
import Image from 'next/image';

type QuizDetailProblemProps = {
  problems: ProblemResponse[];
};

export default function QuizDetailProblem({ problems }: QuizDetailProblemProps) {
  const getAlphabet = (index: number) => {
    return String.fromCharCode(97 + index); // 97은 'a'의 ASCII 코드
  };

  const getIsAnswer = (problem: ProblemResponse, item: string) => {
    return problem.answer === item;
  };

  return (
    <>
      {problems.map((problem, index) => (
        <div
          key={`quiz-detail-problem-${problem.id}`}
          className='flex flex-col gap-[10px] w-full px-[30px] py-[20px] rounded-[10px] bg-white text-body-reading font-normal'
        >
          <div className='flex items-center gap-[5px] text-heading1 font-normal text-gray-50'>
            <span className='text-gray-90'>{index + 1}</span>
            <span>/</span>
            <span>{problems.length}</span>
          </div>
          <DangerouslySetInnerHTMLDiv
            html={problem.content}
            className='w-full px-[13px] py-[15px]'
          />
          {problem.filePaths.length > 0 && (
            <div>
              {problem.filePaths.map((filePath) => (
                <Image
                  src={filePath || ''}
                  alt='problem-file'
                  width={100}
                  height={100}
                />
              ))}
            </div>
          )}
          {/* 선지 + 정답 영역 */}
          <div className='flex flex-col gap-[10px] w-full px-[15px] py-[10px] rounded-[10px] bg-gray-10'>
            {problem.type === 'CHOICE' && (
              <>
                {problem.items.map((item, index) => {
                  const isAnswer = getIsAnswer(problem, item);

                  return (
                    <div
                      key={`choice-${item}`}
                      className={`flex items-center ${isAnswer ? 'text-purple-50 text-headline1 font-semibold' : ''}`}
                    >
                      <RadioIndicator isSelected={isAnswer} />
                      <span className='ml-[18px] mr-[10px]'>
                        {getAlphabet(index)}. {item}
                      </span>
                      {isAnswer && (
                        <Badge
                          size='small'
                          color='purple'
                          label='정답'
                        />
                      )}
                    </div>
                  );
                })}
              </>
            )}
            {problem.type === 'ESSAY' && (
              <div className='flex flex-col gap-[10px] w-full px-[15px] py-[10px] rounded-[10px] bg-gray-10'>
                <div className='flex items-center gap-[10px]'>
                  <Badge
                    size='small'
                    color='purple'
                    label='정답'
                  />
                  <span className='text-headline1 font-semibold text-purple-50'>{problem.answer}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
