import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
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
    placeholder: '공지 등록일',
  },
};

export const HomeworkCalendar: Story = {
  args: {
    type: 'CALENDAR',
    calendar: 'DATE_TYPE',
    placeholder: '제출기한',
  },
};

export const ClassCalendar: Story = {
  args: {
    type: 'CALENDAR',
    calendar: 'PERIOD_TYPE',
    placeholder: '선택하기',
  },
};

export const ClassTimer: Story = {
  args: {
    type: 'TIME',
    placeholder: '선택하기',
  },
};

export const CalendarWithDefaultValue: Story = {
  args: {
    type: 'CALENDAR',
    calendar: 'DATE_TYPE',
    placeholder: '공지 등록일',
    defaultValue: '25.06.05',
  },
};

export const PeriodCalendarWithDefaultValue: Story = {
  args: {
    type: 'CALENDAR',
    calendar: 'PERIOD_TYPE',
    placeholder: '선택하기',
    defaultValue: '25.06.05 - 25.06.08',
  },
};

export const LimitTimerWithDefaultValue: Story = {
  args: {
    type: 'TIME',
    time: 'LIMIT_TIME',
    placeholder: '선택하기',
    defaultValue: '30분',
  },
};

export const CalendarWithDefaultValueTest: Story = {
  args: {
    type: 'CALENDAR',
    calendar: 'DATE_TYPE',
    placeholder: '공지 등록일',
    defaultValue: '25.06.05',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const valueElement = await canvas.findByText('25.06.05');
    expect(valueElement).toBeInTheDocument();
  },
};

export const PeriodCalendarWithDefaultValueTest: Story = {
  args: {
    type: 'CALENDAR',
    calendar: 'PERIOD_TYPE',
    placeholder: '선택하기',
    defaultValue: '2025.06.05 - 2025.06.08',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const valueElement = await canvas.findByText('2025.06.05 - 2025.06.08');
    expect(valueElement).toBeInTheDocument();
  },
};

export const LimitTimeWithDefaultValueTest: Story = {
  args: {
    type: 'TIME',
    time: 'LIMIT_TIME',
    placeholder: '선택하기',
    defaultValue: '30분',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const valueElement = await canvas.findByText('30분');
    expect(valueElement).toBeInTheDocument();
  },
};
