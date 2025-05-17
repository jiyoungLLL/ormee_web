'use client';

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type RadioProps<T extends FieldValues> = {
  /** 라디오 버튼과 함께 표시될 컴포넌트 */
  children?: React.ReactNode;
  /** value를 제어하기 위한 register 함수 (useForm 혹은 useFormContext 반환값) */
  register: UseFormRegister<T>;
  /** 라디오 버튼의 이름, 라디오 버튼 그룹을 구분하는 식별자 */
  name: Path<T>;
  /** 라디오버튼의 고유 id */
  htmlFor: string;
  /** 라디오 버튼의 값 */
  value: string;
  /** 라디오 버튼 선택 여부 */
  checked: boolean;
  /** 라디오 버튼 변경 시 호출할 콜백함수 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 라디오 버튼 비활성화 여부 */
  disabled?: boolean;
};
export default function Radio<T extends FieldValues>({
  children,
  register,
  name,
  htmlFor,
  value,
  checked,
  onChange,
  disabled,
}: RadioProps<T>) {
  return (
    <label
      htmlFor={htmlFor}
      className='flex items-center gap-2'
    >
      <input
        type='radio'
        id={htmlFor}
        {...register(name)}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {children}
    </label>
  );
}
