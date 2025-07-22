'use client';

import CreateContents from '@/components/ui/create/CreateContents';
import CreateHeader from '@/components/ui/create/CreateHeader';
import { useCreateLogic } from '@/components/ui/create/useCreateLogic';
import { useGetDraftHomeworks, useGetHomeworksDetail } from '@/features/homework/hooks/queries/useHomeworkApi';
import { useGetDraftNotice, useGetNoticeDetails } from '@/features/notice/useNoticeApi';
import { useLectureId } from '@/hooks/queries/useLectureId';
import { HomeworkFormValues, homeworkSchema, NoticeFormValues, noticeSchema } from '@/schemas/writeBox.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Draft from '../draftModal/Draft';
import LoadModal from '../loadModal/LoadModal';

type CreateProps = {
  type: 'HOMEWORK' | 'NOTICE';
  params: string;
};

type ModalType = 'LOAD' | 'DRAFT' | null;

export default function Create({ type, params }: CreateProps) {
  const router = useRouter();
  const schema = type === 'HOMEWORK' ? homeworkSchema : noticeSchema;
  const lectureId = useLectureId() ?? '';
  const searchParams = useSearchParams();
  const rawId = type === 'HOMEWORK' || type === 'NOTICE' ? searchParams.get('id') : null;
  const contentId = rawId && typeof rawId === 'string' ? rawId : undefined;

  const [modalType, setModalType] = useState<ModalType>(null);
  const openLoadModal = () => setModalType('LOAD');
  const openDraftModal = () => setModalType('DRAFT');
  const closeModal = () => setModalType(null);

  const methods = useForm<HomeworkFormValues | NoticeFormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues:
      type === 'HOMEWORK'
        ? {
            title: '',
            description: '',
            dueTime: '',
            files: [],
            isDraft: false,
          }
        : {
            title: '',
            description: '',
            files: [],
            isDraft: false,
          },
  });
  const { setValue, watch } = methods;

  const { isModify, onSubmit } = useCreateLogic({
    type,
    lectureId,
    contentId,
    getIsDraft: () => watch('isDraft'),
  });

  // 상세 불러오기
  const { data: preData } = useGetHomeworksDetail(contentId || '');
  const { data: noticeData } = useGetNoticeDetails(contentId || '');

  useEffect(() => {
    if (type === 'HOMEWORK' && preData) {
      setValue('title', preData.title || '');
      setValue('description', preData.description || '');
      setValue('isDraft', false);
      setValue('dueTime', preData.dueTime ? new Date(preData.dueTime).toISOString().slice(0, 16) : '');
    }

    if (type === 'NOTICE' && noticeData) {
      setValue('title', noticeData.title || '');
      setValue('description', noticeData.description || '');
      setValue('isDraft', false);
    }
  }, [preData, noticeData, setValue, type]);

  const handleLoad = (id: number) => {
    router.push(`/lectures/${lectureId}/${type.toLowerCase()}/create?id=${id}`);
  };

  // 임시저장 개수 (숙제/공지 각각 다르게)
  const { data: draftHomework } = useGetDraftHomeworks(lectureId);
  const { data: draftNotice } = useGetDraftNotice(lectureId);
  const draftNum = type === 'HOMEWORK' ? draftHomework?.length.toString() : draftNotice?.length.toString();

  const handleDraftSubmit = () => {
    setValue('isDraft', true);
    methods.handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CreateHeader
          isModify={isModify}
          type={type}
          draftNum={draftNum}
          contentId={contentId}
          lectureId={params}
          onClickLoad={openLoadModal}
          onClickDraft={openDraftModal}
        />
        <CreateContents type={type === 'HOMEWORK' ? '숙제' : '공지'} />
      </form>
      {modalType === 'LOAD' && (
        <LoadModal
          type={type === 'HOMEWORK' ? '숙제' : '공지'}
          isOpen={true}
          onCancel={closeModal}
          onConfirm={closeModal}
          onClick={handleLoad}
        />
      )}
      {modalType === 'DRAFT' && (
        <Draft
          type={type}
          isOpen={true}
          closeModal={closeModal}
          onSaveDraft={handleDraftSubmit}
        />
      )}
    </FormProvider>
  );
}
