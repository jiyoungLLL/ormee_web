'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import Input from './Input';

type SearchInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  size?: string;
};

export default function SearchInput<T extends FieldValues>({
  name,
  control,
  placeholder,
  size = 'w-[350px] h-[46px]',
}: SearchInputProps<T>) {
  return (
    <Input
      name={name}
      control={control}
      size={size}
      placeholder={placeholder}
      type='text'
    >
      <img
        src='/assets/icons/search.png'
        className='absolute w-[24px] h-[24px]'
        style={{
          top: '50%',
          right: '15px',
          transform: 'translateY(-50%)',
        }}
      />
    </Input>
  );
}
