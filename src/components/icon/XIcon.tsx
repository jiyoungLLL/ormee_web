type XIconProps = {
  /** 아이콘 크기 (픽셀 단위) */
  size?: number;
  /** 선 두께 (픽셀 단위) */
  thickness?: number;
  /**
   * 선 색상 - CSS 색상값(hex, rgb 등) 또는 Tailwind 클래스명, 기본값 'black'
   * tailwind 클래스명 사용시 useTailwind 속성을 true로 설정
   * 예: "#FF0000" 또는 "bg-gray-30"
   */
  color?: string;
  /** Tailwind 클래스 사용 여부, 기본값 false */
  useTailwind?: boolean;
};

export default function XIcon({ size = 14, thickness = 1, color = 'black', useTailwind = false }: XIconProps) {
  const line1Style = useTailwind
    ? {
        position: 'absolute' as const,
        width: size,
        height: thickness,
        top: '50%',
        left: 0,
        transform: 'translateY(-50%) rotate(45deg)',
        transformOrigin: 'center',
        borderRadius: thickness / 2,
      }
    : {
        position: 'absolute' as const,
        width: size,
        height: thickness,
        backgroundColor: color,
        top: '50%',
        left: 0,
        transform: 'translateY(-50%) rotate(45deg)',
        transformOrigin: 'center',
        borderRadius: thickness / 2,
      };

  const line2Style = useTailwind
    ? {
        position: 'absolute' as const,
        width: size,
        height: thickness,
        top: '50%',
        left: 0,
        transform: 'translateY(-50%) rotate(-45deg)',
        transformOrigin: 'center',
        borderRadius: thickness / 2,
      }
    : {
        position: 'absolute' as const,
        width: size,
        height: thickness,
        backgroundColor: color,
        top: '50%',
        left: 0,
        transform: 'translateY(-50%) rotate(-45deg)',
        transformOrigin: 'center',
        borderRadius: thickness / 2,
      };

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div
        className={useTailwind ? color : ''}
        style={line1Style}
      />
      <div
        className={useTailwind ? color : ''}
        style={line2Style}
      />
    </div>
  );
}
