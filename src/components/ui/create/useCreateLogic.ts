import { PostHomeWork } from '@/features/homework/homework.types';
import { useCreateHomework, useUpdateHomework } from '@/features/homework/hooks/queries/useHomeworkApi';
import { PostNotice } from '@/features/notice/notice.types';
import { usePostNotice, usePutNotice } from '@/features/notice/useNoticeApi';
import { WriteBoxFormValues } from '@/schemas/writeBox.schema';
import { postAttachment } from '@/utils/api/postAttachment';
import { useRouter } from 'next/navigation';

export function useCreateLogic({
  type,
  lectureId,
  contentId,
  getIsDraft,
}: {
  type: 'NOTICE' | 'HOMEWORK';
  lectureId: string;
  contentId?: string;
  getIsDraft: () => boolean;
}) {
  const router = useRouter();

  const isModify = !!contentId;
  const title = type === 'NOTICE' ? '공지' : '숙제';
  const successMessage = getIsDraft() ? '임시저장이 완료 되었어요' : `${title}가 생성되었어요.`;

  const homeworkCreateMutation = useCreateHomework(lectureId, successMessage);
  const noticeCreateMutation = usePostNotice(lectureId, successMessage);

  const homeworkUpdateMutation = useUpdateHomework({ homeworkId: contentId, lectureId });
  const noticeUpdateMutation = usePutNotice(lectureId, contentId!);

  const onSubmit = async (data: WriteBoxFormValues) => {
    try {
      const fileIds: number[] = [];

      for (const file of data.files || []) {
        const id = await postAttachment({ file, type });
        fileIds.push(id);
      }

      const isDraft = data.isDraft;
      const redirectUrl = `/lectures/${lectureId}/${type === 'HOMEWORK' ? 'homework' : 'notice'}`;

      const title = data.title?.trim() === '' ? '제목없음' : data.title;

      if (type === 'HOMEWORK') {
        const homeworkPayload: PostHomeWork = {
          title,
          description: data.description,
          isDraft,
          fileIds,
          openTime: new Date().toISOString(),
          dueTime: data.dueTime ? new Date(data.dueTime).toISOString() : '',
        };

        if (isModify) {
          homeworkUpdateMutation.mutate(homeworkPayload);
          router.push(`${redirectUrl}/detail?id=${contentId}`);
        } else {
          homeworkCreateMutation.mutate(homeworkPayload);
          router.push(redirectUrl);
        }
      } else if (type === 'NOTICE') {
        const noticePayload: PostNotice = {
          title,
          description: data.description,
          isDraft,
          fileIds,
        };

        if (isModify) {
          noticeUpdateMutation.mutate(noticePayload);
          router.push(`${redirectUrl}/detail?id=${contentId}`);
        } else {
          noticeCreateMutation.mutate(noticePayload);
          router.push(redirectUrl);
        }
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error(err);
    }
  };

  return { isModify, onSubmit };
}
