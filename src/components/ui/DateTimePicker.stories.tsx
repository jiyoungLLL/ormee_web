import type { Meta, StoryObj } from '@storybook/react';
import DateTimePicker from './DateTimePicker';

const meta = {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

export const NoticeCalendar: Story = {
  args: {
    type: 'CALENDAR',
    calendar: 'DATE_TYPE',
    placeholer: '공지 등록일',
  },
};

export const HomeworkCalendar: Story = {
  args: {
    type: 'CALENDAR',
    calendar: 'DATE_TYPE',
    placeholer: '제출기한',
  },
};

export const ClassCalendar: Story = {
  args: {
    type: 'CALENDAR',
    calendar: 'PERIOD_TYPE',
    placeholer: '선택하기',
  },
};

export const ClassTimer: Story = {
  args: {
    type: 'TIME',
    placeholer: '선택하기',
  },
};
