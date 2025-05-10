import { useFormContext } from 'react-hook-form';
import Button from './Button';
import TiptapEditor from './TiptapEditor';

export default function NotirceWriteBox() {
  const { control, watch, setValue } = useFormContext();
  const contents = watch('contents');

  return (
    <div className='h-auto bg-white p-[30px] rounded-[10px] flex flex-col gap-[10px]'>
      <div className='h-[482px] flex flex-col gap-[12px]'>
        <TiptapEditor
          contents={contents}
          onChange={(html) => setValue('contents', html)}
        />
      </div>
      <div className='h-[191px] flex flex-col gap-[10px]'>
        <div className='flex items-center h-[48px] gap-[10px]'>
          <Button
            type='BUTTON_BASE_TYPE'
            size='w-[98px] h-[40px]'
            font='text-headline2 font-semibold text-[16px]'
            title='첨부파일'
            isPurple={false}
            isfilled={false}
            htmlType='button'
          />
        </div>
      </div>
    </div>
  );
}
