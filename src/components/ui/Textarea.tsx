'use client';

import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export type TextareaProps<T extends FieldValues> = {
  /** useForm에서 사용할 필드의 이름 */
  name: Path<T>;
  /** useForm에서 사용할 컨트롤러 */
  control: Control<T>;
  /** textarea 비활성화 여부 */
  disabled?: boolean;
  /** tailwind 스타일 크기 지정, w-full 가능 */
  size?: string;
  /** textarea 스타일 지정, 미지정시 기본 스타일 적용 */
  textareaStyle?: string;
  /** 텍스트 스타일 지정, 미지정시 기본 스타일 적용 */
  textStyle?: string;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 초기 표시할 줄 수 */
  rows?: number;
  /** 최대 글자 수, 제한 없는 경우 생략 */
  maxLength?: number;
  /** 글자 수 카운트 표시 여부 */
  showCharacterCount?: boolean;
  /** 자동 높이 조절 여부 */
  autoResize?: boolean;
  /** 최소 높이 (px) */
  minHeight?: number;
  /** 최대 높이 (px) */
  maxHeight?: number;
  /** 테스트용 아이디 */
  testId?: string;
  /** onChange 이벤트에 호출할 콜백함수 */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** onBlur 이벤트에 호출할 콜백함수 */
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** onFocus 이벤트에 호출할 콜백함수 */
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

export default function Textarea<T extends FieldValues>({
  name,
  control,
  size = 'w-full',
  disabled,
  maxLength,
  placeholder,
  rows = 1,
  textareaStyle = 'pl-[20px] py-[15px] rounded-[10px] border border-gray-20 focus:border-purple-50 focus:outline-none resize-none',
  textStyle = 'text-body-reading text-gray-90 placeholder:text-gray-50',
  showCharacterCount = false,
  autoResize = true,
  minHeight = 48,
  maxHeight,
  testId,
  onChange,
  onBlur,
  onFocus,
}: TextareaProps<T>) {
  const handleTextareaChange = (field: any, maxLength?: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;

    if (maxLength && value.length > maxLength) {
      value = value.slice(0, maxLength);
    }

    field.onChange(value);
    onChange?.(e);
  };

  const handleAutoResize = (textarea: HTMLTextAreaElement) => {
    if (!autoResize) return;

    textarea.style.height = 'auto';
    const newHeight = Math.max(minHeight, textarea.scrollHeight);
    const finalHeight = maxHeight ? Math.min(newHeight, maxHeight) : newHeight;
    textarea.style.height = `${finalHeight}px`;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={`relative ${size}`}>
          <textarea
            {...field}
            rows={rows}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`w-full ${showCharacterCount ? 'pr-[82px]' : 'pr-[20px]'} ${autoResize ? 'overflow-hidden' : ''} ${textareaStyle} ${textStyle} ${disabled ? 'bg-gray-10 text-label-assistive' : ''}`}
            style={{ minHeight: `${minHeight}px` }}
            onChange={handleTextareaChange(field, maxLength)}
            onInput={(e) => handleAutoResize(e.target as HTMLTextAreaElement)}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            data-testid={testId}
          />
          {showCharacterCount && (
            <div className='absolute top-1/2 -translate-y-1/2 right-[20px] text-headline1'>
              <span className='text-gray-70 font-semibold'>{field.value?.length || 0}</span>
              <span className='text-gray-50 font-regular'>/{maxLength}</span>
            </div>
          )}
        </div>
      )}
    />
  );
}
