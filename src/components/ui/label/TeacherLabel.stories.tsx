import type { Meta, StoryObj } from '@storybook/react';
import TeacherLabel from './TeacherLabel';

const meta: Meta<typeof TeacherLabel> = {
  title: 'Components/Label/TeacherLabel',
  component: TeacherLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '선생님 이름',
    },
    role: {
      control: 'select',
      options: ['Owner', 'Partner'],
      description: '선생님 역할 (owner: 메인 선생님, partner: 공동 작업자)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TeacherLabel>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <TeacherLabel
        name='강수이'
        role='Owner'
      />
      <TeacherLabel
        name='오승철'
        role='Partner'
      />
    </div>
  ),
};

export const OwnerTeacher: Story = {
  args: {
    name: '강수이',
    role: 'Owner',
  },
};

export const PartnerTeacher: Story = {
  args: {
    name: '오승철',
    role: 'Partner',
  },
};

export const LongName: Story = {
  args: {
    name: '김아주긴이름선생님',
    role: 'Owner',
  },
};

export const ShortName: Story = {
  args: {
    name: '김',
    role: 'Partner',
  },
};
