'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Answer } from '@/features/question/question.types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function AnswerSubmitForm() {
  const { control, getValues, setValue, handleSubmit } = useForm<Answer>({
    mode: 'onSubmit',
    defaultValues: {
      content: '',
      files: [],
    },
  });

  const [previewImages, setPreviewImages] = useState<string[] | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedPreviewImages = Array.from(files).map((file) => {
      return URL.createObjectURL(file);
    });

    setPreviewImages((prev) => [...(prev || []), ...uploadedPreviewImages]);
    setValue('files', [...getValues('files'), ...Array.from(files)]);
  };

  const handleAnswerSubmit = (data: Answer) => {
    alert(`${data.content}, ${data.files[0].name}`);
  };

  return (
    <div>
      {previewImages && (
        <div className='flex flex-wrap items-center gap-[10px] px-[30px] py-[20px] rounded-[20px] bg-gray-70 mb-[10px]'>
          {previewImages?.map((previewUrl, index) => (
            <img
              key={`answer-image-${index}`}
              src={previewUrl}
              alt='preview'
              className='max-w-[400px]'
            />
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
