import { StudentProps } from '@/types/student.types';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Checkbox from '../ui/checkbox/Checkbox';
import Input from '../ui/Input';

type StudentListType = {
  /** title인지 학생 리스트인지 (검색 결과가 없을 땐 'noSearch')*/
  type: 'title' | 'student' | 'noSearch';
  /** 체크 여부 */
  isChecked?: boolean;
  /** 내부 데이터 (이미지, 이름, 가입날짜, 메모) */
  studentData?: StudentProps;
  /** 체크 여부 관리 */
  onCheck?: (id: string, isChecked: boolean) => void;
};

const TITLE: string[][] = [
  ['이름', 'w-[125px] pl-[60px]'],
  ['가입일', 'w-[76px]'],
  ['메모', ''],
];

export default function Student({ type, isChecked = false, studentData, onCheck }: StudentListType) {
  const { control, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      studentMemo: studentData?.memo ? studentData?.memo : '',
    },
  });

  const memoValue = watch('studentMemo');

  // 자동 저장
  useEffect(() => {
    if (!studentData) return;

    const delaySave = setTimeout(() => {
      if (memoValue) {
        console.log(memoValue);
      }
    }, 500);

    return () => clearTimeout(delaySave);
  }, [memoValue]);

  const renderStudent = () => {
    if (!studentData) return null;

    const listId = `${studentData.numId}-${studentData.name}-${studentData.joinDate}`;

    return (
      <div className='w-full h-[50px] flex gap-[40px] items-center'>
        <Checkbox
          id={listId}
          checked={isChecked}
          checkItemHandler={(id, checked) => onCheck?.(id, checked)}
        />
        <div className='relative w-[125px] flex gap-[20px] items-center'>
          <div className='relative w-[40px] h-[40px] rounded-[24.55px] border-[1.43px] border-gray-30 overflow-hidden'>
            <Image
              src={studentData.image}
              alt={`${studentData.name} 이미지`}
              width={37.14}
              height={37.14}
              style={{ objectFit: 'cover', borderRadius: '21.82px' }}
            />
          </div>
          <p className='text-headline2 font-semibold'>{studentData.name}</p>
        </div>
        <div className='text-body1-normal'>{studentData.joinDate}</div>
        <Input
          name='studentMemo'
          control={control}
          size='w-[613px] h-[33px]'
          textStyle='text-body1'
          inputStyle='bg-gray-10 rounded-[5px] px-[20px] py-[15px] focus:border-[1px] focus:border-purple-50 focus:outline-none'
          placeholder={studentData.memo ? '' : '메모를 입력하세요'}
          maxLength={30}
        />
      </div>
    );
  };

  return (
    <div className='w-full h-[50px]'>
      {type === 'title' && (
        <div className='flex items-center gap-[40px] py-[10px]'>
          <Checkbox
            id={'all'}
            checked={isChecked}
            checkItemHandler={(id, checked) => onCheck?.(id, checked)}
          />
          {TITLE.map(([name, style], index) => (
            <div
              key={`${index}-${name}`}
              className={`${style} text-headline2 font-semibold text-gray-70`}
            >
              {name}
            </div>
          ))}
        </div>
      )}
      {type === 'student' && renderStudent()}
      {type === 'noSearch' && (
        <div className='text-heading2 text-label-assistive font-semibold flex justify-center items-center pt-[30px]'>
          검색 결과가 없습니다
        </div>
      )}
    </div>
  );
}
