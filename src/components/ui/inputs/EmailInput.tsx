import { Control, FieldValues, FormState, Path } from 'react-hook-form';
import Input from '../Input';

type EmailInputProps<T extends FieldValues> = {
  /** useForm에서 사용할 컨트롤러 */
  control: Control<T>;
  /** useForm의 formState, 에러 메세지 표시할 경우 전달 */
  formState?: FormState<T>;
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
  /** 아이디 입력 필드의 비활성화 여부 */
  idDisabled?: boolean;
  /** 도메인 입력 필드의 비활성화 여부 */
  domainDisabled?: boolean;
  /** 아이디 입력 테스트용 아이디 */
  idTestId?: string;
  /** 도메인 입력 테스트용 아이디 */
  domainTestId?: string;
};

export default function EmailInput<T extends FieldValues>({
  control,
  formState,
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
  idDisabled,
  domainDisabled,
}: EmailInputProps<T>) {
  return (
    <div className='flex flex-col gap-[4px]'>
      <div className='flex items-center gap-[8px]'>
        <Input
          control={control}
          name={idName}
          size={idInputSize || 'w-[250px] h-[50px]'}
          inputStyle={idInputStyle}
          textStyle={idTextStyle}
          testId={idTestId}
          disabled={idDisabled}
        />
        <span className='text-gray-90 text-headline1 font-normal'>@</span>
        <Input
          control={control}
          name={domainName}
          size={domainInputSize || 'w-[250px] h-[50px]'}
          inputStyle={domainInputStyle}
          textStyle={domainTextStyle}
          testId={domainTestId}
          disabled={domainDisabled}
        />
      </div>
      {formState?.errors[idName] && (
        <p className='text-label1 font-normal text-system-error'>{String(formState?.errors[idName].message)}</p>
      )}
      {formState?.errors[domainName] && (
        <p className='text-label1 font-normal text-system-error'>{String(formState?.errors[domainName].message)}</p>
      )}
    </div>
  );
}
