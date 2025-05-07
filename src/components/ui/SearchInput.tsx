'use client';

import { useState } from 'react';

type SearchInputProps = {
  onChange: (value: string) => void;
  placeholder?: string;
  size?: string;
};

export default function SearchInput({ onChange, placeholder, size = 'w-[350px] h-[46px]' }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchValue(value);
    onChange(value);
  };

  return (
    <div className={`relative ${size}`}>
      {/* <image /> */}
      <input
        type='text'
        value={searchValue}
        placeholder={placeholder}
        className='w-full h-full border border-gray-30 rounded-[10px]'
        onChange={handleChange}
      />
    </div>
  );
}
