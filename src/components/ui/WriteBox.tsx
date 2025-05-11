import Image from 'next/image';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from './Button';
import TiptapEditor from './TiptapEditor';

type WriteBoxProps = {
  type: '공지' | '과제';
};

export default function WriteBox({ type }: WriteBoxProps) {
  const { watch, setValue } = useFormContext();
  const contents = watch('contents');
  // 버튼 업로드
  const selectedFiles = useRef<HTMLInputElement>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  // 드래그 앤 드랍
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const newNames = Array.from(files)
        .map((file) => file.name)
        .filter((name) => !fileNames.includes(name));

      if (newNames.length > 0) {
        setFileNames((prev) => [...prev, ...newNames]);
      }
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileNames = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newNames = Array.from(files)
        .map((file) => file.name)
        .filter((name) => !fileNames.includes(name));

      if (newNames.length > 0) {
        setFileNames((prev) => [...prev, ...newNames]);
      }
    }
  };

  const handleDelete = (deletedName: string) => {
    setFileNames((prev) => prev.filter((name) => name !== deletedName));
  };

  return (
    <div className='h-auto bg-white p-[30px] rounded-[10px] flex flex-col gap-[20px]'>
      <div className='h-[482px] flex flex-col gap-[12px]'>
        <TiptapEditor
          type={type}
          contents={contents}
          onChange={(html) => setValue('contents', html)}
        />
      </div>

      <div className='h-[191px] flex flex-col gap-[10px]'>
        <div className='flex items-center h-[48px] gap-[10px]'>
          <span className='text-heading2 font-semibold p-[10px]'>첨부파일</span>
          <Button
            type='BUTTON_BASE_TYPE'
            size='w-[98px] h-[40px]'
            font='text-headline2 font-semibold text-[16px] leading-[4px]'
            title='첨부파일'
            isPurple={false}
            isfilled={false}
            htmlType='button'
            onClick={() => selectedFiles.current?.click()}
          />
          <input
            ref={selectedFiles}
            type='file'
            className='hidden'
            multiple
            onChange={handleFileNames}
          />
        </div>

        <div
          className={`w-full h-[133px] rounded-[10px] p-[20px] border border-gray-40 overflow-auto flex flex-wrap ${
            isDragging ? 'border-purple-50' : ''
          } `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {fileNames.length > 0 ? (
            <div className='flex gap-2 flex-wrap'>
              {fileNames.map((name, index) => (
                <div
                  key={`${name}-${index}`}
                  className='w-fit h-[36px] rounded-[18px] border border-gray-20 py-[4px] px-[16px] bg-gray-10 flex items-center gap-[5px] text-body-reading'
                >
                  <span className='truncate max-w-[200px]'>{name}</span>
                  <button
                    type='button'
                    onClick={() => handleDelete(name)}
                  >
                    <Image
                      src='/assets/icons/tiptapTools/delete.png'
                      width={18}
                      height={18}
                      alt='지우기 아이콘'
                    />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-body text-gray-50 font-[18px]'>파일을 마우스로 끌어 놓으세요.</p>
          )}
        </div>
      </div>
    </div>
  );
}
