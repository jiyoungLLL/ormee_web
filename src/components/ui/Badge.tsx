export type BadgeProps = {
  size: 'small' | 'medium';
  color: 'purple' | 'green' | 'blue' | 'orange' | 'gray';
  text: string;
};

const BADGE_STYLE: Record<BadgeProps['size'], string> = {
  small: 'h-[24px] text-label1',
  medium: 'h-[28px] text-headline1',
} as const;

const BADGE_COLOR: Record<BadgeProps['color'], string> = {
  purple: 'text-purple-50 bg-[#ece9ff]',
  green: 'text-yellowGreen-20 bg-yellowGreen-5',
  blue: 'text-blue-20 bg-blue-5',
  orange: 'text-redOrange-20 bg-redOrange-5',
  gray: 'text-gray-50 bg-gray-30',
} as const;

export default function Badge({ size, color, text }: BadgeProps) {
  return (
    <div
      className={`flex justify-center items-center rounded-[5px] w-fit px-[10px] py-[3px] font-semibold text-center ${BADGE_STYLE[size]} ${BADGE_COLOR[color]}`}
    >
      {text}
    </div>
  );
}
