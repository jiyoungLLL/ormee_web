import type { Meta, StoryObj } from '@storybook/react';
import HeaderProfile from './HeaderProfile';
import { expect } from '@storybook/test';
import { userEvent } from '@storybook/test';
import { within } from '@storybook/test';
import { MOCK_MINIMUM_USER_PROFILE, MOCK_USER_PROFILE } from '@/mock/profile';

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

/** 이미지와 한줄 소개가 없는 상태 */
export const Default: Story = {
  args: {
    userProfileData: MOCK_MINIMUM_USER_PROFILE,
  },
};

/** 이미지와 한줄 소개가 있는 상태 */
export const WithFullProfileData: Story = {
  args: {
    userProfileData: MOCK_USER_PROFILE,
  },
};

/** 패널이 열린 상태에서 다시 클릭 시 닫히는지 테스트 */
export const PanelToggleClose: Story = {
  args: {
    userProfileData: MOCK_MINIMUM_USER_PROFILE,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const headerProfile = canvas.getByTestId('header-profile');
    await userEvent.click(headerProfile);

    expect(canvas.getByText('로그아웃')).toBeInTheDocument();

    await userEvent.click(headerProfile);

    expect(canvas.queryByText('로그아웃')).not.toBeInTheDocument();
  },
};
