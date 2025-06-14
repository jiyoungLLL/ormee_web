'use client';

import Button from '@/components/ui/Button';
import CreateContents from '@/components/ui/create/CreateContents';
import type { Assignment } from '@/features/homework/homework.types';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { useApiMutation } from '@/hooks/useApi';
import { MOCK_HOMEWORK } from '@/mock/homework';
import { WriteBoxFormValues, writeBoxSchema } from '@/schemas/writeBox.schema';
import { useToastStore } from '@/stores/toastStore';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type CreateProps = {
  type: 'notice' | 'homework';
  params: string;
};

export default function Create({ type, params }: CreateProps) {
  const { addToast } = useToastStore();
  const lectureNum = useLectureId();
  const searchParams = useSearchParams();
  const homeworkId = type === 'homework' && searchParams.get('id');
  const filter = searchParams.get('filter');
  const isModify = !!filter;

  const title = type === 'notice' ? '공지' : '숙제';

  const dataFilter = filter === 'ongoing' ? 'openedAssignments' : 'closedAssignments';

  const preData: Assignment | undefined = homeworkId
    ? MOCK_HOMEWORK.data[dataFilter].find((item) => item.id === Number(homeworkId))
    : undefined;

  const normalizedFiles = preData?.filePaths
    ? typeof preData.filePaths === 'string'
      ? [preData.filePaths]
      : preData.filePaths
    : [];

  const defaultValues = useMemo(
    () => ({
      title: preData?.title || '',
      description: preData?.description || '',
      files: normalizedFiles,
      isDraft: false,
      openTime: new Date().toString(),
      dueTime: preData?.dueTime || '',
    }),
    [preData],
  );

  const methods = useForm<WriteBoxFormValues>({
    resolver: zodResolver(writeBoxSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  const method = homeworkId ? 'PUT' : 'POST';
  const endpoint = homeworkId ? `/teachers/${lectureNum}/assignments` : `/teachers/assignments/${lectureNum}`;
  const invalidateKeys = homeworkId
    ? [QUERY_KEYS.homeworkDetail(homeworkId), QUERY_KEYS.homeworkList(lectureNum)]
    : [QUERY_KEYS.homeworkList(lectureNum)];

  const mutation = useApiMutation<unknown, FormData>({
    method,
    endpoint,
    fetchOptions: {
      authorization: true,
      contentType: 'multipart/form-data',
    },
    onSuccess: () => {
      addToast({ message: `${title}가 ${homeworkId ? '수정' : '생성'}되었어요.`, type: 'success', duration: 2500 });
    },
    invalidateKey: invalidateKeys,
    onError: (error: Error) => {
      addToast({
        message: `${title}가 ${homeworkId ? '수정' : '생성'}되지 않았어요. 다시 시도해주세요.`,
        type: 'error',
        duration: 2500,
      });
    },
  });

  const onSubmit = (data: WriteBoxFormValues) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('isDraft', String(data.isDraft));
    formData.append('openTime', data.openTime);
    formData.append('dueTime', data.dueTime);

    if (data.files) {
      if (Array.isArray(data.files)) {
        data.files.forEach((file) => {
          formData.append('files', file);
        });
      } else {
        formData.append('files', data.files);
      }
    }

    mutation.mutate(formData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='w-full h-[50px] flex justify-between items-center'>
          <Link
            href={
              isModify && type === 'homework'
                ? `/lectures/${params}/${type}/detail?filter=${filter}&id=${homeworkId}`
                : `/lectures/${params}/${type}`
            }
            className='w-[136px] px-[5px] text-title3 font-bold flex items-center gap-[15px]'
          >
            <Image
              src='/assets/icons/left_arrow.png'
              width={24}
              height={24}
              alt='이전으로'
            />
            {title} {isModify ? '수정' : '작성'}
          </Link>
          <div className='flex gap-[10px]'>
            <Button
              type='BUTTON_BASE_TYPE'
              size='w-[117px] h-[50px]'
              font='text-headline1 font-semibold'
              title='임시저장'
              isPurple={false}
              htmlType='button'
            />
            <Button
              type='BUTTON_BASE_TYPE'
              size='w-[102px] h-[50px]'
              font='text-headline1 font-semibold'
              title='등록하기'
              isPurple={true}
              isfilled={true}
            />
          </div>
        </div>
        <CreateContents
          type={title}
          files={defaultValues.files}
        />
      </form>
    </FormProvider>
  );
}
