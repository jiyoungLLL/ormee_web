import Button from '@/components/ui/Button';

export default function PersonalPage() {
  return (
    <div>
      <div className='flex justify-between items-center mb-[25px]'>
        <h1 className='text-title3 font-bold px-[5px]'>개인정보 설정</h1>
        <Button
          type='BUTTON_BASE_TYPE'
          size='w-fit h-fit'
          title='수정하기'
          font='text-headline1 font-[18px] font-semibold'
          isPurple
          isfilled={false}
        />
      </div>
      <div className='w-[1018px] h-[706px] px-[30px] py-[20px] rounded-[20px] bg-white'></div>
    </div>
  );
}
