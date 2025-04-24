import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  maxLength?: number;
  showPasswordToggle?: boolean;
};

export default function Input<T extends FieldValues>({
  name,
  control,
  type = 'text',
  maxLength,
  placeholder,
  showPasswordToggle = false,
}: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          className='w-full h-[50px] px-[20px] py-[15px] rounded-[10px] bg-white border-[1px] border-gray-20 text-body-reading text-gray-90 placeholder:text-gray-50'
        />
      )}
    />
  );
}
