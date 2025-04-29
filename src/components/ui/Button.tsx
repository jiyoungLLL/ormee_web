type ButtonType = 'BUTTON_BASE_TYPE' | 'BUTTON_MODAL_TYPE' | 'BUTTON_CREATE_TYPE';

type ButtonProps = {
  /** 버튼 사용처 */
  type: ButtonType;
  /** 내부 텍스트 */
  title: string;
  /** 색상 - 보라색 ? true : false */
  isPurple: boolean;
  /** 버튼 클릭 이벤트 */
  onClicked: () => void;
  /** bg 있/없 */
  isfilled?: boolean;
  /** 퀴즈 생성처럼 버튼 내부 + 이미지 필요한 경우 경로 입력 */
  image?: string;
  /** 버튼 설명 텍스트  */
  description?: string;
};

const whatBaseType = {
  BUTTON_BASE_TYPE: 'h-[50px] w-[102px] py-[12px] px-[20px] rounded-[10px] gap-1',
  BUTTON_MODAL_TYPE: 'h-[50px] w-[162px] py-[12px] px-[20px] rounded-[10px] gap-1',
  BUTTON_CREATE_TYPE:
    'h-[49px] w-[133px] py-[12px] px-[20px] rounded-[10px] gap-1 shadow-[2px_4px_12.5px_rgba(114,96,248,0.4)]',
} as const;

export default function Button({ type, title, isPurple, onClicked, isfilled, image, description }: ButtonProps) {
  const baseStyle = whatBaseType[type] ?? '';
  const fontStyle = type == 'BUTTON_BASE_TYPE' ? 'text-headline1 font-semibold' : 'text-headline1 font-bold';

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
      onClick={onClicked}
      className={`${baseStyle} ${fontStyle} ${backgroundStyle} ${borderStyle}`}
      title={description}
    >
      {title}
    </button>
  );
}
