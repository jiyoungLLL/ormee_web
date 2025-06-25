'use client';

import { ApiResponse } from '@/types/response.types';
import { fetcher } from '@/utils/api/api';

export const postQuizAttachment = async (attachedFile: File): Promise<number> => {
  const extension = attachedFile.name.split('.').pop() || '';
  const safeFileName = `${crypto.randomUUID()}.${extension}`;

  const renamedFile = new File([attachedFile], safeFileName, {
    type: attachedFile.type,
    lastModified: attachedFile.lastModified,
  });

  const formData = new FormData();
  formData.append('file', renamedFile);

  const response = await fetcher<ApiResponse<number>>({
    method: 'POST',
    endpoint: '/attachment',
    body: formData,
    contentType: 'multipart/form-data',
    authorization: true,
    errorMessage: '파일 업로드에 실패했어요.',
  });

  if (response.status === 'fail') {
    if (response.code === 413) {
      throw new Error('000MB 이하의 파일만 업로드할 수 있어요.');
    }

    throw new Error(response.data);
  }

  return response.data as unknown as number;
};
