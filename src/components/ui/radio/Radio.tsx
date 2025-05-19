'use client';

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type RadioProps<T extends FieldValues> = {
  /** 라디오 버튼과 함께 표시될 컴포넌트 */
  children?: React.ReactNode;
  /** value를 제어하기 위한 register 함수 (useForm 혹은 useFormContext 반환값) */
  register: UseFormRegister<T>;
  /** 폼에서 사용할 name, 라디오 버튼 그룹을 구분하는 식별자 */
  name: Path<T>;
  /** 라디오버튼의 고유 id */
  htmlFor: string;
  /** 라디오 버튼의 값 */
  value: string;
  /** 라디오 버튼 변경 시 추가적인 동작을 호출하고 싶은 경우 사용 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 라디오 버튼 비활성화 여부 */
  disabled?: boolean;
  /** 컨테이너에 적용될 스타일 */
  containerStyle?: string;
};
export default function Radio<T extends FieldValues>({
  children,
  register,
  name,
  htmlFor,
  value,
  onChange,
  disabled,
  containerStyle,
}: RadioProps<T>) {
  return (
    <label
      htmlFor={htmlFor}
      className={`${containerStyle || 'flex items-center'}`}
    >
      <input
        type='radio'
        id={htmlFor}
        {...register(name)}
        name={name}
        value={value}
        onChange={(e) => {
          onChange?.(e);
        }}
        disabled={disabled}
        className='appearance-none w-[20px] h-[20px] rounded-full bg-white border-box border-[1.6px] border-gray-30 checked:border-[6px] checked:border-purple-50 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-30'
      />
      {children}
    </label>
  );
}
