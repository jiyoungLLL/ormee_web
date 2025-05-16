import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Dropdown from './Dropdown';
import { useDropdown } from '@/hooks/ui/useDropdown';
import { userEvent, within, expect } from '@storybook/test';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `

## 기본 사용법 (내장 트리거 사용)
- 가장 기본 형태의 사용법입니다.
- 드롭다운 메뉴에 띄울 메뉴 아이템 리스트와 선택된 메뉴를 관리할 state를 전달합니다.
- useDropdown을 사용하지 않을 경우 onClick에서 setState로 상태를 관리해주세요.

\`\`\`tsx
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { useState } from 'react';

const YourComponent = () => {
  const [selected, setSelected] = useState('옵션 1');
  
  // 메뉴 아이템 정의
  const menuList = [
    { id: '1', label: '옵션 1', onClick: () => setSelected('옵션 1') },
    { id: '2', label: '옵션 2', onClick: () => setSelected('옵션 2') },
    { id: '3', label: '옵션 3', onClick: () => setSelected('옵션 3') },
  ];

  return (
    <Dropdown
      showTrigger={true}
      menuList={menuList}
      selectedItem={selected}
    />
  );
};
\`\`\`

## useDropdown 훅 사용하기

편리한 상태 관리를 위해 \`useDropdown\` 훅을 사용할 수 있습니다.
- 기본적인 드롭다운 토글, 선택한 메뉴의 상태관리 외 조작이 필요 없는 경우 onOpen, onClose 콜백 함수를 전달하지 않아도 됩니다.
- useDropdown에 아이템 리스트 {id, label}[] 를 전달하면 상태관리를 위한 콜백함수가 자동으로 추가된 리스트가 반환됩니다. (menuListForDropdown)
- initialOpen, initialSelectedItem 옵션을 전달해 드롭다운 초기 상태를 설정할 수 있습니다.


\`\`\`tsx
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { useDropdown } from '@/hooks/ui/useDropdown';

const YourComponent = () => {
  // 메뉴 아이템 정의
  const menuList = [
    { id: '1', label: '옵션 1' },
    { id: '2', label: '옵션 2' },
    { id: '3', label: '옵션 3' },
  ];

  const { 
    selectedItem,           // 현재 선택된 아이템 (트리거에 표시됨)
    menuListForDropdown     // onClick 이벤트 핸들러가 추가된 메뉴 리스트
  } = useDropdown({
    menuList,
    initialSelectedItem: '옵션 1'
  });

  return (
    <Dropdown
      showTrigger={true}
      menuList={menuListForDropdown}
      selectedItem={selectedItem}
    />
  );
};
\`\`\`

## 커스텀 트리거 사용하기

기본 트리거가 아닌 외부 요소를 트리거로 사용할 수 있습니다.
- Dropdown 컴포넌트에 showTrigger={false}를 전달합니다.
- 커스텀 트리거로 사용할 요소의 ref를 triggerRef에 전달합니다.
- 커스텀 트리거로 사용할 요소의 onClick 이벤트에서 드롭다운 상태를 관리할 state를 토글합니다. (useDropdown의 handleToggle 사용)
- useDropdown에서 handleToggle을 받아 토글 처리
- 드롭다운 메뉴의 position을 조정하고 싶은 경우 menuContainerPosition 옵션을 전달해주세요.

\`\`\`tsx
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { useRef, useState } from 'react';

const YourComponent = () => {
  const triggerRef = useRef(null);
  
  const menuList = [
    { id: '1', label: '옵션 1', onClick: () => setSelected('옵션 1') },
    { id: '2', label: '옵션 2', onClick: () => setSelected('옵션 2') },
    { id: '3', label: '옵션 3', onClick: () => setSelected('옵션 3') },
  ];

  const {
    isOpen,
    selectedItem,
    menuListForDropdown,
    handleToggle,
  } = useDropdown({
    menuList,
  });

  return (
    <>
      {/* 커스텀 트리거 */}
      <div 
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer p-2 border rounded"
      >
        {selected}
      </div>
      
      {/* 드롭다운 */}
      <Dropdown
        showTrigger={false}       // 기본 트리거 사용 안 함
        triggerRef={triggerRef}   // 커스텀 트리거 ref
        isOpen={isOpen}           // 열림 상태 관리
        menuList={menuList}
        selectedItem={selected}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
\`\`\`

## 커스텀 스타일 사용하기

이외에도 다양한 옵션을 전달해 드롭다운 메뉴의 스타일을 커스텀할 수 있습니다.
- size 옵션을 전달해 드롭다운 메뉴의 크기를 조정할 수 있습니다.
- triggerAreaStyle 옵션을 전달해 드롭다운 트리거의 스타일을 커스텀할 수 있습니다. (모든 상태에 공통적으로 적용될 스타일)
- triggerAreaOnOpenStyle, triggerAreaOnCloseStyle, triggerAreaDisabledStyle 옵션을 전달해 드롭다운 트리거의 스타일을 상세히 커스텀할 수 있습니다.
- selectedTextStyle 옵션을 전달해 선택된 메뉴의 텍스트 스타일을 커스텀할 수 있습니다. (트리거에 표시됨)
- menuItemStyle 옵션을 전달해 드롭다운 메뉴 아이템의 스타일을 커스텀할 수 있습니다.
- menuItemTextStyle 옵션을 전달해 드롭다운 메뉴 아이템의 텍스트 스타일을 커스텀할 수 있습니다.

`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const DropdownTemplate = (args: any) => {
  const { selectedItem, menuListForDropdown } = useDropdown({
    menuList: args.menuList,
    initialSelectedItem: args.selectedItem,
  });

  return (
    <Dropdown
      {...args}
      selectedItem={selectedItem}
      menuList={menuListForDropdown}
    />
  );
};

