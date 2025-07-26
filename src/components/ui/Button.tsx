import Image from 'next/image';

export type ButtonType = 'BUTTON_BASE_TYPE' | 'BUTTON_MODAL_TYPE' | 'BUTTON_CREATE_TYPE';
type HTMLButtonType = 'button' | 'submit';

type ButtonProps = {
  /** 버튼 사용처 */
  type: ButtonType;
  /** 버튼 가로세로 길이 */
  size: string;
  /** 버튼 폰트 스타일 */
  font: string;
  /** 내부 텍스트 */
  title: string;
  /** 색상 - 보라색 ? true : false */
  isPurple: boolean;
  /** bg 있/없 */
  isfilled?: boolean;
  /** shadow 있/없 */
  isShadow?: boolean;

  /** 배경 및 border 커스텀 */
  customStyle?: string;
  /** 임시저장 3 처럼 추가 텍스트 필요할 때*/
  added?: string;
  /** 버튼 설명 텍스트  */
  description?: string;
  /** 버튼 클릭 이벤트 */
  onClick?: () => void;
  /** html 버튼 타입 (button, submit) */
  htmlType?: HTMLButtonType;
  /** 버튼 비활성화 (기본 스타일 : 'bg-gray-30 text-label-assistive text-headline1 font-bold') */
  disabled?: boolean;
  /** 고정버튼인지 -> 기본 false */
  isPinned?: boolean;
  /** 고정버튼 아이콘 */
  pinImg?: string;
  /** 추가 아이콘 (QR)*/
  addImg?: string;
};

const whatBaseType = {
  BUTTON_BASE_TYPE: `py-[12px] px-[20px] rounded-[10px] gap-[4px]`,
  BUTTON_MODAL_TYPE: 'py-[12px] px-[20px] rounded-[10px] gap-[4px]',
  BUTTON_CREATE_TYPE: 'py-[12px] px-[20px] rounded-[10px] flex justify-center gap-[4px]',
} as const;

export default function Button({
  type,
  size,
  font,
  title,
  isPurple,
  isfilled,
  isShadow = true,
  customStyle,
  added,
  description,
  onClick,
  htmlType = 'submit',
  disabled,
  isPinned = false,
  pinImg,
  addImg,
}: ButtonProps) {
  const baseStyle = whatBaseType[type] ?? '';

  const whatBackgroundStyle: Record<ButtonType, string> = {
    BUTTON_BASE_TYPE: isfilled
      ? isPurple
        ? 'bg-purple-50 text-white'
        : 'bg-gray-20 text-gray-90'
      : isPurple
        ? 'text-purple-50'
        : '',
    BUTTON_MODAL_TYPE: isPurple ? 'bg-purple-50 text-white' : 'bg-gray-20 text-gray-60',
    BUTTON_CREATE_TYPE: 'bg-white text-purple-50',
  };
  const backgroundStyle = disabled ? 'bg-gray-30' : customStyle ? customStyle : whatBackgroundStyle[type];

  const whatBorderStyle: Record<ButtonType, string> = {
    BUTTON_BASE_TYPE: !isfilled ? (isPurple ? 'border border-purple-50' : 'border border-gray-30') : '',
    BUTTON_MODAL_TYPE: '',
    BUTTON_CREATE_TYPE: '',
  };
  const borderStyle = disabled ? '' : customStyle ? customStyle : whatBorderStyle[type];
  const shadowstyle =
    type === 'BUTTON_CREATE_TYPE' && isShadow === true
      ? 'shadow-[2px_4px_12.5px_rgba(114,96,248,0.4)] '
      : type === 'BUTTON_CREATE_TYPE' && isShadow === false
        ? 'border border-purple-50'
        : '';

  return (
    <button
      type={htmlType}
      onClick={onClick}
      className={`whitespace-nowrap ${size} ${baseStyle} ${disabled ? 'text-label-assistive text-headline1 font-bold' : font} ${(isPinned || addImg) && 'flex gap-[4px]'} ${backgroundStyle} ${borderStyle} ${shadowstyle}`}
      title={description}
    >
      {addImg && (
        <Image
          src={`/assets/icons/QR/${addImg}.png`}
          alt='QR 아이콘'
          width={24}
          height={24}
        />
      )}
      {isPinned && (
        <Image
          src={`/assets/icons/${pinImg}.png`}
          alt='고정 아이콘'
          width={24}
          height={24}
        />
      )}
      {type === 'BUTTON_CREATE_TYPE' ? (
        <Image
          src='/assets/icons/plus.png'
          alt='버튼 플러스 아이콘'
          width={24}
          height={24}
        />
      ) : (
        ''
      )}
      {title} {added ? <span className='text-purple-50'>{added}</span> : ''}
    </button>
  );
}
