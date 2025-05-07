'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import Input from './Input';

type SearchInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  size?: string;
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
      inputStyle={`bg-transparent border border-gray-30 ${iconPosition === 'left' ? 'pl-[49px] pr-[15px]' : 'pr-[49px] pl-[15px]'} py-[9px]`}
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
