import { Control, Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { PHONE_NUMBER_PREFIX } from '@/schemas/auth.schema';
import { useRef } from 'react';

type PhoneNumberInputProps<T extends FieldValues> = {
  control: Control<T>;
  prefixName: Path<T>;
  numberName: Path<T>;
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
}: PhoneNumberInputProps<T>) {
  const instanceIdRef = useRef(crypto.randomUUID());

  return (
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
    </div>
  );
}
