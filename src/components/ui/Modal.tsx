import useMounted from '@/hooks/useMounted';
import { createPortal } from 'react-dom';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import XIcon from '@/components/icon/XIcon';

type ModalProps = {
  /** 모달 내부에 표시될 컨텐츠 */
  children?: React.ReactNode;
  /** 모달의 표시 여부를 제어하는 boolean 값 */
  isOpen: boolean;
  /** 모달 취소 버튼 클릭 시 실행될 콜백 함수 */
  onCancel: () => void;
  /** 모달 확인 버튼 클릭 시 실행될 콜백 함수 */
  onConfirm: () => void;
  /** 모달 컨테이너에 적용할 추가 스타일 클래스 */
  containerStyle?: string;
  /** 모달의 제목 */
  title?: string;
  /** 모달의 설명 텍스트 */
  description?: string;
  /** 모달의 아이콘 이미지 경로 */
  iconSrc?: string;
  /** 모달의 배경색 */
  backgroundColor?: string;
  /** 취소버튼 사용 여부 */
  enableCancelButton?: boolean;
  /** 확인버튼 사용 여부 */
  enableConfirmButton?: boolean;
  /** x버튼 사용 여부 */
  enableXButton?: boolean;
};

export default function Modal({
  children,
  isOpen,
  onCancel,
  onConfirm,
  containerStyle,
  title,
  description,
  iconSrc,
  backgroundColor,
  enableCancelButton = true,
  enableConfirmButton = true,
  enableXButton = false,
}: ModalProps) {
  const isMounted = useMounted();

  if (!isOpen || !isMounted) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return createPortal(
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 ${backgroundColor || 'bg-gray-90/50'}`}
      data-testid='modal-backdrop'
      onClick={handleBackdropClick}
    >
      <div className={`bg-white rounded-[15px] px-[30px] py-[20px] select-none ${containerStyle}`}>
        {enableXButton && (
          <div className='flex justify-end w-full'>
            <button
              type='button'
              onClick={onCancel}
            >
              <XIcon
                size={18}
                color='bg-gray-40'
                useTailwind
              />
            </button>
          </div>
        )}
        {iconSrc && (
          <Image
            src={iconSrc}
            alt='modal-icon'
            width={28}
            height={28}
            className='mx-auto mb-[15px]'
          />
        )}
        <div className='flex flex-col w-full gap-[13px] mb-[35px]'>
          {title && <h2 className='text-heading1 font-semibold text-gray-90 text-center'>{title}</h2>}
          {description && <p className='text-headline2 font-normal text-gray-90 text-center'>{description}</p>}
        </div>
        {children}
        <div className='grid grid-cols-2 items-center w-[350px] h-[55px] gap-[14px] mx-auto'>
          {enableCancelButton && (
            <Button
              type='BUTTON_MODAL_TYPE'
              size='w-full h-[50px]'
              font='text-headline1 font-bold'
              isPurple={false}
              title='취소'
              onClick={onCancel}
            />
          )}
          {enableConfirmButton && (
            <Button
              type='BUTTON_MODAL_TYPE'
              size='w-full h-[50px]'
              font='text-headline1 font-bold'
              isPurple
              title='확인'
              onClick={onConfirm}
            />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
