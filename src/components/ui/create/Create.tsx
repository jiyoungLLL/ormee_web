'use client';
import Button from '@/components/ui/Button';
import CreateContents from '@/components/ui/create/CreateContents';
import {
  useCreateHomework,
  useGetHomeworksDetail,
  useUpdateHomework,
} from '@/features/homework/hooks/queries/useHomeworkApi';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { useModal } from '@/hooks/ui/useModal';
import { WriteBoxFormValues, writeBoxSchema } from '@/schemas/writeBox.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
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
  const rawHomeworkId = type === 'homework' ? searchParams.get('id') : null;
  const homeworkId = rawHomeworkId && typeof rawHomeworkId === 'string' ? rawHomeworkId : undefined;

  const rawFilter = searchParams.get('filter');
  const filter = rawFilter && typeof rawFilter === 'string' ? rawFilter : undefined;

  const lectureId = lectureNum ?? undefined;

  const isModify = !!homeworkId;
  const title = type === 'notice' ? '공지' : '숙제';

  const { data: preData } = useGetHomeworksDetail(homeworkId || '');

  const methods = useForm<WriteBoxFormValues>({
    resolver: zodResolver(writeBoxSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      description: '',
      dueTime: '',
      files: [],
      isDraft: false,
    },
  });

  const { setValue } = methods;

  useEffect(() => {
    if (preData) {
      setValue('title', preData.title || '');
      setValue('description', preData.description || '');
      setValue('isDraft', false);
      setValue('dueTime', preData.dueTime ? new Date(preData.dueTime).toISOString().slice(0, 16) : '');
    }
  }, [preData, setValue]);

  const updateMutation = useUpdateHomework({ homeworkId, lectureId, filter });
  const createMutation = useCreateHomework(lectureId);
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
    formData.append('openTime', new Date().toISOString().slice(0, 19));
    formData.append('dueTime', data.dueTime ? new Date(data.dueTime).toISOString().slice(0, 19) : '');

    if (data.files && Array.isArray(data.files)) {
      data.files.forEach((file) => {
        formData.append('files', file);
      });
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
        <CreateContents type={title} />
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
