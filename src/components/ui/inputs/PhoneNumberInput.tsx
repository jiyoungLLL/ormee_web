import { Control, useWatch, Path, FormState } from 'react-hook-form';
import Input from '@/components/ui/Input';
import { phoneNumberSchema } from '@/features/user/schemas/user.schema';
import { useState } from 'react';
import Button from '../Button';
import { FieldValues } from 'react-hook-form';

export type PhoneNumberInputProps<T extends FieldValues> = {
  /** useForm에서 사용할 컨트롤러 */
  control: Control<T>;
  /** 전화번호 입력 필드의 이름 */
  name: Path<T>;
  /** 인증번호 확인 필드의 이름 */
  verificationName: Path<T>;
  /** 값 세팅을 위한 setValue 함수 */
  setValue?: (name: keyof T, value: any) => void;
  /** 전화번호 입력 필드의 크기 */
  inputSize?: string;
  /** 전화번호 입력 필드 비활성화 여부 */
  disabled?: boolean;
  /** 인증번호 발송 버튼 비활성화 여부 */
  sendVertificationButtonDisabled?: boolean;
  /** 전화번호 입력 필드의 테스트용 아이디 */
  testId?: string;
};

export default function PhoneNumberInput<T extends FieldValues>({
  control,
  name,
  inputSize,
  verificationName,
  setValue,
  disabled,
  sendVertificationButtonDisabled,
  testId,
}: PhoneNumberInputProps<T>) {
  const [isSendVertification, setIsSendVertification] = useState(false);

  const watchedValue = useWatch({ control, name });
  const [verificationCode, setVerificationCode] = useState('');

  const watchedVerificationValue = useWatch({
    control,
    name: verificationName,
  });

  const isVerified = Boolean(watchedVerificationValue);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleVertification = () => {
    if (isVerified) return;

    const isValid = phoneNumberSchema.safeParse(watchedValue);

    if (isValid.error) {
      setValidationError(isValid.error.errors[0].message);
      return;
    }

    if (isValid.success) {
      setValidationError(null);
    }

    // TODO: 인증번호 발송 로직 추가
    setIsSendVertification(true);
  };

  const handleVertificationCheck = () => {
    // TODO: 인증번호 확인 로직 추가
    // if(인증 성공하면)
    if (!verificationName || !setValue) return;

    setValidationError(null);

    setValue(verificationName, true);
    setIsSendVertification(false);
  };

  return (
    <div className='flex flex-col gap-[4px]'>
      <div className='flex items-center gap-[6px]'>
        <Input
          name={name}
          control={control}
          size={inputSize || 'w-full h-[50px]'}
          disabled={disabled || isVerified}
          testId={testId}
        />
        {verificationName && (
          <Button
            type='BUTTON_BASE_TYPE'
            isPurple
            isfilled
            size='w-[150px] h-[50px]'
            font='text-headline1 font-bold'
            title={isVerified ? '인증 완료' : '인증번호 받기'}
            htmlType='button'
            onClick={handleVertification}
            disabled={sendVertificationButtonDisabled || isVerified}
          />
        )}
      </div>
      {isSendVertification && (
        <div className='flex items-center gap-[6px] mt-[6px]'>
          <input
            className='flex w-[200px] h-[50px] px-[20px] py-[15px] rounded-[10px] border border-gray-20 bg-white text-body-reading text-label-noral placeholder:text-label-neutral focus:border-[1px] focus:border-purple-50 focus:outline-none'
            placeholder='인증번호 입력'
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <Button
            type='BUTTON_BASE_TYPE'
            isPurple
            isfilled
            size='w-[71px] h-[50px]'
            font='text-headline1 font-bold'
            title='확인'
            htmlType='button'
            onClick={handleVertificationCheck}
          />
        </div>
      )}
      {validationError && <p className='text-label1 font-normal text-system-error'>{validationError}</p>}
    </div>
  );
}
