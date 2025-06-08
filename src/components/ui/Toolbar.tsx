'use client';

import { useRef } from 'react';
import { Editor } from '@tiptap/react';
import Image from 'next/image';

type ImmediateUploadConfig = {
  strategy: 'IMMEDIATE_UPLOAD';
  uploadUrl?: string;
  onImageUpload: (file: File, id: string, previewUrl: string) => void;
};

type DeferredUploadConfig = {
  strategy: 'UPLOAD_AT_SUBMIT';
  onImageUpload: (file: File, previewUrl: string) => void;
};

type ImageUploadConfig = ImmediateUploadConfig | DeferredUploadConfig;

type ToolbarProps = {
  editor: Editor | null;
  enableList?: boolean;
  enableImage?: boolean;
  containerStyle?: string;
  imageUploadConfig?: ImageUploadConfig;
};

const DEFAULT_CONTAINER_STYLE = 'w-[262px] h-[48px] py-[10px] flex gap-[31px] items-center';

export default function Toolbar({
  editor,
  enableImage = false,
  enableList = true,
  containerStyle,
  imageUploadConfig,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const textToolList = ['bold', 'italic', 'underlined'];
  const phraseToolList = ['list', 'list_numbered'];
  const imageToolList = ['image'];

  const handleClick = (tool: string) => {
    if (!editor) return;

    const chain = editor.chain().focus();

    switch (tool) {
      case 'bold':
        chain.toggleBold().run();
        break;
      case 'italic':
        chain.toggleItalic().run();
        break;
      case 'underlined':
        chain.toggleUnderline().run();
        break;
      case 'list':
        if (enableList) {
          chain.toggleBulletList().run();
        }
        break;
      case 'list_numbered':
        if (enableList) {
          chain.toggleOrderedList().run();
        }
        break;
      case 'image':
        if (enableImage && fileInputRef.current) {
          fileInputRef.current.click();
        }
        break;
      default:
        break;
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editor || !imageUploadConfig) return;

    const previewUrl = URL.createObjectURL(file);

    if (imageUploadConfig.strategy === 'IMMEDIATE_UPLOAD') {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(imageUploadConfig.uploadUrl || '/api/attachment', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const imageId = data.data;

      imageUploadConfig.onImageUpload(file, imageId, previewUrl);
    } else {
      imageUploadConfig.onImageUpload(file, previewUrl);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderToolBar = (list: string[]) => {
    return (
      <div className='flex gap-[20px]'>
        {list.map((tool, index) => (
          <button
            key={`${tool}-${index}`}
            onClick={() => handleClick(tool)}
            type='button'
          >
            <Image
              src={`/assets/icons/tiptapTools/${tool}.png`}
              width={28}
              height={28}
              alt={`${tool} 아이콘`}
              className='w-[28px] h-[28px] object-contain'
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={containerStyle || DEFAULT_CONTAINER_STYLE}>
      {renderToolBar(textToolList)}
      {enableList && (
        <>
          <div className='bg-gray-30 h-[20px] w-[1px]'></div>
          {renderToolBar(phraseToolList)}
        </>
      )}
      {enableImage && (
        <>
          <div className='bg-gray-30 h-[20px] w-[1px]'></div>
          {renderToolBar(imageToolList)}
        </>
      )}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleImageUpload}
      />
    </div>
  );
}
