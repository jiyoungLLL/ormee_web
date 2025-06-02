'use client';

import Button from '@/components/ui/Button';
import { AnswerFormValues, PreviewImagesState } from '@/features/question/types/answer.types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AnswerInput from '@/components/question/detail/AnswerInput';
import AnswerImagePreview from '@/components/question/detail/AnswerImagePreview';
import { usePostAnswer } from '@/features/question/hooks/queries/useAnswer';
import { useParams } from 'next/navigation';

export default function AnswerSubmitForm() {
  const { control, getValues, setValue, handleSubmit, reset } = useForm<AnswerFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      content: '',
      files: [],
    },
  });

  const [previewImages, setPreviewImages] = useState<PreviewImagesState[] | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedFiles = Array.from(files).map((file) => {
      const id = crypto.randomUUID();
      return {
        id,
        file,
        url: URL.createObjectURL(file),
      };
    });

    setPreviewImages((prev) => [...(prev || []), ...uploadedFiles.map(({ id, url }) => ({ id, url }))]);

    setValue('files', [...getValues('files'), ...uploadedFiles.map(({ id, file }) => ({ id, file }))]);
  };

  const handleImageRemove = (id: string) => {
    if (!previewImages) return;

    setPreviewImages((prev) => prev!.filter((preview) => preview.id !== id));
    setValue(
      'files',
      getValues('files').filter((file) => file.id !== id),
    );
  };

  const { questionId } = useParams();
  const { mutate: postAnswer } = usePostAnswer(questionId as string);

  const handleAnswerSubmit = async (data: AnswerFormValues) => {
    postAnswer(data, {
      onSuccess: () => {
        reset();
        setPreviewImages(null);
      },
    });
  };

  return (
    <div>
      <AnswerImagePreview
        previewImages={previewImages}
        handleImageRemove={handleImageRemove}
      />
      <form
        onSubmit={handleSubmit(handleAnswerSubmit)}
        className='flex items-center gap-[20px]'
      >
        <AnswerInput
          control={control}
          handleImageUpload={handleImageUpload}
        />
        <Button
          type='BUTTON_BASE_TYPE'
          title='답변하기'
          htmlType='submit'
          size='w-[102px] h-[50px]'
          isPurple
          isfilled
          font='text-headline1 font-bold'
        />
      </form>
    </div>
  );
}
