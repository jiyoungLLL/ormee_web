import { useDeleteHomework, useGetDraftHomeworks } from '@/features/homework/hooks/queries/useHomeworkApi';
import { useDeleteNotice, useGetDraftNotice } from '@/features/notice/useNoticeApi';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '../Button';
import Modal from '../Modal';

type DraftType = 'HOMEWORK' | 'NOTICE' | 'QUIZ';

type DraftProps = {
  type: DraftType;
  isOpen: boolean;
  /** 임시저장 버튼 클릭시 서버로 요청보낼 함수 */
  onSaveDraft: () => void;
  closeModal: () => void;
};

export default function Draft({ type, isOpen, closeModal, onSaveDraft }: DraftProps) {
  const router = useRouter();
  const lectureId = useLectureId();

  // 쪽지 작성 url 수정해주세요!!!
  const redirectUrl =
    type === 'HOMEWORK'
      ? `/lectures/${lectureId}/homework/create?`
      : type === 'NOTICE'
        ? `/lectures/${lectureId}/notice/create?`
        : '';

  const { data: homeworkDraftData } = useGetDraftHomeworks(lectureId);
  const { data: noticeDraftData } = useGetDraftNotice(lectureId);
  const data = type === 'HOMEWORK' ? homeworkDraftData : noticeDraftData;

  const category = type === 'HOMEWORK' ? '숙제' : type === 'NOTICE' ? '공지' : '퀴즈';
  const modalDescription = `임시저장된 ${category}는 30일간 보관돼요.`;

  // 삭제 (퀴즈 추가 필요)
  const deleteHomeworkMutation = useDeleteHomework(lectureId, '임시저장된 숙제가 삭제되었어요.');
  const deleteNoticeMutation = useDeleteNotice(lectureId, '임시저장된 공지가 삭제되었어요.');
  const deleteMutation = type === 'HOMEWORK' ? deleteHomeworkMutation : deleteNoticeMutation;

  const deleteDraft = (id: number) => {
    deleteMutation.mutate(id.toString());
  };

  const handleConfirm = () => {
    if (process.env.NODE_ENV === 'development') console.log('모달 확인창');
  };

  const handleWriteDraft = (draftId: string) => {
    router.push(`${redirectUrl}id=${draftId}&isdraft=true`);
    closeModal();
  };

  return (
    <div className='relative'>
      <Modal
        isOpen={isOpen}
        onCancel={closeModal}
        onConfirm={handleConfirm}
        title='임시저장'
        description={modalDescription}
        containerStyle='w-[532px] h-[688px] flex flex-col px-[40px] py-[30px] bg-white rounded-[15px]'
        descriptionTextStyle='text-body2-normal text-label-neutral text-center'
        enableXButton={true}
        enableCancelButton={false}
        enableConfirmButton={false}
        iconContainerStyle='absolute top-[20px] right-[30px]'
      >
        <div className='flex gap-[10px] flex-col mb-auto'>
          <div className='text-headline2 text-gray-70 font-semibold flex justify-between pb-[10px] border-b border-b-gray-30'>
            <div className='w-[300px]'>제목</div>
            <div className='pr-[64px]'>임시저장일</div>
          </div>
          {Array.isArray(data) &&
            data?.map((item) => {
              const title = item.title;

              const time =
                type === 'HOMEWORK' && 'openTime' in item
                  ? item.openTime
                  : type === 'NOTICE' && 'postDate' in item
                    ? item.postDate
                    : type === 'QUIZ' && 'quizDate' in item
                      ? item.quizDate
                      : '';

              return (
                <div
                  key={item.id}
                  className='flex gap-[40px] h-[50px] justify-between items-center text-body-reading hover:cursor-pointer'
                >
                  <div
                    className='flex gap-[40px] flex-1 hover:opacity-50'
                    onClick={() => handleWriteDraft(item.id.toString())}
                  >
                    <div className='flex-1'>{title}</div>
                    <div className='w-[76px] whitespace-nowrap'>
                      {typeof time == 'string' && format(time, 'yy-MM-dd')}
                    </div>
                  </div>
                  <Image
                    src='/assets/icons/trash.png'
                    width={24}
                    height={24}
                    alt='지우기 아이콘'
                    className='cursor-pointer'
                    onClick={() => deleteDraft(item.id)}
                  />
                </div>
              );
            })}
          <Button
            type='BUTTON_CREATE_TYPE'
            size='h-[50px]'
            font='text-headline1 text-purple-50 font-bold'
            title='임시저장하기'
            isPurple={true}
            isfilled={false}
            isShadow={false}
            htmlType='button'
            onClick={onSaveDraft}
          />
        </div>
      </Modal>
    </div>
  );
}
