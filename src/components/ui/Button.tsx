import Image from 'next/image';

type ButtonType = 'BUTTON_BASE_TYPE' | 'BUTTON_MODAL_TYPE' | 'BUTTON_CREATE_TYPE';
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
  /** 버튼 설명 텍스트  */
  description?: string;
  /** 버튼 클릭 이벤트 */
  onClick?: () => void;
  /** html 버튼 타입 (button, submit) */
  htmlType?: HTMLButtonType;
};

const whatBaseType = {
  BUTTON_BASE_TYPE: 'py-[12px] px-[20px] rounded-[10px] gap-[4px]',
  BUTTON_MODAL_TYPE: 'py-[12px] px-[20px] rounded-[10px] gap-[4px]',
  BUTTON_CREATE_TYPE:
    'py-[12px] px-[20px] rounded-[10px] gap-1 shadow-[2px_4px_12.5px_rgba(114,96,248,0.4)] flex gap-[4px]',
} as const;

export default function Button({
  type,
  size,
  font,
  title,
  isPurple,
  isfilled,
  description,
  onClick,
  htmlType = 'submit',
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
  const backgroundStyle = whatBackgroundStyle[type];

  const whatBorderStyle: Record<ButtonType, string> = {
    BUTTON_BASE_TYPE: !isfilled ? (isPurple ? 'border border-purple-50' : 'border border-gray-30') : '',
    BUTTON_MODAL_TYPE: '',
    BUTTON_CREATE_TYPE: '',
  };
  const borderStyle = whatBorderStyle[type];

  return (
    <button
      type={htmlType}
      onClick={onClick}
      className={`whitespace-nowrap ${size} ${baseStyle} ${font} ${backgroundStyle} ${borderStyle}`}
      title={description}
    >
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

      {title}
    </button>
  );
}
