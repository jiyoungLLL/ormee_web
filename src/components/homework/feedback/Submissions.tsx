import { useLectureId } from '@/hooks/queries/useLectureId';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import SearchInput from '../../ui/SearchInput';

const MOCK_FEEDBACK = {
  status: 'success',
  code: 200,
  data: [
    {
      homeworkSubmitId: 1,
      studentName: '김학생',
      isSubmitted: null,
      isChecked: false,
      isFeedback: false,
      createdAt: '2025-06-12T14:16:36.094638',
    },
    {
      homeworkSubmitId: 2,
      studentName: '이학생',
      isSubmitted: null,
      isChecked: true,
      isFeedback: true,
      createdAt: '2025-06-16T14:16:36.094638',
    },
    {
      homeworkSubmitId: 3,
      studentName: '박학생',
      isSubmitted: null,
      isChecked: false,
      isFeedback: false,
      createdAt: '2025-06-20T14:16:36.094638',
    },
  ],
};

export default function Feedback() {
  const [selectedStudent, setSelectedStudent] = useState<(typeof MOCK_FEEDBACK.data)[0] | null>(MOCK_FEEDBACK.data[0]);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      searchStudent: '',
      feedback: '',
    },
  });

  const onSubmit = (data: { searchStudent: string }) => {
    // 검색 로직 실행
  };

  const lectureNum = useLectureId();
  const searchParams = useSearchParams();
  const assingmnetId = searchParams.get('id');
  const title = searchParams.get('title');

  const [selected, setSelected] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('filter', selected);
  }, [selected]);

  const handleStudentClick = (student: (typeof MOCK_FEEDBACK.data)[0]) => {
    setSelectedStudent(student);
  };

  return (
    <div className=''>
      <div className='flex gap-[20px] items-center justify-start'>
        <Link
          href={`/lectures/${lectureNum}/homework`}
          className='flex gap-[15px] px-[5px] items-center'
        >
          <Image
            src='/assets/icons/left_arrow.png'
            width={24}
            height={24}
            alt='뒤로가기 아이콘'
            className='w-[24px] h-[24px]'
          />
          <span className='text-title3 font-bold'>과제 피드백</span>
        </Link>
        <span className='text-headline1 font-semibold text-gray-70'>{title}</span>
      </div>
      <div className='absolute top-[129px] rounded-[20px] p-[20px] flex gap-[20px] bg-white'>
        {/* 좌측: 학생명 */}
        <div className='w-[180px] h-[726px] rounded-[20px] flex flex-col gap-[21px]'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SearchInput
              name='searchStudent'
              control={control}
              size='w-fill h-[43px]'
              placeholder='학생 이름 검색'
              iconPosition='right'
            />
          </form>
          <div className='flex flex-col'>
            {MOCK_FEEDBACK.data.map((student) => {
              if (student.studentName === '') return;

              return (
                <button
                  key={`${student.studentName}-${student.createdAt}`}
                  className={`flex gap-[8px] items-center text-start text-headline1 px-[12px] py-[10px] rounded-[10px] ${
                    student.homeworkSubmitId === selectedStudent?.homeworkSubmitId
                      ? 'bg-gray-10 text-purple-50 font-semibold'
                      : 'bg-white'
                  }`}
                  onClick={() => handleStudentClick(student)}
                >
                  {student.studentName}
                  {!student.isFeedback && (
                    <span className='w-[4px] h-[4px] bg-[#14DB6E] rounded-[50px] inline-block'></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {/* 우측: 제출 상세 */}
        <div className='w-[715px] h-[726px] rounded-[10px] pt-[30px] pb-[20px] px-[30px] bg-gray-10 flex flex-col gap-[20px]'>
          <div className='flex flex-col gap-[17px] w-fill overflow-y-auto '>
            <div className='flex gap-[17px] items-center'>
              <span className='text-headline1 font-semibold'>{selectedStudent?.studentName}</span>
              <div className='flex gap-[5px] text-body2-normal text-gray-70'>
                <span>{selectedStudent?.createdAt && format(selectedStudent?.createdAt, 'yyyy.MM.dd')}</span>
                <span>{selectedStudent?.createdAt && format(selectedStudent?.createdAt, 'a h:mm')}</span>
              </div>
            </div>
            <div className='text-body1-reading'>content 자리</div>
            <div className='flex justify-center'>
              <Image
                src='https://static.cdn.soomgo.com/upload/portfolio/3fb583d6-6e4b-4495-893b-af8224ababbd.jpg?webp=1'
                width={655}
                height={497}
                alt='과제 이미지'
                className='rounded-[8px]'
              />
            </div>
          </div>
          <div className='flex gap-[8px]'>
            <Input
              name='feedback'
              control={control}
              size='h-[50px] flex-1'
              placeholder='피드백을 입력해주세요'
            >
              <Image
                src='/assets/icons/emoji.png'
                width={24}
                height={24}
                alt='이모티콘 아이콘'
              />
            </Input>
            <Button
              type='BUTTON_BASE_TYPE'
              title='피드백 남기기'
              size='h-[50px]'
              font='text-headline1 font-bold'
              isPurple={true}
              isfilled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
