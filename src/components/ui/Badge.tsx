export type BadgeProps = {
  /** 배지 크기 */
  size: 'small' | 'medium';
  /** 배지 색상 */
  color: 'purple' | 'green' | 'blue' | 'orange' | 'gray';
  /** 배지에 표시될 텍스트 (라벨) */
  label: string | React.ReactNode;
};

const BADGE_STYLE: Record<BadgeProps['size'], string> = {
  small: 'h-[24px] px-[10px] py-[3px] text-label1',
  medium: 'px-[6px] py-[2px] text-headline1',
} as const;

const BADGE_COLOR: Record<BadgeProps['color'], string> = {
  purple: 'text-purple-50 bg-[#ece9ff]',
  green: 'text-accent-yellowGreen-20 bg-accent-yellowGreen-5',
  blue: 'text-accent-blue-20 bg-accent-blue-5',
  orange: 'text-accent-redOrange-20 bg-accent-redOrange-5',
  gray: 'text-gray-50 bg-gray-30',
} as const;

export default function Badge({ size, color, label }: BadgeProps) {
  return (
    <div
      className={`flex justify-center items-center rounded-[5px] w-fit font-semibold text-center ${BADGE_STYLE[size]} ${BADGE_COLOR[color]}`}
    >
      {label}
    </div>
  );
}
