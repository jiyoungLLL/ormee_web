import XIcon from '@/components/icon/XIcon';
import Button, { ButtonType } from '@/components/ui/Button';
import useMounted from '@/hooks/useMounted';
import Image from 'next/image';
import { createPortal } from 'react-dom';

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
  /** 모달 제목, 설명 컨테이너에 적용할 스타일 클래스 */
  titleContainerStyle?: string;
  /** 모달 제목 텍스트에 적용할 스타일 클래스 */
  titleTextStyle?: string;
  /** 모달 설명 텍스트에 적용할 스타일 클래스 */
  descriptionTextStyle?: string;
  /** 모달 버튼 컨테이너에 적용할 스타일 클래스 */
  buttonContainerStyle?: string;
  /** 취소 버튼 스타일 (Button 컴포넌트에 전달할 타입, 크기, 폰트, 색상, 텍스트)*/
  cancelButtonType?: {
    type?: ButtonType;
    size?: string;
    font?: string;
    isPurple?: boolean;
    isfilled?: boolean;
    title?: string;
  };
  /** 확인 버튼 스타일 */
  confirmButtonType?: {
    type?: ButtonType;
    size?: string;
    font?: string;
    isPurple?: boolean;
    isfilled?: boolean;
    title?: string;
  };
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
  /** x버튼, 아이콘 표시영역 스타일 */
  iconContainerStyle?: string;
};

const BASIC_CONTAINER_STYLE = 'relative bg-white rounded-[15px] px-[30px] py-[20px] select-none';
const BASIC_TITLE_STYLE = 'flex flex-col w-full gap-[13px] mb-[35px]';
const BASIC_TITLE_TEXT_STYLE = 'text-heading1 font-semibold text-gray-90 text-center';
const BASIC_DESCRIPTION_TEXT_STYLE = 'text-headline2 font-normal text-gray-90 text-center';

const BASIC_BUTTON_CONTAINER_STYLE = 'grid grid-cols-2 items-center w-[350px] h-[55px] gap-[14px] mx-auto';
const BASIC_BUTTON_STYLE = 'w-full h-[50px]';

export default function Modal({
  children,
  isOpen,
  onCancel,
  onConfirm,
  containerStyle,
  titleContainerStyle,
  titleTextStyle,
  descriptionTextStyle,
  buttonContainerStyle,
  cancelButtonType,
  confirmButtonType,
  title,
  description,
  iconSrc,
  backgroundColor,
  enableCancelButton = true,
  enableConfirmButton = true,
  enableXButton = false,
  iconContainerStyle,
}: ModalProps) {
  const isMounted = useMounted();

  if (!isOpen || !isMounted) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCancel();
  };

  const isTitleEnabled = title || description;
  const isButtonEnabled = enableCancelButton || enableConfirmButton;

  return createPortal(
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 ${backgroundColor || 'bg-gray-90/50'}`}
      data-testid='modal-backdrop'
      onClick={handleBackdropClick}
    >
      <div className={`${containerStyle || BASIC_CONTAINER_STYLE}`}>
        <div className={`${iconContainerStyle || ''}`}>
          {enableXButton && (
            <div className='flex justify-end w-full mb-[10px]'>
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
        </div>
        {isTitleEnabled && (
          <div className={`${titleContainerStyle || BASIC_TITLE_STYLE}`}>
            {title && <h2 className={`${titleTextStyle || BASIC_TITLE_TEXT_STYLE}`}>{title}</h2>}
            {description && <p className={`${descriptionTextStyle || BASIC_DESCRIPTION_TEXT_STYLE}`}>{description}</p>}
          </div>
        )}
        {children}
        {isButtonEnabled && (
          <div className={`${buttonContainerStyle || BASIC_BUTTON_CONTAINER_STYLE}`}>
            {enableCancelButton && (
              <Button
                type={cancelButtonType?.type || 'BUTTON_MODAL_TYPE'}
                size={`${cancelButtonType?.size || BASIC_BUTTON_STYLE}`}
                font={cancelButtonType?.font || 'text-headline1 font-bold'}
                isPurple={cancelButtonType?.isPurple || false}
                isfilled={cancelButtonType?.isfilled}
                title={cancelButtonType?.title || '취소'}
                onClick={onCancel}
              />
            )}
            {enableConfirmButton && (
              <Button
                type={confirmButtonType?.type || 'BUTTON_MODAL_TYPE'}
                size={`${confirmButtonType?.size || BASIC_BUTTON_STYLE}`}
                font={confirmButtonType?.font || 'text-headline1 font-bold'}
                isPurple={confirmButtonType?.isPurple || false}
                isfilled={confirmButtonType?.isfilled}
                title={confirmButtonType?.title || '확인'}
                onClick={onConfirm}
              />
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
