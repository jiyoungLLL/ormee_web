import { Control, FieldValues, Path } from 'react-hook-form';
import Input from '../Input';

type EmailInputProps<T extends FieldValues> = {
  control: Control<T>;
  idName: Path<T>;
  domainName: Path<T>;
  idInputSize?: string;
  domainInputSize?: string;
  idInputStyle?: string;
  domainInputStyle?: string;
  idTextStyle?: string;
  domainTextStyle?: string;
};

export default function EmailInput<T extends FieldValues>({
  control,
  idName,
  domainName,
  idInputSize,
  domainInputSize,
  idInputStyle,
  domainInputStyle,
  idTextStyle,
  domainTextStyle,
}: EmailInputProps<T>) {
  return (
    <div className='flex items-center gap-[8px]'>
      <Input
        control={control}
        name={idName}
        size={idInputSize || 'w-[250px] h-[50px]'}
        inputStyle={idInputStyle}
        textStyle={idTextStyle}
      />
      <span className='text-gray-90 text-headline1 font-normal'>@</span>
      <Input
        control={control}
        name={domainName}
        size={domainInputSize || 'w-[250px] h-[50px]'}
        inputStyle={domainInputStyle}
        textStyle={domainTextStyle}
      />
    </div>
  );
}
