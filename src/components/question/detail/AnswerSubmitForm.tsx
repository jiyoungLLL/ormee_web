'use client';

import XIcon from '@/components/icon/XIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { AnswerFormValues } from '@/features/question/question.types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type PreviewImages = {
  id: string;
  url: string;
};

export default function AnswerSubmitForm() {
  const { control, getValues, setValue, handleSubmit } = useForm<AnswerFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      content: '',
      files: [],
    },
  });

  const [previewImages, setPreviewImages] = useState<PreviewImages[] | null>(null);

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

  const handleAnswerSubmit = (data: AnswerFormValues) => {
    alert(JSON.stringify(data));
  };

  return (
    <div>
      {previewImages && previewImages.length > 0 && (
        <div className='flex flex-wrap items-center gap-[10px] px-[30px] py-[20px] rounded-[20px] bg-gray-70 mb-[10px]'>
          {previewImages?.map((preview) => (
            <div
              className='flex gap-[5px] w-fit h-fit'
              key={preview.id}
            >
              <img
                src={preview.url}
                alt='preview'
                className='max-w-[400px]'
              />
              <button
                className='w-[24px] h-[24px] bg-center bg-no-repeat bg-contain cursor-pointer p-[5px]'
                onClick={() => handleImageRemove(preview.id)}
              >
                <XIcon
                  size={18}
                  color='white'
                  thickness={2}
                />
              </button>
            </div>
          ))}
        </div>
      )}
      <form
        onSubmit={handleSubmit(handleAnswerSubmit)}
        className='flex items-center gap-[20px]'
      >
        <Input
          control={control}
          name='content'
          placeholder='답변을 작성해주세요'
          size='w-full h-[50px]'
          inputStyle='pl-[20px] pr-[56px] py-[15px] rounded-[10px] border-[1px] border-gray-20 focus:border-[1px] focus:border-purple-50 focus:outline-none disabled:bg-gray-10'
        >
          <label
            htmlFor='file-upload'
            className='absolute right-[20px] top-[50%] transform -translate-y-1/2 w-[24px] h-[24px] bg-center bg-no-repeat bg-contain cursor-pointer'
            style={{
              backgroundImage: 'url(/assets/icons/tiptapTools/image.png)',
            }}
          >
            <input
              id='file-upload'
              type='file'
              className='hidden'
              accept='image/*'
              onChange={handleImageUpload}
            />
          </label>
        </Input>
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
