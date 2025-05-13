import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Dropdown from './Dropdown';

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

  return (
    <div className='flex justify-center items-center gap-[30px]'>
      <div>선택된 메뉴: {selected}</div>
      <Dropdown
        {...args}
        selectedItem={selected}
      />
    </div>
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
      { id: 'd1', label: '옵션 1' },
      { id: 'd2', label: '옵션 2' },
      { id: 'd3', label: '옵션 3' },
    ],
    selectedItem: '옵션 1',
  },
};

// 커스텀 스타일 드롭다운
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
