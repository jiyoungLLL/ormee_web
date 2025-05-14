import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Dropdown from './Dropdown';
import { userEvent, within, expect } from '@storybook/test';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const DropdownTemplate = (args: any) => {
  const [selected, setSelected] = useState(args.selectedItem || '선택');

  const menuListWithHandlers = args.menuList.map((item: any) => ({
    ...item,
    onClick: () => setSelected(item.label),
  }));

  return (
    <Dropdown
      {...args}
      selectedItem={selected}
      menuList={menuListWithHandlers}
    />
  );
};

/** Default 타입 드롭다운 */
export const Default: Story = {
  render: DropdownTemplate,
  args: {
    type: 'default',
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
    menuList: [
      { id: 'd1', label: '항목 1' },
      { id: 'd2', label: '항목 2' },
      { id: 'd3', label: '항목 3' },
    ],
    selectedItem: '항목 1',
    size: 'w-[150px] h-[45px]',
    closedAreaStyle: 'border-2 rounded-[8px] pl-[16px] pr-[42px] py-[10px] bg-gray-10',
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

/** menuContainerMaxHeight 속성 테스트 */
export const CustomMaxHeight: Story = {
  render: DropdownTemplate,
  args: {
    type: 'default',
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
    menuContainerMaxHeight: 100,
    menuContainerTestId: 'custom-max-height-container',
    triggerTestId: 'dropdown-trigger',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('드롭다운 열기', async () => {
      const trigger = canvas.getByTestId('dropdown-trigger');
      await userEvent.click(trigger);

      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    await step('메뉴 컨테이너의 최대 높이 확인', async () => {
      const menuContainer = canvas.getByTestId('custom-max-height-container');

      const computedStyle = window.getComputedStyle(menuContainer);
      expect(computedStyle.maxHeight).toBe('100px');

      expect(menuContainer.style.maxHeight).toBe('100px');

      expect(menuContainer).toBeInTheDocument();
      expect(canvas.getByText('메뉴 9')).toBeInTheDocument();
    });

    await step('드롭다운 닫기', async () => {
      const trigger = canvas.getByTestId('dropdown-trigger');
      await userEvent.click(trigger);

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(canvas.queryByTestId('custom-max-height-container')).not.toBeInTheDocument();
    });
  },
};
