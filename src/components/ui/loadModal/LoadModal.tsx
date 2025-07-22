import XIcon from '@/components/icon/XIcon';
import { useGetLoadClass } from '@/features/class/hooks/queries/useClassApi';
import { HomeworkItems } from '@/features/homework/homework.types';
import { useLoadApi } from '@/features/load/useLoadApi';
import { NoticeLoad } from '@/features/notice/notice.types';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';

type QuizProps = {
  id: number;
  quizName: string;
  quizDate: string;
  tileLimit: number;
  quizAvailable: boolean;
  submitCount: number;
  totalCount: number;
};

type LoadModalProps = {
  /** 퀴즈, 숙제, 공지 */
  type: '퀴즈' | '숙제' | '공지';
  /** 모달의 표시 여부를 제어하는 boolean 값 */
  isOpen: boolean;
  /** 모달 취소 버튼 클릭 시 실행될 콜백 함수 */
  onCancel: () => void;
  /** 모달 확인 버튼 클릭 시 실행될 콜백 함수 */
  onConfirm: () => void;
  /** 불러오기 최종 확인 버튼 클릭 시 실행될 콜백 함수 (id 넘김) */
  onClick: (id: number) => void;
};

export default function LoadModal({ type, isOpen, onCancel, onConfirm, onClick }: LoadModalProps) {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: lectureData } = useGetLoadClass();
  const [lectureId, setLectureId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (lectureData && lectureData.length > 0) {
      setLectureId(Number(lectureData[0].id));
    }
  }, [lectureData]);

  const handleLectureClicked = (id: number) => {
    setLectureId(id);
  };

  const { data: quizData } = useLoadApi<QuizProps[]>({ type: '퀴즈', lectureId: lectureId?.toString() });
  const { data: homeworkData } = useLoadApi<HomeworkItems[]>({ type: '숙제', lectureId: lectureId?.toString() });
  const { data: noticeData } = useLoadApi<NoticeLoad[]>({ type: '공지', lectureId: lectureId?.toString() });

  const detailData = type === '퀴즈' ? quizData : type === '숙제' ? homeworkData : noticeData;
  console.log('load 데이터', detailData);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCancel();
  };

  const handleOpenConfirm = (id: number) => {
    setSelectedId(id);
    setOpenConfirmModal(true);
  };

  const handleConfirm = () => {
    if (selectedId !== null) {
      onClick(selectedId);
      setOpenConfirmModal(false);
      setSelectedId(null);
      onCancel();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 bg-gray-90/50`}
      onClick={handleBackdropClick}
    >
      <div className='relative bg-white rounded-[15px] select-none h-[688px] overflow-y-auto flex'>
        <div className='border border-gray-30 w-[168px]'>
          {lectureData?.map((lecture) => {
            const isSelected = lecture.id === lectureId;

            return (
              <div
                key={lecture.id}
                className='px-[16px] py-[14px] border-[0.5px] border-gray-30 bg-gray-10 text-headline2'
                onClick={() => handleLectureClicked(lecture.id)}
              >
                <button
                  className={`w-[136px] h-[44px] flex items-center ${isSelected ? 'text-purple-50 font-semibold' : ''}`}
                >
                  {lecture.name}
                </button>
              </div>
            );
          })}
        </div>

        <div className='w-[532px] px-[30px] py-[20px] flex flex-col gap-[30px]'>
          <div className='flex'>
            <span className='flex-1 text-center text-heading1 font-semibold'>{type} 불러오기</span>
            <button onClick={onCancel}>
              <XIcon
                size={30}
                thickness={2.86}
                color='#696A7D'
              />
            </button>
          </div>

          {detailData?.length === 0 ? (
            <div className='flex justify-center items-center h-full'>
              <div className='text-heading2 text-[#B5B6BC] font-semibold text-center'>
                최근 3개월간 작성한 {type}가 없어요.
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-[10px]'>
              <div className='flex gap-[10px] py-[5px] text-gray-70 text-headline2 font-semibold'>
                <span className='w-[221px]'>제목</span>
                <span className='w-[140px]'>생성일</span>
              </div>
              <div className='w-full h-[1px] bg-gray-30'></div>
              <div className='flex flex-col'>
                {detailData?.map((item) => {
                  const title =
                    type === '퀴즈' ? (item as QuizProps).quizName : (item as HomeworkItems | NoticeLoad).title;

                  const date =
                    type === '퀴즈'
                      ? (item as QuizProps).quizDate
                      : type === '숙제'
                        ? (item as HomeworkItems).openTime
                        : (item as NoticeLoad).postDate;

                  const formatDate = date && format(date, 'yy-MM-dd');
                  return (
                    <div
                      key={item.id}
                      className='flex gap-[40px] py-[8px] items-center'
                    >
                      <div className='flex gap-[40px] text-body-reading'>
                        <span className='w-[221px]'>{title}</span>
                        <span className='w-[76px]'>{formatDate}</span>
                      </div>
                      <Button
                        type='BUTTON_BASE_TYPE'
                        size='h-[40px] leading-[15px]'
                        font='text-headline2 font-semibold'
                        title='불러오기'
                        isPurple={true}
                        isfilled={false}
                        onClick={() => handleOpenConfirm(item.id)}
                        htmlType='button'
                      />
                    </div>
                  );
                })}
                {openConfirmModal && (
                  <Modal
                    isOpen={openConfirmModal}
                    onCancel={() => {
                      setOpenConfirmModal(false);
                      setSelectedId(null);
                    }}
                    onConfirm={handleConfirm}
                    title={`${type}를 불러올까요?`}
                    iconSrc='/assets/icons/coloredFile.png'
                    description='지금 작성 중인 내용은 사라져요.'
                    confirmButtonType={{ isPurple: true }}
                  ></Modal>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
