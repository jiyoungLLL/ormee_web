import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  maxLength?: number;
  showCharacterCount?: boolean;
  showPasswordToggle?: boolean;
};

export default function Input<T extends FieldValues>({
  name,
  control,
  type = 'text',
  maxLength,
  placeholder,
  showCharacterCount = false,
  showPasswordToggle = false,
}: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className='relative w-full'>
          <input
            {...field}
            type={type}
            maxLength={maxLength}
            placeholder={placeholder}
            className='absolute w-full h-[50px] px-[20px] py-[15px] rounded-[10px] bg-white disabled:bg-gray-10 border-[1px] border-gray-20 focus:border-[1px] focus:border-purple-50 focus:outline-none text-body-reading text-gray-90 placeholder:text-gray-50'
          />
          <div className='absolute right-[20px] top-1/2 translate-y-1/2 z-[1]'>
            {showCharacterCount && (
              <div className='flex flex-row gap-[1px] justify-between items-center text-headline1 text-gray-50'>
                <span className='text-gray-70 font-semibold'>{field.value?.length ?? 0}</span>
                <span className='text-gray-50 font-regular'>/{maxLength}</span>
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
}
