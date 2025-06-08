import { QuizFormValues } from '@/features/quiz/quiz.types';
import Image from 'next/image';
import { Path, useFormContext } from 'react-hook-form';

type ProblemImagePreviewProps = {
  fileName: `problems.${number}.files` & Path<QuizFormValues>;
};

export default function ProblemImagePreview({ fileName }: ProblemImagePreviewProps) {
  const { watch } = useFormContext<QuizFormValues>();

  const files = watch(fileName);
  if (!files) return null;

  return (
    <div className='flex flex-wrap gap-[10px] mb-[8px]'>
      {files.map((file) => (
        <Image
          key={file.id}
          src={file.previewUrl}
          alt='첨부 이미지'
          width={150}
          height={200}
          className='w-[150px] h-[200px] rounded-[8px] object-cover'
        />
      ))}
    </div>
  );
}
