import { Control, Controller, ControllerRenderProps, FieldValues, Path, useWatch } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { PHONE_NUMBER_PREFIX, phoneNumberSchema } from '@/schemas/auth.schema';
import { useRef, useState } from 'react';
import Button from './Button';

type PhoneNumberInputProps<T extends FieldValues> = {
  control: Control<T>;
  prefixName: Path<T>;
  numberName: Path<T>;
  verificationName?: Path<T>;
  prefixInputSize?: string;
  numberInputSize?: string;
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
}: PhoneNumberInputProps<T>) {
  const instanceIdRef = useRef(crypto.randomUUID());
  const [isSendVertification, setIsSendVertification] = useState(false);

  const [watchedPrefixValue, watchedNumberValue] = useWatch({ control, name: [prefixName, numberName] });
  const isVerified = verificationName ? useWatch({ control, name: verificationName }) : false;

  const handleVertification = () => {
    const isValid = phoneNumberSchema.safeParse({ prefix: watchedPrefixValue, number: watchedNumberValue });

    if (isValid.error) {
      alert(isValid.error.errors[0].message);
      return;
    }

    setIsSendVertification(true);
  };

  return (
    <div>
      <div className='flex items-center gap-[6px]'>
        <Controller
          control={control}
          name={prefixName as Path<T>}
          render={({ field }) => (
            <Dropdown
              type='withInput'
              menuList={getPrefixList(field as ControllerRenderProps<FieldValues, string>, instanceIdRef.current)}
              selectedItem={field.value || PHONE_NUMBER_PREFIX.MOBILE_010}
              size={prefixInputSize}
            />
          )}
        />
        <span>-</span>
        <Input
          name={numberName}
          control={control}
          size={numberInputSize || 'w-full h-[50px]'}
        />
        {verificationName && (
          <Button
            type='BUTTON_BASE_TYPE'
            isPurple
            isfilled
            size='w-[150px] h-[50px]'
            font='text-headline1 font-bold'
            title='인증번호 받기'
            onClick={handleVertification}
          />
        )}
      </div>
    </div>
  );
}
