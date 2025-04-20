type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  containerStyle?: string;
  title?: string;
  description?: string;
};
export default function Modal({
  children,
  isOpen,
  onCancel,
  onConfirm,
  containerStyle,
  title,
  description,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-90/50 flex justify-center items-center z-50'>
      <div className={`bg-white rounded-[15px] px-[30px] py-[20px] ${containerStyle}`}>
        <div className='flex flex-col w-full gap-[13px]'>
          {title && <h2 className='text-heading1 font-semibold text-gray-90 text-center'>{title}</h2>}
          {description && <p className='text-headline2 font-normal text-gray-90 text-center'>{description}</p>}
        </div>
        {children}
        <div className='grid grid-cols-2 items-center w-[350px] h-[55px] gap-[14px]'>
          <button className='w-full h-[50px] px-[20px] py-[12px] rounded-[10px] bg-gray-20 text-headline1 font-bold text-gray-60'>
            취소
          </button>
          <button className='w-full h-[50px] px-[20px] py-[12px] rounded-[10px] bg-purple-50 text-headline1 font-bold text-white'>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
