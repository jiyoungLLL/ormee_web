import { Control, FieldValues, Path } from 'react-hook-form';
import Input from '../Input';

type EmailInputProps<T extends FieldValues> = {
  /** useForm에서 사용할 컨트롤러 */
  control: Control<T>;
  /** 아이디 필드의 이름 */
  idName: Path<T>;
  /** 도메인 필드의 이름 */
  domainName: Path<T>;
  /** 아이디 입력 필드의 크기 */
  idInputSize?: string;
  /** 도메인 입력 필드의 크기 */
  domainInputSize?: string;
  /** 아이디 입력 필드의 스타일 */
  idInputStyle?: string;
  /** 도메인 입력 필드의 스타일 */
  domainInputStyle?: string;
  /** 아이디 텍스트 스타일 */
  idTextStyle?: string;
  /** 도메인 텍스트 스타일 */
  domainTextStyle?: string;
  /** 아이디 입력 테스트용 아이디 */
  idTestId?: string;
  /** 도메인 입력 테스트용 아이디 */
  domainTestId?: string;
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
  idTestId,
  domainTestId,
}: EmailInputProps<T>) {
  return (
    <div className='flex items-center gap-[8px]'>
      <Input
        control={control}
        name={idName}
        size={idInputSize || 'w-[250px] h-[50px]'}
        inputStyle={idInputStyle}
        textStyle={idTextStyle}
        testId={idTestId}
      />
      <span className='text-gray-90 text-headline1 font-normal'>@</span>
      <Input
        control={control}
        name={domainName}
        size={domainInputSize || 'w-[250px] h-[50px]'}
        inputStyle={domainInputStyle}
        textStyle={domainTextStyle}
        testId={domainTestId}
      />
    </div>
  );
}
