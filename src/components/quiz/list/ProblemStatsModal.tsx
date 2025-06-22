'use client';

import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import RadioIndicator from '@/components/ui/radio/RadioIndicator';
import { useGetProblemStats } from '@/features/quiz/hooks/useGetProblemStats';
import Image from 'next/image';

type ProblemStatsModalProps = {
  problemId: number;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ProblemStatsModal({ problemId, isOpen, onCancel, onConfirm }: ProblemStatsModalProps) {
  const { data: problemStats, error } = useGetProblemStats(problemId);

  if (error) {
    return (
      <Modal
        isOpen={isOpen}
        onCancel={onCancel}
        onConfirm={onConfirm}
        enableXButton
        enableCancelButton={false}
        enableConfirmButton={false}
        description={error.message}
      />
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onConfirm={onConfirm}
      enableXButton={true}
      enableCancelButton={false}
      enableConfirmButton={false}
      backgroundColor='bg-gray-90/10'
      containerStyle='w-[680px] h-fit p-[20px] rounded-[15px] box-border bg-white shadow-[3px_3px_14px_0px_rgba(0,0,0,0.1)]'
    >
      <div className='flex flex-col gap-[10px] w-full h-full'>
        {/* TODO: 몇번 문항인지 받아올 수 있도록 api 수정되면 문항 번호로 변경 */}
        <span className='text-headline1 font-bold text-purple-50 h-[25px]'>{'문항1'}</span>
        <p className='w-full px-[10px] text-body1-reading font-normal text-gray-90'>{problemStats?.content}</p>
        {problemStats?.type === 'ESSAY' && (
          <div className='flex gap-[5px]'>
            <Badge
              color='purple'
              size='small'
              label='정답'
            />
            <span className='text-headline2 font-semibold text-purple-50'>{problemStats?.answer}</span>
          </div>
        )}
        {problemStats?.type === 'ESSAY' && (
          <div className='w-full p-[10px] bg-gray-10 rounded-[10px]'>
            <table className='w-full'>
              <thead>
                <tr className='grid grid-cols-[71px_150px_55px] grid-rows-[20px] justify-items-center items-center gap-x-[30px]'>
                  <th className='text-label font-semibold text-gray-70 text-center'>순위</th>
                  <th className='text-label font-semibold text-gray-70 text-center'>응답</th>
                  <th className='text-label font-semibold text-gray-70 text-center'>오답 인원</th>
                </tr>
              </thead>
              <tbody className='block mt-[10px]'>
                {problemStats?.incorrectSubmit.map((submit, index) => (
                  <tr
                    key={`${problemId}-submit-${index}`}
                    className='grid grid-cols-[71px_150px_55px] grid-rows-[20px] justify-items-center items-center gap-x-[30px] mb-[10px] last:mb-0'
                  >
                    <td className='text-headline2 font-semibold text-gray-70 text-center'>{submit.rank}</td>
                    <td className='text-headline2 font-normal text-gray-90 text-center'>{submit.answer}</td>
                    <td className='text-headline2 font-normal text-gray-90 text-center'>{submit.incorrectStudents}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {problemStats?.type === 'CHOICE' && (
          <div className='flex flex-col gap-[9px] w-full px-[15px] py-[10px] bg-gray-10 rounded-[10px]'>
            {problemStats?.items.map((item) => (
              <div
                key={`${problemId}-item-${item.text}`}
                className='flex items-center gap-[18px]'
              >
                <RadioIndicator isSelected={item.isAnswer} />
                <div className='flex items-center gap-[10px]'>
                  <span
                    className={`${item.isAnswer ? 'text-purple-50 font-semibold' : 'font-normal text-gray-70'} text-headline2`}
                  >
                    {item.text}
                  </span>
                  {item.isAnswer && (
                    <Badge
                      color='purple'
                      size='small'
                      label='정답'
                    />
                  )}
                </div>
                <div className='flex items-center gap-[4px]'>
                  <Image
                    src='/assets/icons/person_filled.png'
                    alt='인원 수'
                    width={12}
                    height={12}
                  />
                  <span>{item.selectedStudents}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