/** Default 타입 드롭다운 */
export const Default: Story = {
  render: DropdownTemplate,
  args: {
    type: 'default',
    showTrigger: true,
    menuList: [
      { id: 'd1', label: '메뉴 1' },
      { id: 'd2', label: '메뉴 2' },
      { id: 'd3', label: '메뉴 3' },
    ],
    selectedItem: '메뉴 1',
  },
};

/** withInput 타입 드롭다운 */
export const WithInput: Story = {
  render: DropdownTemplate,
  args: {
    type: 'withInput',
    showTrigger: true,
    menuList: [
      { id: 'd1', label: '010' },
      { id: 'd2', label: '011' },
      { id: 'd3', label: '02' },
    ],
    selectedItem: '010',
  },
};

/** disabled 타입 드롭다운 */
export const Disabled: Story = {
  render: DropdownTemplate,
  args: {
    type: 'default',
    showTrigger: true,
    disabled: true,
    menuList: [
      { id: 'd1', label: '메뉴 1' },
      { id: 'd2', label: '메뉴 2' },
      { id: 'd3', label: '메뉴 3' },
    ],
    selectedItem: '메뉴 1',
  },
};

/** 메뉴 아이템이 최대 높이를 넘어서는 경우 */
export const Overflow: Story = {
  render: DropdownTemplate,
  args: {
    type: 'default',
    showTrigger: true,
    menuList: [
      { id: 'd1', label: '메뉴 1' },
      { id: 'd2', label: '메뉴 2' },
      { id: 'd3', label: '메뉴 3' },
      { id: 'd4', label: '메뉴 4' },
      { id: 'd5', label: '메뉴 5' },
      { id: 'd6', label: '메뉴 6' },
      { id: 'd7', label: '메뉴 7' },
      { id: 'd8', label: '메뉴 8' },
      { id: 'd9', label: '메뉴 9' },
    ],
    selectedItem: '메뉴 1',
  },
};

/** 커스텀 스타일 드롭다운 */
export const CustomStyle: Story = {
  render: DropdownTemplate,
  args: {
    type: 'default',
    showTrigger: true,
    menuList: [
      { id: 'd1', label: '항목 1' },
      { id: 'd2', label: '항목 2' },
      { id: 'd3', label: '항목 3' },
    ],
    selectedItem: '항목 1',
    size: 'w-[150px] h-[45px]',
    triggerAreaStyle: 'border-2 rounded-[8px] pl-[16px] pr-[42px] py-[10px] bg-gray-10',
    selectedTextStyle: 'text-blue-600 font-bold',
    menuItemTextStyle: 'text-gray-600',
  },
};

/** disabled 상태에서 상호작용 테스트 */
export const DisabledInteractionTest: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(args.selectedItem || '선택');
    const [isOpenCount, setIsOpenCount] = useState(0);
    const [itemClickCount, setItemClickCount] = useState(0);

    const menuListWithHandlers = args.menuList.map((item: any) => ({
      ...item,
      onClick: () => {
        setSelected(item.label);
        setItemClickCount((prev) => prev + 1);
      },
    }));

    const handleOpen = () => {
      setIsOpenCount((prev) => prev + 1);
    };

    return (
      <div
        className='flex flex-col items-center gap-4'
        data-testid='dropdown-test-container'
      >
        <Dropdown
          {...args}
          selectedItem={selected}
          menuList={menuListWithHandlers}
          onOpen={handleOpen}
          data-testid='test-dropdown'
        />
        <div className='mt-4 p-2 border rounded bg-gray-50'>
          <p data-testid='dropdown-open-count'>드롭다운 열림 시도 횟수: {isOpenCount}</p>
          <p data-testid='item-click-count'>아이템 클릭 시도 횟수: {itemClickCount}</p>
          <p data-testid='selected-item'>선택된 항목: {selected}</p>
        </div>
      </div>
    );
  },
  args: {
    type: 'default',
    showTrigger: true,
    disabled: true,
    menuList: [
      { id: 'd1', label: '메뉴 1' },
      { id: 'd2', label: '메뉴 2' },
      { id: 'd3', label: '메뉴 3' },
    ],
    selectedItem: '메뉴 1',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const dropdownElement = canvas.getByText('메뉴 1').closest('div');
    if (!dropdownElement) throw new Error('드롭다운 요소를 찾을 수 없습니다');
    const dropdown = dropdownElement;

    await step('드롭다운 클릭 시도', async () => {
      await userEvent.click(dropdown);
    });

    await step('상태 확인 - 드롭다운이 열리지 않아야 함', async () => {
      expect(canvas.queryByText('메뉴 2')).not.toBeInTheDocument();

      const openCount = canvas.getByTestId('dropdown-open-count');
      expect(openCount).toHaveTextContent('드롭다운 열림 시도 횟수: 0');

      const selectedItem = canvas.getByTestId('selected-item');
      expect(selectedItem).toHaveTextContent('선택된 항목: 메뉴 1');
    });

    await step('여러 번 클릭 시도', async () => {
      await userEvent.click(dropdown);
      await userEvent.click(dropdown);
      await userEvent.click(dropdown);
    });

    await step('반복 클릭 후 상태 확인', async () => {
      const openCount = canvas.getByTestId('dropdown-open-count');
      expect(openCount).toHaveTextContent('드롭다운 열림 시도 횟수: 0');
    });
  },
};
