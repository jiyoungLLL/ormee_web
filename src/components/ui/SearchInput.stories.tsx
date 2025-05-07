import { Meta, StoryObj } from '@storybook/react';
import SearchInput, { SearchInputProps } from './SearchInput';
import { useForm } from 'react-hook-form';

type FormValues = {
  search: string;
};

const meta = {
  title: 'Components/Input/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
SearchInput 컴포넌트는 react-hook-form과 함께 사용됩니다.

## 사용법

### 1. 실시간 검색 (watch 사용)
입력값이 변경될 때마다 검색이 필요한 경우:

\`\`\`tsx
import { useForm } from 'react-hook-form';
import SearchInput from './SearchInput';

const YourComponent = () => {
  const { control, watch } = useForm({
    defaultValues: {
      search: '',
    },
  });

  // useForm의 watch를 사용해 검색어 값 변경 감지
  const searchValue = watch('search');

  useEffect(() => {
    // searchValue가 변경될 때마다 필요한 로직 실행
  }, [searchValue]);

  return (
    <SearchInput
      name="search"
      control={control}
      placeholder="검색어를 입력하세요"
    />
  );
};
\`\`\`

### 2. 엔터 키 또는 검색 버튼 클릭 시 검색
폼 제출 시점에만 검색이 필요한 경우:

\`\`\`tsx
import { useForm } from 'react-hook-form';
import SearchInput from './SearchInput';

const YourComponent = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = (data: { search: string }) => {
    // 검색 로직 실행
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SearchInput
        name="search"
        control={control}
        placeholder="검색어를 입력하세요"
      />
    </form>
  );
};
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>;

export default meta;

const Template = (args: Omit<SearchInputProps<FormValues>, 'control'>) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      search: '',
    },
  });

  return (
    <SearchInput
      {...args}
      name='search'
      control={control}
    />
  );
};

type Story = StoryObj<typeof Template>;

/** 기본 형태, 검색 아이콘 왼쪽 배치 */
export const Default: Story = {
  render: Template,
  args: {
    placeholder: '검색',
  },
};

/** 검색 아이콘 오른쪽 배치, placeholder 없음 */
export const RightIcon: Story = {
  render: Template,
  args: {
    iconPosition: 'right',
  },
};
