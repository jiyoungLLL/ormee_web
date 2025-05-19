'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

type MenuItem = {
  id: string | number;
  label: ReactNode;
  onClick?: () => void;
};

type UseDropdownProps<T> = {
  onClose?: () => void;
  onOpen?: () => void;
  onSelect?: (value: T) => void;
  initialOpen?: boolean;
  initialSelectedItem?: T;
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
