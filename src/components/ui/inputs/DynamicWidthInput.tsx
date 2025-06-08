'use client';

import { useEffect, useRef, useState } from 'react';
import { Path, useFormContext, FieldValues } from 'react-hook-form';

/**
 * DynamicWidthInput 컴포넌트의 props 타입 정의
 * @template T - FormValues의 제네릭 타입
 * @property {Path<T>} name - react-hook-form에서 사용할 필드 이름
 * @property {string} placeholder - 입력 필드의 placeholder 텍스트
 * @property {string} [inputStyle] - 입력 필드에 적용할 tailwind 클래스
 * @property {number} [minWidth] - 입력 필드의 최소 너비 (기본값: 150px)
 * @property {number} [maxWidth] - 입력 필드의 최대 너비
 */
type DynamicWidthInputProps<T extends FieldValues> = {
  /** react-hook-form에서 사용할 필드 이름 */
  name: Path<T>;
  /** 입력 필드의 placeholder 텍스트 */
  placeholder: string;
  /** 입력 필드에 적용할 tailwind 클래스 */
  inputStyle?: string;
  /** 입력 필드의 최소 너비 (기본값: 150px) */
  minWidth?: number;
  /** 입력 필드의 최대 너비 */
  maxWidth?: number;
};

export default function DynamicWidthInput<T extends FieldValues>({
  name,
  placeholder,
  inputStyle,
  minWidth,
  maxWidth,
}: DynamicWidthInputProps<T>) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const { watch, register } = useFormContext<T>();
  const inputValue = watch(name);
  const [inputWidth, setInputWidth] = useState(minWidth || 150);

  useEffect(() => {
    if (spanRef.current) {
      const textWidth = spanRef.current.getBoundingClientRect().width;
      let calculatedWidth = maxWidth ? Math.min(textWidth + 15, maxWidth) : textWidth + 15;
      calculatedWidth = Math.max(calculatedWidth, minWidth || 150);

      setInputWidth(calculatedWidth);
    }
  }, [inputValue, minWidth, maxWidth]);

  return (
    <>
      <span
        ref={spanRef}
        className={`${inputStyle} absolute pointer-events-none opacity-0 whitespace-pre`}
      >
        {inputValue || placeholder}
      </span>
      <input
        {...register(name)}
        placeholder={placeholder}
        className={inputStyle}
        style={{ width: `${inputWidth}px` }}
      />
    </>
  );
}
