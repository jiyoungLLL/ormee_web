'use client';

import { fetcher } from '@/utils/api/api';

type AttachmentType = 'QUIZ' | 'NOTICE' | 'HOMEWORK' | 'HOMEWOKR_SUBMIT' | 'QUESTION' | 'ANSWER' | 'TEACHER_IMAGE';
type AttachmentId = number;

type AttachmentProps = {
  file: File;
  type: AttachmentType;
  renameFile?: boolean;
};

export const postAttachment = async ({ file, type, renameFile = false }: AttachmentProps): Promise<AttachmentId> => {
  const formData = new FormData();
  formData.append('type', type);

  if (renameFile) {
    const newFileName = `${Date.now()}-${crypto.randomUUID()}`;
    const renamedFile = new File([file], newFileName, { type: file.type });
    formData.append('file', renamedFile);
  } else {
    formData.append('file', file);
  }

  const response = await fetcher<number>({
    method: 'POST',
    endpoint: '/attachment',
    body: formData,
    contentType: 'multipart/form-data',
    errorMessage: '파일 업로드에 실패했습니다.',
  });

  if (response.status === 'fail') {
    throw new Error(response.data);
  }

  return response.data;
};
