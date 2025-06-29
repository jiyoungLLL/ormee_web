'use client';

import { fetcher } from '@/utils/api/api';

type AttachmentType = 'QUIZ' | 'NOTICE' | 'HOMEWORK' | 'HOMEWOKR_SUBMIT' | 'QUESTION' | 'ANSWER' | 'TEACHER_IMAGE';
type AttachmentId = number;

/**
 * @param {File} file - 업로드할 파일
 * @param {AttachmentType} type - 첨부파일 타입 (API 요청시 type에 들어갈 값)
 * @param {boolean} [renameFile=false] - 파일명 변경 여부 (기본값: false), 변경시 랜덤 파일명으로 변경됨
 */
type AttachmentProps = {
  file: File;
  type: AttachmentType;
  renameFile?: boolean;
};

/**
 * attachment 엔드포인트로 파일을 업로드하는 함수
 * @param {AttachmentProps} props - 파일 업로드 프로퍼티
 * @param {File} props.file - 업로드할 파일
 * @param {AttachmentType} props.type - 첨부파일 타입 (API 요청시 type에 들어갈 값)
 * @param {boolean} [props.renameFile=false] - 파일명 변경 여부 (기본값: false), 변경시 랜덤 파일명으로 변경됨
 * @returns {Promise<AttachmentId>} 업로드된 파일의 ID
 */
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
