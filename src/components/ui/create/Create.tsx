'use client';

import Button from '@/components/ui/Button';
import CreateContents from '@/components/ui/create/CreateContents';
import type { HomeworkItems } from '@/features/homework/homework.types';
import { useCreateHomework, useUpdateHomework } from '@/features/homework/hooks/queries/useHomeworkApi';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { useModal } from '@/hooks/ui/useModal';
import { MOCK_HOMEWORK } from '@/mock/homework';
import { WriteBoxFormValues, writeBoxSchema } from '@/schemas/writeBox.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Draft from '../draftModal/Draft';

type CreateProps = {
  type: 'notice' | 'homework';
  params: string;
};

export default function Create({ type, params }: CreateProps) {
  const { isOpen, openModal, closeModal } = useModal({ defaultOpen: false });

  const lectureNum = useLectureId();
  const searchParams = useSearchParams();
  const homeworkId = type === 'homework' && searchParams.get('id');
  const filter = searchParams.get('filter');
  const isModify = !!filter;

  const title = type === 'notice' ? '공지' : '숙제';

  const dataFilter = filter === 'ongoing' ? 'openedAssignments' : 'closedAssignments';

  const preData: HomeworkItems | undefined = homeworkId
    ? MOCK_HOMEWORK.data[dataFilter].find((item) => item.id === Number(homeworkId))
    : undefined;

  const defaultValues = useMemo(
    () => ({
      title: preData?.title || '',
      description: preData?.description || '',
      files: [],
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

  const { control, handleSubmit, setValue, watch } = methods;

  const updateMutation = useUpdateHomework(homeworkId || '');
  const createMutation = useCreateHomework(lectureNum);

  const mutation = isModify ? updateMutation : createMutation;

  const handleDraftSubmit = () => {
    methods.setValue('isDraft', true);
    methods.handleSubmit(onSubmit)();
  };

  const onSubmit = (data: WriteBoxFormValues) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('isDraft', data.isDraft.toString());
    formData.append('openTime', new Date(data.openTime).toISOString().slice(0, 19));
    formData.append('dueTime', data.dueTime ? new Date(data.dueTime).toISOString().slice(0, 19) : '');

    if (data.files && Array.isArray(data.files)) {
      data.files.forEach((file) => {
        formData.append('files', file);
      });
    } else {
      formData.append('files', '');
    }

    mutation?.mutate(formData);
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
              onClick={openModal}
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
      <Draft
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        onConfirm={handleDraftSubmit}
      />
    </FormProvider>
  );
}
