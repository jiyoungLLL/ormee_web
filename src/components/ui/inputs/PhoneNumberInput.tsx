import { Control, Controller, ControllerRenderProps, FieldValues, Path, useWatch } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { PHONE_NUMBER_PREFIX, phoneNumberSchema } from '@/features/auth/auth.schema';
import { useRef, useState } from 'react';
import Button from '../Button';

type PhoneNumberInputProps<T extends FieldValues> = {
  /** useForm에서 사용할 컨트롤러 */
  control: Control<T>;
  /** 전화번호 앞자리 입력 필드의 이름 */
  prefixName: Path<T>;
  /** 전화번호 뒷자리 입력 필드의 이름 */
  numberName: Path<T>;
  /** 인증번호 확인 필드의 이름 */
  verificationName?: Path<T>;
  /** 값 세팅을 위한 setValue 함수 */
  setValue?: (name: Path<T>, value: any) => void;
  /** 전화번호 앞자리 입력 필드의 크기 */
  prefixInputSize?: string;
  /** 전화번호 뒷자리 입력 필드의 크기 */
  numberInputSize?: string;
  /** 전화번호 뒷자리 입력 필드의 테스트용 아이디 */
  numberTestId?: string;
};

const getPrefixList = (field: ControllerRenderProps, instanceId: string) => {
  const prefixList = Object.values(PHONE_NUMBER_PREFIX).map((prefix) => ({
    id: `${instanceId}-${prefix}`,
    label: prefix,
    onClick: () => field.onChange(prefix),
  }));

  return prefixList;
};

export default function PhoneNumberInput<T extends FieldValues>({
  control,
  prefixName,
  numberName,
  prefixInputSize,
  numberInputSize,
  verificationName,
  setValue,
  numberTestId,
}: PhoneNumberInputProps<T>) {
  const instanceIdRef = useRef(crypto.randomUUID());

  const [isSendVertification, setIsSendVertification] = useState(false);

  const [watchedPrefixValue, watchedNumberValue] = useWatch({ control, name: [prefixName, numberName] });
  const [verificationCode, setVerificationCode] = useState('');

  const watchedVerificationValue = useWatch({
    control,
    name: verificationName ?? ('__unused' as Path<T>),
  });

  const isVerified = Boolean(watchedVerificationValue);

  const handleVertification = () => {
    if (isVerified) return;

    const isValid = phoneNumberSchema.safeParse({ prefix: watchedPrefixValue, number: watchedNumberValue });

    if (isValid.error) {
      alert(isValid.error.errors[0].message);
      return;
    }

    // TODO: 인증번호 발송 로직 추가
    setIsSendVertification(true);
  };

  const handleVertificationCheck = () => {
    // TODO: 인증번호 확인 로직 추가
    // if(인증 성공하면)
    if (!verificationName || !setValue) return;

    setValue(verificationName, true);
    setIsSendVertification(false);
  };

  return (
    <div>
      <div className='flex items-center gap-[6px]'>
        <Controller
          control={control}
          name={prefixName as Path<T>}
          render={({ field }) => (
            <Dropdown
              showTrigger
              type='withInput'
              menuList={getPrefixList(field as ControllerRenderProps<FieldValues, string>, instanceIdRef.current)}
              selectedItem={field.value || PHONE_NUMBER_PREFIX.MOBILE_010}
              size={prefixInputSize}
              disabled={isVerified}
            />
          )}
        />
        <span>-</span>
        <Input
          name={numberName}
          control={control}
          size={numberInputSize || 'w-full h-[50px]'}
          disabled={isVerified}
          testId={numberTestId}
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
            // TODO: isVerified 여부에 따라 disabled 처리
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
    </div>
  );
}
