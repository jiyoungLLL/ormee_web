'use client';

import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';

type DropdownType = 'default' | 'withInput';

type BaseDropdownProps = {
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
  /** 드롭다운 메뉴 컨테이너의 position */
  menuContainerPosition?: string;
  /** 드롭다운 메뉴 아이템에 적용될 스타일 */
  menuItemStyle?: string;
  /** 드롭다운 메뉴 아이템 텍스트에 적용될 스타일 */
  menuItemTextStyle?: string;
  /** 드롭다운 메뉴 컨테이너의 최대 높이 */
  menuContainerMaxHeight?: number;
  /** 드롭다운이 열릴 때 실행될 콜백 함수 */
  onOpen?: () => void;
  /** 드롭다운이 닫힐 때 실행될 콜백 함수 */
  onClose?: () => void;
  /** 드롭다운 비활성화 여부 */
  disabled?: boolean;
  /** 드롭다운 메뉴 컨테이너 테스트 ID (펼쳐진 영역) */
  menuContainerTestId?: string;
};

type WithTriggerProps = BaseDropdownProps & {
  /** 기본 트리거를 보여줄지 선택 (true일 때) */
  showTrigger: true;
  /** 드롭다운 초기 열림 상태 */
  initialOpen?: boolean;
  /** 드롭다운 트리거에 적용될 스타일 */
  triggerAreaStyle?: string;
  /** 드롭다운 트리거(항상 보이는 부분) 테스트 ID */
  triggerTestId?: string;
  /** 선텍된 아이템 텍스트에 적용될 스타일 */
  selectedTextStyle?: string;
  /** showTrigger가 false일 경우에만 사용 가능 */
  isOpen?: never;
  /** 트리거로 사용할 요소의 ref */
  triggerRef?: never;
};

type WithoutTriggerProps = BaseDropdownProps & {
  /** 트리거로 사용할 요소의 ref */
  triggerRef: RefObject<HTMLDivElement>;
  /** 기본 트리거를 보여줄지 선택 (false일 때) */
  showTrigger: false;
  /** showTrigger이 false일 경우 드롭다운 열림 상태를 관리할 state */
  isOpen: boolean;
  /** 선텍된 아이템 텍스트에 적용될 스타일 */
  selectedTextStyle?: never;
  /** 드롭다운 트리거에 적용될 스타일 */
  triggerAreaStyle?: never;
  /** 드롭다운 트리거(항상 보이는 부분) 테스트 ID */
  triggerTestId?: never;
  /** showTrigger가 true일 경우에만 사용 가능 */
  initialOpen?: never;
};

type DropdownProps = WithTriggerProps | WithoutTriggerProps;

const DROPDOWN_SIZE = {
  default: 'w-[119px] h-[40px]',
  withInput: 'w-[120px] h-[50px]',
} as const;

const DROPDOWN_TRIGGER_AREA_STYLE = {
  default: {
    base: 'border rounded-[5px] pl-[14px] pr-[42px] py-[12px]',
    open: 'border-purple-50 bg-white',
    closed: 'border-gray-20 bg-white',
    disabled: 'border-gray-20 bg-gray-10',
  },
  withInput: {
    base: 'border rounded-[10px] pl-[20px] pr-[56px] py-[15px]',
    open: 'border-purple-50 bg-white',
    closed: 'border-gray-20 bg-white',
    disabled: 'border-gray-20 bg-gray-10',
  },
} as const;

const DROPDOWN_TEXT_STYLE = {
  default: 'text-gray-90 text-headline2 font-semibold',
  withInput: 'text-gray-90 text-body-reading',
} as const;

const DROPDOWN_MENU_ITEM_STYLE = 'px-[10px] py-[5px] hover:bg-gray-10 active:bg-gray-30';
const DROPDOWN_MENU_ITEM_TEXT_STYLE = 'text-headline2 font-normal';

const DROPDOWN_MENU_MAX_HEIGHT = 200;

