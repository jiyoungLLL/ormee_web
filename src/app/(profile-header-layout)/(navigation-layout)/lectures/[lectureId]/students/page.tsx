'use client';

import StudentList from '@/components/student/StudentList';
import Button from '@/components/ui/Button';
import SearchInput from '@/components/ui/SearchInput';
import { MOCK_STUDENT } from '@/mock/student';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type StudentProps = {
  numId: number;
  image: string;
  name: string;
  joinDate: string;
  memo?: string;
};

export default function Students() {
  const { control, watch, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      searchStudent: '',
    },
  });

  const searchValue = watch('searchStudent');

  const [students, setStudents] = useState<StudentProps[]>(Object.values(MOCK_STUDENT));
  const [filteredStudents, setFilteredStudents] = useState<StudentProps[]>(students);
  const [checkedList, setCheckedList] = useState<string[]>([]);

  // 실시간 검색
  useEffect(() => {
    const filtered = students.filter((student) => student.name.includes(searchValue));
    setFilteredStudents(filtered);
    setCheckedList([]);
  }, [searchValue, students]);

  const handleEject = () => {
    const modifiedStudents = students.filter((student) => {
      const id = `${student.numId}-${student.name}-${student.joinDate}`;
      return !checkedList.includes(id);
    });
    setStudents(modifiedStudents);
    setCheckedList([]);
    reset({ searchStudent: '' });
  };

  return (
    <div>
      <div className='flex flex-col gap-[20px]'>
        <div className='flex gap-[15px] px-[5px] text-title3 font-bold'>
          <button>
            <Image
              src={'/assets/icons/left_arrow.png'}
              width={24}
              height={24}
              alt='뒤로가기 아이콘'
            />
          </button>
          수강생 목록
        </div>
        <div className='h-[43px] flex justify-between'>
          <SearchInput
            name='searchStudent'
            control={control}
            placeholder='검색'
            size='w-[350px] h-[43px]'
          />
          <div className='flex gap-[10px] items-center'>
            <div className='text-headline2 text-purple-50 font-semibold'>
              {checkedList.length > 0 && `${checkedList.length}명 선택됨`}
            </div>
            <Button
              onClick={handleEject}
              type='BUTTON_BASE_TYPE'
              size='h-[40px]'
              font='text-headline2 font-semibold leading-[4px]'
              title='내보내기'
              isPurple={false}
              customStyle='bg-white border border-gray-30'
              isfilled={true}
              htmlType='button'
            />
          </div>
        </div>
      </div>
      <StudentList
        studentData={filteredStudents}
        checkedList={checkedList}
        setCheckedList={setCheckedList}
      />
    </div>
  );
}
