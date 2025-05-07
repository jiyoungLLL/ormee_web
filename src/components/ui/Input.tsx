'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export type InputProps<T extends FieldValues> = {
  /** useForm에서 사용할 필드의 이름 */
  name: Path<T>;
  /** useForm에서 사용할 컨트롤러 */
  control: Control<T>;
  /** input 타입 */
  type?: 'text' | 'password' | 'email';
  /** tailwind 스타일 크기 지정, w-full, h-full 가능 */
  size: string;
  /** input 스타일 지정, 미지정시 기본 bg-white pl-[20px] py-[15px] border-[1px] border-gray-20 focus:border-[1px] focus:border-purple-50 focus:outline-none disabled:bg-gray-10 적용 */
  inputStyle?: string;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 최대 글자 수, 제한 없는 경우 생략 */
  maxLength?: number;
  /** 글자 수 카운트 표시 여부 */
  showCharacterCount?: boolean;
  /** 비밀번호 숨기기/보이기 토글 표시 여부 */
  showPasswordToggle?: boolean;
  /** Input 내부 추가 컴포넌트 */
  children?: React.ReactNode;
};

export default function Input<T extends FieldValues>({
  name,
  control,
  type = 'text',
  size,
  maxLength,
  placeholder,
  inputStyle = 'bg-white pl-[20px] py-[15px] border-[1px] border-gray-20 focus:border-[1px] focus:border-purple-50 focus:outline-none disabled:bg-gray-10',
  showCharacterCount = false,
  showPasswordToggle = false,
  children,
}: InputProps<T>) {
  const [inputType, setInputType] = useState(type);

  const handleTogglePassword = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const handleInputChange = (field: any, maxLength?: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (maxLength && value.length > maxLength) {
      value = value.slice(0, maxLength);
    }

    field.onChange(value);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={`relative ${size}`}>
          <input
            {...field}
            type={inputType}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`absolute w-full h-full ${showCharacterCount && showPasswordToggle && 'pr-[115px]'} ${showCharacterCount && !showPasswordToggle && 'pr-[82px]'} ${!showCharacterCount && showPasswordToggle && 'pr-[56px]'} ${!showCharacterCount && !showPasswordToggle && 'pr-[20px]'} ${inputStyle} rounded-[10px] text-body-reading text-gray-90 placeholder:text-gray-50`}
            onChange={handleInputChange(field, maxLength)}
          />
          <div
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              zIndex: 1,
            }}
          >
            {showCharacterCount && (
              <div className='flex flex-row gap-[1px] justify-between items-center text-headline1 text-gray-50'>
                <span className='text-gray-70 font-semibold'>{field.value?.length ?? 0}</span>
                <span className='text-gray-50 font-regular'>/{maxLength}</span>
              </div>
            )}
            {showPasswordToggle && (
              <button
                type='button'
                onClick={handleTogglePassword}
                className='w-[24px] h-[24px]'
              >
                <Image
                  src={inputType === 'password' ? '/assets/icons/password-hide.png' : '/assets/icons/password-show.png'}
                  alt='password-toggle'
                  width={24}
                  height={24}
                  draggable={false}
                />
              </button>
            )}
          </div>
          {children}
        </div>
      )}
    />
  );
}