export default function Dropdown(props: DropdownProps) {
  const {
    type = 'default',
    menuList,
    selectedItem,
    size,
    menuContainerPosition,
    menuItemStyle,
    selectedTextStyle,
    menuItemTextStyle,
    menuContainerMaxHeight,
    disabled,
    onOpen,
    onClose,
    menuContainerTestId,
  } = props;

  const showTrigger = 'showTrigger' in props ? props.showTrigger : true;

  const controlledIsOpen = showTrigger === false ? props.isOpen : undefined;
  const initialOpen = showTrigger === true ? props.initialOpen : undefined;
  const triggerAreaStyle = showTrigger === true ? props.triggerAreaStyle : undefined;
  const triggerTestId = showTrigger === true ? props.triggerTestId : undefined;
  const triggerRef = showTrigger === false ? props.triggerRef : undefined;

  const [isOpenState, setIsOpenState] = useState(initialOpen ?? false);

  const defaultTriggerRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (disabled) return;

    const newOpenState = !isOpenState;
    setIsOpenState(newOpenState);

    if (newOpenState && onOpen) onOpen();
    if (!newOpenState && onClose) onClose();
  };

  const handleItemClick = (onClick?: () => void) => {
    if (onClick) onClick();

    setIsOpenState(false);

    if (onClose) onClose();
  };

  const handleClose = () => {
    showTrigger && setIsOpenState(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (defaultTriggerRef.current && defaultTriggerRef.current.contains(event.target as Node)) return;
      if (triggerRef && triggerRef.current && triggerRef.current.contains(event.target as Node)) return;

      if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    showTrigger && isOpenState && document.addEventListener('mousedown', handleClickOutside);
    showTrigger && !isOpenState && document.removeEventListener('mousedown', handleClickOutside);

    !showTrigger && controlledIsOpen && document.addEventListener('mousedown', handleClickOutside);
    !showTrigger && !controlledIsOpen && document.removeEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenState, controlledIsOpen, onClose]);

  return (
    <div className='relative select-none'>
      {showTrigger && (
        <div
          className={`flex justify-start items-center ${size || DROPDOWN_SIZE[type]} ${triggerAreaStyle || DROPDOWN_TRIGGER_AREA_STYLE[type].base} ${
            disabled
              ? DROPDOWN_TRIGGER_AREA_STYLE[type].disabled
              : isOpenState
                ? DROPDOWN_TRIGGER_AREA_STYLE[type].open
                : DROPDOWN_TRIGGER_AREA_STYLE[type].closed
          } ${selectedTextStyle || DROPDOWN_TEXT_STYLE[type]} text-nowrap ${disabled ? 'cursor-not-allowed text-label-assistive' : 'cursor-pointer'} select-none`}
          onClick={handleToggle}
          data-testid={triggerTestId}
          ref={defaultTriggerRef}
        >
          {selectedItem}
          <img
            src={isOpenState ? '/assets/icons/top_arrow_gray_50.png' : '/assets/icons/bottom_arrow_gray_50.png'}
            alt='dropdown 버튼'
            className='absolute right-[14px] w-[14px] h-[14px]'
          />
        </div>
      )}
      {isOpenState && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 translate-y-[10.5px] flex flex-col justify-start items-start gap-[5px] px-[4px] py-[6px] bg-white rounded-[5px] shadow shadow-[0px_0px_7px_0px_rgba(70, 72, 84, 0.10)] overflow-y-auto`}
          style={{ maxHeight: menuContainerMaxHeight || DROPDOWN_MENU_MAX_HEIGHT }}
          data-testid={menuContainerTestId}
          ref={dropdownMenuRef}
        >
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
      {controlledIsOpen && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 translate-y-[10.5px] flex flex-col justify-start items-start gap-[5px] px-[4px] py-[6px] bg-white rounded-[5px] shadow shadow-[0px_0px_7px_0px_rgba(70, 72, 84, 0.10)] overflow-y-auto`}
          style={{ maxHeight: menuContainerMaxHeight || DROPDOWN_MENU_MAX_HEIGHT }}
          data-testid={menuContainerTestId}
          ref={dropdownMenuRef}
        >
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
