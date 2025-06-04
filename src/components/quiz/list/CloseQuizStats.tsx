'use client';

import { useGetClosedQuizStats } from '@/features/quiz/hooks/useGetClosedQuizStats';
import { useModal } from '@/hooks/ui/useModal';
import ProblemStatsModal from '@/components/quiz/list/ProblemStatsModal';
import { useState } from 'react';
type CloseQuizStatsProps = {
  quizId: string;
};

export default function CloseQuizStats({ quizId }: CloseQuizStatsProps) {
  const { data: closedQuizStats, error } = useGetClosedQuizStats(quizId);
  const { isOpen, openModal, closeModal } = useModal({ defaultOpen: false });
  const [openProblemId, setOpenProblemId] = useState<string>('');

  const handleProblemStatsModal = (problemId: string) => {
    setOpenProblemId(problemId);
    openModal();
  };

  if (error)
    return (
      <div className='w-full px-[30px] py-[20px] rounded-[15px] bg-gray-10'>
        <p className='text-label font-semibold text-gray-70'>이 퀴즈의 통계를 불러올 수 없습니다.</p>
      </div>
    );

  return (
    <div className='w-full px-[30px] py-[20px] rounded-[15px] bg-gray-10'>
      <table className='w-full'>
        <thead>
          <tr className='grid grid-cols-[40px_89px_89px_89px] justify-items-center gap-x-[40px]'>
            <th className='text-label font-semibold text-gray-70 text-center'>순위</th>
            <th className='text-label font-semibold text-gray-70 text-center'>문항</th>
            <th className='text-label font-semibold text-gray-70 text-center'>오답 비율</th>
            <th className='text-label font-semibold text-gray-70 text-center'>오답 인원</th>
          </tr>
        </thead>
        <tbody className='block mt-[16px]'>
          {closedQuizStats?.map((stat) => (
            <tr
              key={stat.rank}
              className='grid grid-cols-[40px_89px_89px_89px] justify-items-center gap-x-[40px] mb-[16px] last:mb-0'
            >
              <td className='text-headline2 font-normal text-gray-70 text-center'>{stat.rank}</td>
              <td
                className='text-headline2 font-semibold text-purple-40 text-center underline decoration-solid decoration-auto underline-offset-[2px] cursor-pointer'
                onClick={() => handleProblemStatsModal(stat.problemId)}
              >
                {stat.problemLabel}
              </td>
              <td className='text-headline2 font-normal text-gray-90 text-center'>{stat.incorrectRate * 100}%</td>
              <td className='text-headline2 font-normal text-gray-90 text-center'>{stat.incorrectStudents}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && (
        <ProblemStatsModal
          isOpen={isOpen}
          onCancel={closeModal}
          onConfirm={closeModal}
          problemId={openProblemId}
        />
      )}
    </div>
  );
}
