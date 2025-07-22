type CheckboxProps = {
  /** 체크박스 id */
  id: string;
  /** 체크 여부 */
  checked?: boolean;
  /** 체크박스 크기, tailwind 클래스 형식으로 작성 */
  size?: string;
  /** 체크 상태 변경 시 호출되는 콜백 (상태 관리용) */
  checkItemHandler?: (id: string, isChecked: boolean) => void;
};

const DEFAULT_SIZE = 'w-[24px] h-[24px]';

export default function Checkbox({ id, checked = false, checkItemHandler, size = DEFAULT_SIZE }: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkItemHandler?.(id, e.target.checked);
  };

  return (
    <input
      id={id}
      type='checkbox'
      checked={checked}
      onChange={handleChange}
      className={`appearance-none rounded-[3.5px] bg-white border border-gray-50 checked:bg-[url('/assets/icons/checked.png')] bg-no-repeat bg-center bg-contain cursor-pointer ${size}`}
    />
  );
}
