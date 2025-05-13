'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

type DropdownType = 'default' | 'withInput';

type DropdownProps = {
  /** 드롭다운 타입, 기본값: default */
  type?: DropdownType;
  /** 드롭다운 메뉴에 표시될 아이템 리스트 */
  menuList: {
    id: string | number;
    label: ReactNode;
    onClick?: () => void;
  }[];
  /** 현재 선택된 메뉴를 관리하는 state */
  selectedItem: ReactNode;
  /** 드롭다운 메뉴 한 칸의 크기 */
  size?: string;
  /** 닫힌 상태의 드롭다운 메뉴에 적용될 스타일 */
  closedAreaStyle?: string;
  /** 드롭다운 메뉴 아이템에 적용될 스타일 */
  menuItemStyle?: string;
  /** 선텍된 아이템 텍스트에 적용될 스타일 */
  selectedTextStyle?: string;
  /** 드롭다운 메뉴 아이템 텍스트에 적용될 스타일 */
  menuItemTextStyle?: string;
  /** 드롭다운이 열릴 때 실행될 콜백 함수 */
  onOpen?: () => void;
  /** 드롭다운이 닫힐 때 실행될 콜백 함수 */
  onClose?: () => void;
};

const DROPDOWN_SIZE = {
  default: 'w-[119px] h-[40px]',
  withInput: 'w-[120px] h-[55px]',
} as const;

const DROPDOWN_CLOSED_AREA_STYLE = {
  default: {
    base: 'border rounded-[5px] pl-[14px] pr-[42px] py-[12px]',
    open: 'border-purple-50',
    closed: 'border-gray-20',
  },
  withInput: {
    base: 'border rounded-[10px] pl-[20px] pr-[56px]',
    open: 'border-purple-50',
    closed: 'border-gray-20',
  },
} as const;

const DROPDOWN_TEXT_STYLE = {
  default: 'text-gray-90 text-headline2 font-semibold',
  withInput: 'text-gray-90 text-body-reading',
} as const;

const DROPDOWN_MENU_ITEM_STYLE = 'px-[10px] py-[5px]';
const DROPDOWN_MENU_ITEM_TEXT_STYLE = 'text-headline2 font-normal';

export default function Dropdown({
  type = 'default',
  menuList,
  selectedItem,
  size,
  closedAreaStyle,
  menuItemStyle,
  selectedTextStyle,
  menuItemTextStyle,
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
      className={`relative flex justify-start items-center ${size || DROPDOWN_SIZE[type]} ${closedAreaStyle || DROPDOWN_CLOSED_AREA_STYLE[type].base} ${isOpen ? DROPDOWN_CLOSED_AREA_STYLE[type].open : DROPDOWN_CLOSED_AREA_STYLE[type].closed} ${selectedTextStyle || DROPDOWN_TEXT_STYLE[type]}  cursor-pointer select-none`}
      ref={dropdownRef}
      onClick={handleToggle}
    >
      {selectedItem}
      <img
        src={isOpen ? '/assets/icons/top_arrow_gray_50.png' : '/assets/icons/bottom_arrow_gray_50.png'}
        alt='dropdown 버튼'
        className='absolute right-[14px] w-[14px] h-[14px]'
      />
      {isOpen && (
        <div className='absolute top-full left-1/2 -translate-x-1/2 translate-y-[10.5px] flex flex-col justify-start items-start gap-[5px] px-[4px] py-[6px] bg-white rounded-[5px] shadow shadow-[0px_0px_7px_0px_rgba(70, 72, 84, 0.10)]'>
          {menuList.map((menu) => (
            <div
              key={menu.id}
              className={`${size || DROPDOWN_SIZE[type]} flex items-center ${menuItemStyle || DROPDOWN_MENU_ITEM_STYLE} ${menuItemTextStyle || DROPDOWN_MENU_ITEM_TEXT_STYLE}`}
              onClick={() => handleItemClick(menu.onClick)}
            >
              {menu.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
