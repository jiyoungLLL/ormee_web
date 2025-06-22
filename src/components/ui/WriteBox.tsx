import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from './Button';
import TiptapEditor from './TiptapEditor';

type WriteBoxProps = {
  type: '공지' | '숙제';
  files?: string[];
};

export default function WriteBox({ type, files }: WriteBoxProps) {
  const { watch, setValue } = useFormContext();
  const selectedFiles = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // useEffect(() => {
  //   if (files) {
  //     setFileNames(files);
  //   }
  // }, [files]);

  useEffect(() => {
    setValue('files', fileList);
  }, [fileList, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;

    const newFiles = Array.from(selected).filter((file) => !fileList.some((f) => f.name === file.name));

    if (newFiles.length > 0) {
      setFileList((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles || droppedFiles.length === 0) return;

    const newFiles = Array.from(droppedFiles).filter((file) => !fileList.some((f) => f.name === file.name));

    if (newFiles.length > 0) {
      setFileList((prev) => [...prev, ...newFiles]);
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

  const handleDelete = (deletedName: string) => {
    setFileList((prev) => prev.filter((file) => file.name !== deletedName));
  };

  return (
    <div className='h-auto bg-white p-[30px] rounded-[10px] flex flex-col gap-[20px]'>
      <div className='h-[482px] flex flex-col gap-[12px]'>
        <TiptapEditor
          type={type}
          contents={watch('description')}
          onChange={(html) => setValue('description', html)}
        />
      </div>

      <div className='h-[191px] flex flex-col gap-[10px]'>
        <div className='flex items-center h-[48px] gap-[10px]'>
          <span className='text-heading2 font-semibold p-[10px]'>첨부파일</span>
          <Button
            type='BUTTON_BASE_TYPE'
            size='w-[98px] h-[40px]'
            font='text-headline2 font-semibold text-[16px] leading-[4px]'
            title='파일 찾기'
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
            onChange={handleFileChange}
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
          {fileList.length > 0 ? (
            <div className='flex gap-2 flex-wrap'>
              {fileList.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className='w-fit h-[36px] rounded-[18px] border border-gray-20 py-[4px] px-[16px] bg-gray-10 flex items-center gap-[5px] text-body-reading'
                >
                  <span className='truncate max-w-[200px]'>{file.name}</span>
                  <button
                    type='button'
                    onClick={() => handleDelete(file.name)}
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
