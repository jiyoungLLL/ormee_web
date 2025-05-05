import type { Meta, StoryObj } from '@storybook/react';
import HeaderProfile from './HeaderProfile';
import { expect } from '@storybook/test';
import { userEvent } from '@storybook/test';
import { within } from '@storybook/test';

const meta = {
  title: 'Components/Profiles/HeaderProfile',
  component: HeaderProfile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeaderProfile>;

export default meta;
type Story = StoryObj<typeof HeaderProfile>;

/** 기본 HeaderProfile 컴포넌트 */
export const Default: Story = {
  args: {},
};

/** 패널이 열린 상태에서 다시 클릭 시 닫히는지 테스트 */
export const PanelToggleClose: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const headerProfile = canvas.getByTestId('header-profile');
    await userEvent.click(headerProfile);

    expect(canvas.getByText('로그아웃')).toBeInTheDocument();

    await userEvent.click(headerProfile);

    expect(canvas.queryByText('로그아웃')).not.toBeInTheDocument();
  },
};
