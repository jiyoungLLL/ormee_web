import { ClassModalValues, classSchema } from '@/schemas/class.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Modal from '../ui/Modal';

interface ClassModalProps {
  type: 'ing' | 'new';
  isOpen: boolean;
  closeModal: () => void;
}

export default function ClassModal({ type, isOpen, closeModal }: ClassModalProps) {
  const title = type === 'ing' ? '강의 설정' : '신규 강의 개설';
  const { control, handleSubmit } = useForm<ClassModalValues>({
    defaultValues: {
      title: '',
      password: '',
    },
    resolver: zodResolver(classSchema),
    mode: 'onSubmit',
  });

  return (
    <form className='absolute z-100'>
      <Modal
        isOpen={isOpen}
        onCancel={closeModal}
        onConfirm={() => {}}
        title={title}
        containerStyle='flex flex-col gap-[30px]'
      >
        <div className='w-full h-[472px] flex flex-col gap-[20px]'>
          <div className=' text-headline2 font-semibold'>
            강의명
            <Input
              name='title'
              control={control}
              size='w-full h-[50px]'
              placeholder='강의명'
              maxLength={20}
              showCharacterCount={true}
              showPasswordToggle={true}
              type='text'
            />
          </div>
          <div className='text-headline2 font-semibold'>
            비밀번호
            <Input
              name='password'
              control={control}
              size='w-full h-[50px]'
              placeholder='비밀번호'
              maxLength={20}
              showCharacterCount={true}
              showPasswordToggle={true}
              type='text'
            />
          </div>
        </div>
      </Modal>
    </form>
  );
}
