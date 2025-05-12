'use client';

import { WriteBoxFormValues, writeBoxSchema } from '@/schemas/writeBox.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import NoticeWriteContents from './NoticeCreateContents';
import NoticeWriteHeader from './NoticeCreateHeader';

export default function NoticeCreate() {
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
        <NoticeWriteHeader />
        <NoticeWriteContents />
      </form>
    </FormProvider>
  );
}
