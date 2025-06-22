/**
 * HTML 문자열을 안전하게 렌더링하는 컴포넌트
 * @param {string} html - 내부에 표시할 리치텍스트 HTML 문자열
 * @param {string} [className] - div 요소에 적용할 Tailwind CSS 클래스명
 */

type DangerouslySetInnerHTMLDivProps = {
  html: string | undefined;
  className?: string;
};

export default function DangerouslySetInnerHTMLDiv({ html, className }: DangerouslySetInnerHTMLDivProps) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html || '' }}
    />
  );
}
