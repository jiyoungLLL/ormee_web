/**
 * 리치텍스트에서 HTML 태그를 제거하고 순수 텍스트만 반환하는 함수
 * @param richText - HTML 태그가 포함된 리치텍스트 문자열
 * @returns 순수 텍스트만 추출된 문자열
 */
export const getPlainText = (richText: string): string => {
  // HTML 태그를 제거하기 위한 정규식
  const plainText = richText.replace(/<[^>]*>/g, '');

  // HTML 엔티티를 디코딩
  const decodedText = plainText
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

  return decodedText.trim();
};
