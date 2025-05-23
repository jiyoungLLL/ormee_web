type RadioIndicatorProps = {
  /** 선택된 상태 */
  isSelected?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 컨테이너에 적용될 스타일 */
  containerStyle?: string;
  /** 라디오 버튼과 함께 표시될 컴포넌트 */
  children?: React.ReactNode;
};

export default function RadioIndicator({
  isSelected = false,
  disabled = false,
  containerStyle,
  children,
}: RadioIndicatorProps) {
  return (
    <div className={`${containerStyle || 'flex items-center'}`}>
      <div
        className={`
          w-[20px] h-[20px] rounded-full 
          ${isSelected ? 'border-[6px] border-purple-50' : 'border-[1.6px] border-gray-30 bg-white'}
          ${disabled ? 'bg-gray-30' : ''}
        `}
      />
      {children}
    </div>
  );
}
