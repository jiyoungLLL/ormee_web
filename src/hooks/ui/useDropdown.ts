'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

export type MenuItem = {
  id: string | number;
  label: ReactNode;
  onClick?: () => void;
};

type UseDropdownProps<T> = {
  /** 드롭다운이 닫힐 때 호출될 콜백함수 */
  onClose?: () => void;
  /** 드롭다운이 열릴 때 호출될 콜백함수 */
  onOpen?: () => void;
  /** 메뉴 아이템이 선택될 때 호출될 콜백함수 */
  onSelect?: (value: T) => void;
  /** 드롭다운의 초기 상태 */
  initialOpen?: boolean;
  /** 드롭다운의 초기에 선택된 메뉴 아이템 */
  initialSelectedItem?: T;
  /** 드롭다운의 메뉴 아이템 목록 */
  menuList: MenuItem[];
};

export const useDropdown = <T extends ReactNode>({
  onClose,
  onOpen,
  onSelect,
  initialOpen = false,
  initialSelectedItem,
  menuList,
}: UseDropdownProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | undefined>(initialSelectedItem);
  const [isOpen, setIsOpen] = useState(initialOpen);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  //    useCallback으로 감싸면 무슨 효과인지?
  const handleToggle = () => {
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);

    if (newOpenState && onOpen) onOpen();
    if (!newOpenState && onClose) onClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleSelect = (value: T, onClickItem?: () => void) => {
    setSelectedItem(value);

    if (onSelect) onSelect(value);
    if (onClickItem) onClickItem();

    handleClose();
  };

  const menuListForDropdown = menuList.map((item) => ({
    ...item,
    onClick: () => handleSelect(item.label as T, item.onClick),
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    selectedItem,
    setSelectedItem,
    handleToggle,
    handleClose,
    handleSelect,
    dropdownRef,
    menuListForDropdown,
  };
};
