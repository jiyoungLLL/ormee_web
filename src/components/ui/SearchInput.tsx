'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import Input from './Input';

export type SearchInputProps<T extends FieldValues> = {
  /** useForm에서 사용할 필드의 이름 */
  name: Path<T>;
  /** useForm에서 사용할 컨트롤러 */
  control: Control<T>;
  /** 플레이스홀더 */
  placeholder?: string;
  /** tailwind 스타일 크기 지정, w-full, h-full 가능 */
  size?: string;
  /** 검색 아이콘 위치 */
  iconPosition?: 'left' | 'right';
};

export default function SearchInput<T extends FieldValues>({
  name,
  control,
  placeholder,
  size = 'w-[350px] h-[46px]',
  iconPosition = 'left',
}: SearchInputProps<T>) {
  return (
    <Input
      name={name}
      control={control}
      size={size}
      placeholder={placeholder}
      inputStyle={`bg-transparent rounded-[10px] border border-gray-30 ${iconPosition === 'left' ? 'pl-[49px] pr-[15px]' : 'pr-[49px] pl-[15px]'} py-[9px]`}
      type='text'
    >
      <img
        src='/assets/icons/search.png'
        style={{
          position: 'absolute',
          width: '24px',
          height: '24px',
          top: '50%',
          left: iconPosition === 'left' ? '15px' : 'auto',
          right: iconPosition === 'right' ? '15px' : 'auto',
          transform: 'translateY(-50%)',
        }}
      />
    </Input>
  );
}
