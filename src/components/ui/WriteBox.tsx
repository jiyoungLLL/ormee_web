import { useGetHomeworksDetail } from '@/features/homework/hooks/queries/useHomeworkApi';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from './Button';
import TiptapEditor from './TiptapEditor';

type WriteBoxProps = {
  type: '공지' | '숙제';
};

export default function WriteBox({ type }: WriteBoxProps) {
  const searchParams = useSearchParams();
  const homeworkId = searchParams.get('id') as string;
  const { data } = useGetHomeworksDetail(homeworkId);
  const { watch, setValue } = useFormContext();

  const selectedFiles = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchAndConvertFiles = async () => {
      if (!data?.filePaths?.length) return;

      const files = await Promise.all(
        data.filePaths.map(async (url: string, i: number) => {
          if (!data?.fileNames?.length) return undefined;

          const res = await fetch(url);
          const blob = await res.blob();

          const originalNames = data.fileNames[i];
          const validNames =
            originalNames.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}(.*)/)?.[1] || originalNames;
          const file = new File([blob], validNames, { type: blob.type });
          return file;
        }),
      );

      const validFiles = files.filter((file): file is File => file !== undefined);

      setFileList(validFiles);
    };

    fetchAndConvertFiles();
  }, [data]);

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
        {data?.description !== '' ? (
          <TiptapEditor
            type={type}
            contents={data?.description ?? ''}
            onChange={(html) => setValue('description', html)}
          />
        ) : (
          <TiptapEditor
            type={type}
            contents={''}
            onChange={(html) => setValue('description', html)}
          />
        )}
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
          <span className='text-body text-gray-50 font-[18px]'> &#40;파일당 최대 10MB, 총 최대 50MB&#41;</span>
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
            <p className='text-body text-gray-50 font-[18px]'>파일을 마우스로 끌어 오거나 업로드해 주세요.</p>
          )}
        </div>
      </div>
    </div>
  );
}
