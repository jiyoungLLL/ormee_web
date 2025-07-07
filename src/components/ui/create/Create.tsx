'use client';
import Button from '@/components/ui/Button';
import CreateContents from '@/components/ui/create/CreateContents';
import {
  useCreateHomework,
  useGetHomeworksDetail,
  useUpdateHomework,
} from '@/features/homework/hooks/queries/useHomeworkApi';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { WriteBoxFormValues, writeBoxSchema } from '@/schemas/writeBox.schema';
import { postAttachment } from '@/utils/api/postAttachment';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Draft from '../draftModal/Draft';

type CreateProps = {
  type: 'NOTICE' | 'HOMEWORK';
  params: string;
};

type ModalType = 'LOAD' | 'DRAFT' | null;

export default function Create({ type, params }: CreateProps) {
  const router = useRouter();

  const paramsType = type === 'HOMEWORK' ? 'homework' : 'notice';
  const [modalType, setModalType] = useState<ModalType>(null);

  const openLoadModal = () => setModalType('LOAD');
  const openDraftModal = () => setModalType('DRAFT');
  const closeModal = () => setModalType(null);

  const lectureNum = useLectureId();
  const searchParams = useSearchParams();
  const rawHomeworkId = type === 'HOMEWORK' ? searchParams.get('id') : null;
  const homeworkId = rawHomeworkId && typeof rawHomeworkId === 'string' ? rawHomeworkId : undefined;

  const rawFilter = searchParams.get('filter');
  const filter = rawFilter && typeof rawFilter === 'string' ? rawFilter : undefined;

  const lectureId = lectureNum ?? undefined;

  const isModify = !!homeworkId;
  const title = type === 'NOTICE' ? '공지' : '숙제';

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

  const { setValue, watch } = methods;

  useEffect(() => {
    if (preData) {
      setValue('title', preData.title || '');
      setValue('description', preData.description || '');
      setValue('isDraft', false);
      setValue('dueTime', preData.dueTime ? new Date(preData.dueTime).toISOString().slice(0, 16) : '');

      console.log(watch('isDraft'));
    }
  }, [preData, setValue]);

  const updateMutation = useUpdateHomework({ homeworkId, lectureId });
  const successMessage = watch('isDraft') ? '임시저장이 완료 되었어요.' : '숙제가 생성되었어요.';
  const createMutation = useCreateHomework(lectureId, successMessage);
  const mutation = isModify ? updateMutation : createMutation;

  const handleDraftSubmit = () => {
    setValue('isDraft', true);
    methods.handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: WriteBoxFormValues) => {
    console.log(data);
    try {
      const fileIds = [];
      for (const file of data.files || []) {
        const id = await postAttachment({ file, type: type });
        fileIds.push(id);
      }

      mutation?.mutate({
        title: data.title,
        description: data.description,
        isDraft: data.isDraft,
        openTime: new Date().toISOString(),
        dueTime: data.dueTime ? new Date(data.dueTime).toISOString() : '',
        fileIds,
      });

      if (!data.isDraft) router.push(`/lectures/${lectureId}/homework`);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error(err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='w-full h-[50px] flex justify-between items-center'>
          <Link
            href={
              isModify && type === 'HOMEWORK'
                ? `/lectures/${params}/${paramsType}/detail?filter=${filter}&id=${homeworkId}`
                : `/lectures/${params}/${paramsType}`
            }
            className='w-[136px] px-[5px] text-title3 font-bold flex items-center gap-[15px]'
          >
            <Image
              src='/assets/icons/left_arrow.png'
              width={24}
              height={24}
              alt='이전으로'
            />
            {title} 생성
          </Link>
          <div className='flex gap-[10px]'>
            {!rawHomeworkId && (
              <>
                <Button
                  type='BUTTON_BASE_TYPE'
                  size='w-[117px] h-[50px]'
                  font='text-headline1 font-semibold'
                  title='불러오기'
                  isPurple={false}
                  onClick={openLoadModal}
                />
                <Button
                  type='BUTTON_BASE_TYPE'
                  size='w-[117px] h-[50px]'
                  font='text-headline1 font-semibold'
                  title='임시저장'
                  isPurple={false}
                  onClick={openDraftModal}
                  htmlType='button'
                />
              </>
            )}
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
      {/* {modalType === 'LOAD' && (
        <Draft
          isOpen={true}
          openModal={openDraftModal}
          closeModal={closeModal}
          onConfirm={handleLOADSubmit}
        />
      )} */}
      {modalType === 'DRAFT' && (
        <Draft
          type='HOMEWORK'
          isOpen={true}
          closeModal={closeModal}
          onSaveDraft={handleDraftSubmit}
        />
      )}
    </FormProvider>
  );
}
