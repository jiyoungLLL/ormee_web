import { ReactNode, useEffect, useRef, useState } from 'react';

type DropdownProps = {
  /** 드롭다운 메뉴에 표시될 아이템 리스트 */
  menuList: {
    id: string | number;
    label: ReactNode;
    onClick?: () => void;
  }[];
  /** 현재 선택된 메뉴를 관리하는 state */
  selectedItem: ReactNode;
  /** 드롭다운 메뉴의 크기 (기본값: w-full h-full) */
  size?: string;
  /** 닫힌 상태의 드롭다운 메뉴에 적용될 스타일 */
  closedAreaStyle?: string;
  /** 드롭다운 메뉴 아이템에 적용될 스타일 */
  menuItemStyle?: string;
  /** 드롭다운이 열릴 때 실행될 콜백 함수 */
  onOpen?: () => void;
  /** 드롭다운이 닫힐 때 실행될 콜백 함수 */
  onClose?: () => void;
};

export default function Dropdown({
  menuList,
  selectedItem,
  size = 'w-full h-full',
  closedAreaStyle = 'border border-gray-20 rounded-[5px] pl-[14px] pr-[42px]',
  menuItemStyle,
  onOpen,
  onClose,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);

    if (newOpenState && onOpen) onOpen();
    if (!newOpenState && onClose) onClose();
  };

  const handleItemClick = (onClick?: () => void) => {
    if (onClick) onClick();

    setIsOpen(false);

    if (onClose) onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);

        if (isOpen && onClose) onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`relative flex justify-start items-center ${size} ${closedAreaStyle} cursor-pointer select-none`}
      ref={dropdownRef}
      onClick={handleToggle}
    >
      {selectedItem}
      <img
        src={isOpen ? '/assets/icons/top_arrow_gray_50.png' : '/assets/icons/bottom_arrow_gray_50.png'}
        alt='dropdown 버튼'
        className='absolute right-[14px] w-[14px] h-[14px]'
      />
    </div>
  );
}
