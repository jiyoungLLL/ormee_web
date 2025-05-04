import { StoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import SignInPage from './page';
import { fn } from '@storybook/test';
import { AUTH_ERROR_MESSAGES } from '@/schemas/auth.schema';

type Story = StoryObj<typeof SignInPage>;

export default {
  title: 'Pages/SignIn',
  component: SignInPage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

/** 유효성 검사 실패 시나리오 - 빈 폼 제출 */
export const ValidationFailureEmptyForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const alertMock = fn();
    window.alert = alertMock;

    const loginButton = canvas.getByRole('button', { name: /로그인/i });

    await userEvent.click(loginButton);

    expect(alertMock).toHaveBeenCalledWith(AUTH_ERROR_MESSAGES.EMPTY_ID);
  },
};

/** 유효성 검사 실패 시나리오 - 아이디만 입력 */
export const ValidationFailurePasswordMissing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const alertMock = fn();
    window.alert = alertMock;

    const idInput = canvas.getByPlaceholderText('아이디');
    await userEvent.type(idInput, 'testuser');

    const loginButton = canvas.getByRole('button', { name: /로그인/i });
    await userEvent.click(loginButton);

    expect(alertMock).toHaveBeenCalledWith(AUTH_ERROR_MESSAGES.EMPTY_PASSWORD);
  },
};

/** 유효성 검사 실패 시나리오 - 비밀번호만 입력 */
export const ValidationFailureIdMissing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const alertMock = fn();
    window.alert = alertMock;

    const passwordInput = canvas.getByPlaceholderText('비밀번호');
    await userEvent.type(passwordInput, 'password123');

    const loginButton = canvas.getByRole('button', { name: /로그인/i });
    await userEvent.click(loginButton);

    expect(alertMock).toHaveBeenCalledWith(AUTH_ERROR_MESSAGES.EMPTY_ID);
  },
};
