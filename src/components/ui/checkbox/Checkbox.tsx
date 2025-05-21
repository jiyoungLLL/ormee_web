type CheckboxProps = {
  /** 체크박스 id */
  id: string;
  /** 체크 여부 */
  checked?: boolean;
  /** 체크 상태 변경 시 호출되는 콜백 (상태 관리용) */
  checkItemHandler?: (id: string, isChecked: boolean) => void;
};

export default function Checkbox({ id, checked = false, checkItemHandler }: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkItemHandler?.(id, e.target.checked);
  };

  return (
    <label className='h-[24px]'>
      <input
        id={id}
        type='checkbox'
        checked={checked}
        onChange={handleChange}
        className="appearance-none w-[24px] h-[24px] rounded-[3.5px] bg-white border border-gray-50 checked:bg-[url('/assets/icons/checked.png')] bg-no-repeat bg-center"
      />
    </label>
  );
}
