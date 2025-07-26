import { useToastStore } from '@/stores/toastStore';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

export default function InviteQrModal({
  title,
  lectureId,
  isOpen,
  closeModal,
}: {
  title: string;
  lectureId: number;
  isOpen: boolean;
  closeModal: () => void;
}) {
  const { addToast } = useToastStore();
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}-${lectureId}-qr-code.png`;
    link.click();
  };

  const copyLink = () => {
    navigator.clipboard
      .writeText('강의링크')
      .then(() => addToast({ message: '강의링크를 복사했어요.', type: 'success' }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onCancel={closeModal}
      onConfirm={closeModal}
      title='강의 개설이 완료되었어요.'
      titleContainerStyle='w-full mb-[30px] flex flex-col gap-[5px]'
      description='QR코드나 링크를 공유해 학생을 초대할 수 있어요.'
      descriptionTextStyle='text-headline2 text-label-neutral text-center font-regular'
      enableCancelButton={false}
      enableConfirmButton={false}
    >
      <div className='flex gap-[28px]'>
        <div ref={qrRef}>
          <QRCodeCanvas
            value={lectureId.toString()}
            size={190}
          />
        </div>
        <div className='flex flex-col py-[4px] gap-[20px] w-[164px]'>
          <div className='text-headline1 font-semibold h-[50px]'>오르미 토익</div>
          <div className='flex flex-col gap-[10px]'>
            <Button
              type='BUTTON_BASE_TYPE'
              size='w-fill h-[50px]'
              font='text-headline1 font-bold'
              title='QR 다운받기'
              isPurple={true}
              addImg='QRdownload'
              onClick={downloadQRCode}
            />
            <Button
              type='BUTTON_BASE_TYPE'
              size='w-fill h-[50px]'
              font='text-headline1 font-bold'
              title='링크 복사하기'
              isPurple={true}
              addImg='Link'
              onClick={copyLink}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
