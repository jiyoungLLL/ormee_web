'use client';

import CreateContents from '@/components/ui/create/CreateContents';
import CreateHeader from '@/components/ui/create/CreateHeader';
import { WriteBoxFormValues, writeBoxSchema } from '@/schemas/writeBox.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

type CreateProps = {
  /** 공지, 숙제 등 작성 타이틀 */
  type: 'notice' | 'homework';
  /** 강의 번호 */
  params: string;
};

export default function Create({ type, params }: CreateProps) {
  const title = type === 'notice' ? '공지' : '숙제';

  const methods = useForm<WriteBoxFormValues>({
    resolver: zodResolver(writeBoxSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      contents: '',
    },
  });

  const onSubmit = (data: WriteBoxFormValues) => {
    alert('저장!');
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CreateHeader
          type={type}
          params={params}
        />
        <CreateContents type={title} />
      </form>
    </FormProvider>
  );
}
