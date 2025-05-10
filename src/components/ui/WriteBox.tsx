import { useFormContext } from 'react-hook-form';
import Button from './Button';
import TiptapEditor from './TiptapEditor';

type WriteBoxProps = {
  type: '공지' | '과제';
};

export default function WriteBox({ type }: WriteBoxProps) {
  const { control, watch, setValue } = useFormContext();
  const contents = watch('contents');

  return (
    <div className='h-auto bg-white p-[30px] rounded-[10px] flex flex-col gap-[10px]'>
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
            font='text-headline2 font-semibold text-[16px]'
            title='첨부파일'
            isPurple={false}
            isfilled={false}
            htmlType='button'
          />
        </div>
        <div className='w-full h-[133px] rounded-[10px] p-[20px] border border-gray-40'>
          <p className='text-body text-gray-50 font-[18px]'>파일을 마우스로 끌어 놓으세요.</p>
        </div>
      </div>
    </div>
  );
}
