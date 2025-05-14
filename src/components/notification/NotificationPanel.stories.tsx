import type { Meta, StoryObj } from '@storybook/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {
  MOCK_NOTIFICATION_LIST_ONE_UNREAD,
  MOCK_NOTIFICATION_LIST_EMPTY,
  MOCK_NOTIFICATION_LIST_BULK,
  MOCK_NOTIFICATION_LIST_ONE_READ,
} from '@/mock/notification';
import NotificationPanel from './NotificationPanel';
import { http, HttpResponse } from 'msw';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

const meta: Meta<typeof NotificationPanel> = {
  title: 'Components/NotificationPanel',
  component: NotificationPanel,
  decorators: [
    (Story) => {
      if (!document.getElementById('notification-root')) {
        const root = document.createElement('div');
        root.id = 'notification-root';
        document.body.appendChild(root);
      }

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof NotificationPanel>;

/** 알림 패널에 읽지 않은 하나의 알림이 있는 경우 */
export const OneUnread: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

OneUnread.parameters = {
  msw: {
    handlers: [
      http.get(`${process.env.NEXT_PUBLIC_MOCK_BASE_URL}/api/teacher/notification/`, () => {
        return HttpResponse.json(MOCK_NOTIFICATION_LIST_ONE_UNREAD, {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }),
    ],
  },
};

/** 알림 패널에 읽은 하나의 알림이 있는 경우 */
export const OneRead: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

OneRead.parameters = {
  msw: {
    handlers: [
      http.get(`${process.env.NEXT_PUBLIC_MOCK_BASE_URL}/api/teacher/notification/`, () => {
        return HttpResponse.json(MOCK_NOTIFICATION_LIST_ONE_READ, {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }),
    ],
  },
};

/** 알림 패널에 알림이 없는 경우 */
export const Empty: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

Empty.parameters = {
  msw: {
    handlers: [
      http.get(`${process.env.NEXT_PUBLIC_MOCK_BASE_URL}/api/teacher/notification/`, () =>
        HttpResponse.json(MOCK_NOTIFICATION_LIST_EMPTY, {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      ),
    ],
  },
};

/** 알림 패널에 여러 개의 알림이 있는 경우 */
export const Bulk: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

Bulk.parameters = {
  msw: {
    handlers: [
      http.get(`${process.env.NEXT_PUBLIC_MOCK_BASE_URL}/api/teacher/notification/`, () =>
        HttpResponse.json(MOCK_NOTIFICATION_LIST_BULK, {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      ),
    ],
  },
};
