'use client';

import { ApiResponse } from '@/types/response.types';
import { fetcher } from '@/utils/api/api';

export const postQuizAttachment = async (file: File): Promise<number> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetcher<ApiResponse<number>>({
    method: 'POST',
    endpoint: '/attachment',
    body: formData,
    contentType: 'multipart/form-data',
    authorization: true,
    errorMessage: '파일 업로드에 실패했어요.',
  });

  if (response.status === 'fail') {
    throw new Error(response.data);
  }

  return response.data as unknown as number;
};
