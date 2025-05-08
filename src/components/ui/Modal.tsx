import { createPortal } from 'react-dom';

type ModalProps = {
  /** 모달 내부에 표시될 컨텐츠 */
  children: React.ReactNode;
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
};

export default function Modal({
  children,
  isOpen,
  onCancel,
  onConfirm,
  containerStyle,
  title,
  description,
}: ModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return createPortal(
    <div
      className='fixed inset-0 bg-gray-90/50 flex justify-center items-center z-50'
      onClick={handleBackdropClick}
    >
      <div className={`bg-white rounded-[15px] px-[30px] py-[20px] select-none ${containerStyle}`}>
        <div className='flex flex-col w-full gap-[13px]'>
          {title && <h2 className='text-heading1 font-semibold text-gray-90 text-center'>{title}</h2>}
          {description && <p className='text-headline2 font-normal text-gray-90 text-center'>{description}</p>}
        </div>
        {children}
        <div className='grid grid-cols-2 items-center w-[350px] h-[55px] gap-[14px]'>
          {/* TODO: 지영님 버튼 컴포넌트 추가 후 버튼 변경  */}
          <button
            onClick={onCancel}
            className='w-full h-[50px] px-[20px] py-[12px] rounded-[10px] bg-gray-20 text-headline1 font-bold text-gray-60'
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className='w-full h-[50px] px-[20px] py-[12px] rounded-[10px] bg-purple-50 text-headline1 font-bold text-white'
          >
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
