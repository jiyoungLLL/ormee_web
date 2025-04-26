type ButtonType = 'basic' | 'modal' | 'create';

type ButtonProps = {
  type: ButtonType;
  title: string;
  isPurple: boolean;
  onClicked: () => void;
  isfilled?: boolean;
  image?: string;
  description?: string;
};

export default function Button({ type, title, isPurple, onClicked, isfilled, image, description }: ButtonProps) {
  const whatBaseType = {
    basic: 'btn-basic',
    modal: 'btn-modal',
    create: 'btn-create',
  } as const;
  const baseStyle = whatBaseType[type] ?? '';

  const fontStyle = type == 'basic' ? 'text-headline1 font-semibold' : 'text-headline1 font-bold';

  const whatBackgroundStyle: Record<ButtonType, string> = {
    basic: isfilled
      ? isPurple
        ? 'bg-purple-50 text-white'
        : 'bg-gray-20 text-gray-90'
      : isPurple
        ? 'text-purple-50'
        : '',
    modal: isPurple ? 'bg-purple-50 text-white' : 'bg-gray-20 text-gray-60',
    create: 'bg-white text-purple-50',
  };
  const backgroundStyle = whatBackgroundStyle[type];

  const whatBorderStyle: Record<ButtonType, string> = {
    basic: !isfilled ? (isPurple ? 'border border-purple-50' : 'border border-gray-30') : '',
    modal: '',
    create: '',
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
