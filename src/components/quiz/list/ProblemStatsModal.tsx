'use client';

import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { useGetProblemStats } from '@/hooks/queries/quiz/useGetProblemStats';

type ProblemStatsModalProps = {
  problemId: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ProblemStatsModal({ problemId, isOpen, onCancel, onConfirm }: ProblemStatsModalProps) {
  const { data: problemStats } = useGetProblemStats(problemId);

  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onConfirm={onConfirm}
      enableXButton={true}
      enableCancelButton={false}
      enableConfirmButton={false}
      backgroundColor='bg-gray-90/10'
      containerStyle='w-[680px] min-h-[345px] h-fit p-[20px] rounded-[15px] box-border bg-white shadow-[3px_3px_14px_0px_rgba(0,0,0,0.1)]'
    >
      <div className='flex flex-col gap-[10px] w-full h-full'>
        <span className='text-headline1 font-bold text-purple-50 h-[25px]'>{problemStats?.problemLabel}</span>
        <p className='w-full px-[10px] text-body1-reading font-normal text-gray-90'>{problemStats?.description}</p>
        {problemStats?.type === 'essay' && (
          <div className='flex gap-[5px]'>
            <Badge
              color='purple'
              size='small'
              label='정답'
            />
            <span className='text-headline2 font-semibold text-purple-50'>{problemStats?.answer}</span>
          </div>
        )}
        {problemStats?.type === 'essay' && (
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
      </div>
    </Modal>
  );
}
