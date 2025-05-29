'use client';

import XIcon from '@/components/icon/XIcon';
import { PreviewImagesState } from '@/features/question/question.types';

type AnswerImagePreviewProps = {
  previewImages: PreviewImagesState[] | null;
  handleImageRemove: (id: string) => void;
};

export default function AnswerImagePreview({ previewImages, handleImageRemove }: AnswerImagePreviewProps) {
  if (!previewImages || previewImages.length === 0) return null;

  return (
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
  );
}
